package it.groupbuy.backend.controllers;


import java.util.ArrayList;
import java.util.HashSet;



import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import it.groupbuy.backend.models.ERole;
import it.groupbuy.backend.models.Role;
import it.groupbuy.backend.models.User;
import it.groupbuy.backend.payload.request.LoginRequest;
import it.groupbuy.backend.payload.request.SignupRequest;
import it.groupbuy.backend.payload.response.JwtResponse;
import it.groupbuy.backend.payload.response.MessageResponse;
import it.groupbuy.backend.repository.GroupbuyRepository;
import it.groupbuy.backend.models.GroupBuyModelAssembler;
import it.groupbuy.backend.models.GroupBuyNotFoundException;
import it.groupbuy.backend.repository.UserRepository;
import it.groupbuy.backend.security.jwt.JwtUtils;
import it.groupbuy.backend.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import it.groupbuy.backend.models.GroupBuy;
import it.groupbuy.backend.payload.request.GroupBuyPatchRequest;


@RestController
public class GroupBuyController {

	private final GroupbuyRepository repository;
	private final GroupBuyModelAssembler assembler;
	private final UserRepository userRepository;

	GroupBuyController(GroupbuyRepository repository, GroupBuyModelAssembler assembler, UserRepository userRepository) {
		this.repository = repository;
		this.userRepository = userRepository;
	    this.assembler = assembler;
	}
	
	@GetMapping("api/auth/groupbuy")
	public CollectionModel<EntityModel<GroupBuy>> all() { // load one by one the buyers

		List<EntityModel<GroupBuy>> groupbuy = repository.findAll().stream() // load one by one the groupbuys and put them in a list
		        .map(assembler::toModel).collect(Collectors.toList());

		 return CollectionModel.of(groupbuy, //
			        linkTo(methodOn(GroupBuyController.class).all()).withSelfRel()); // creates the hateoas links to the objects
	}
	
	@GetMapping("api/auth/groupbuy/{id}")
	public EntityModel<GroupBuy> one(@PathVariable Long id) {

		GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));

	    return assembler.toModel(groupbuy);
	}
	
	
	@PatchMapping("api/auth/groupbuy/{id}")
    @PreAuthorize("hasRole('BROKER')")
	ResponseEntity<?> patchGroupBuy(@Valid @RequestBody GroupBuyPatchRequest patchRequest, @PathVariable Long id) {
		
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(userDetails.getUsername()).get();
		GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
		
		if(patchRequest.getMinSize() != 0)
			groupbuy.setMinSize(patchRequest.getMinSize());
		if(patchRequest.getMaxSize() != 0)
			groupbuy.setMaxSize(patchRequest.getMaxSize());
		if(patchRequest.getDescription() != null)
			groupbuy.setDescription(patchRequest.getDescription());
		if(patchRequest.getProduct() != null)
			groupbuy.setProduct(patchRequest.getProduct());
		if(patchRequest.getLocation() != null)
			groupbuy.setLocation(patchRequest.getLocation());
		if(patchRequest.getStatus() != null)
			groupbuy.setStatus(patchRequest.getStatus());
		if(patchRequest.getCost() != 0)
			groupbuy.setCost(patchRequest.getCost());
		if(patchRequest.getCategory() != null)
			groupbuy.setCategory(patchRequest.getCategory());
		
		ArrayList<Long> newbuyers = patchRequest.getBuyers();
		ArrayList<Long> buyers = groupbuy.getBuyers();
		for (int i = 0; i <= buyers.size(); i = i + 1) {
				Long b = newbuyers.get(i);
				if (buyers.contains(b)) {
					groupbuy.delBuyer(b);
				}
				else {
					groupbuy.addBuyer(b);
				}
						
		}
		
		repository.save(groupbuy);
		return ResponseEntity.ok(new MessageResponse("Groupbuy patched successfully"));
	}
	
	
	@DeleteMapping("/groupbuy/{id}")
	@PreAuthorize("hasRole('BROKER')")
	ResponseEntity<?> deleteGroupBuy(@PathVariable Long id) {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(userDetails.getUsername()).get();
		
		GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
		repository.deleteById(groupbuy.getId());
		
		return ResponseEntity.ok(new MessageResponse("Groupbuy deleted successfully"));
	}
	
}











































