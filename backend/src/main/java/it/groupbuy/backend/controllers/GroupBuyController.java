package it.groupbuy.backend.controllers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import it.groupbuy.backend.models.User;
import it.groupbuy.backend.payload.response.MessageResponse;
import it.groupbuy.backend.repository.GroupbuyRepository;
import it.groupbuy.backend.models.GroupBuyModelAssembler;
import it.groupbuy.backend.models.GroupBuyNotFoundException;
import it.groupbuy.backend.repository.UserRepository;
import jakarta.validation.Valid;
import it.groupbuy.backend.models.EStatus;
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
    

    @GetMapping("/api/auth/groupbuy")
    public CollectionModel<EntityModel<GroupBuy>> all() { // load one by one the buyers
    	List<EntityModel<GroupBuy>> groupbuy = repository.findAll().stream() // load one by one the groupbuys and put them in a list
	    .map(assembler::toModel).collect(Collectors.toList());
		return CollectionModel.of(groupbuy, //
				  linkTo(methodOn(GroupBuyController.class).all()).withSelfRel()); // creates the hateoas links to the objects
    }


    @GetMapping("/api/auth/groupbuy/{id}")
    	public EntityModel<GroupBuy> one(@PathVariable Long id) {
    	GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
		return assembler.toModel(groupbuy);
    }


    @GetMapping("/groupbuy")
    @PreAuthorize("hasRole('BUYER') or hasRole('BROKER')")
    public CollectionModel<EntityModel<GroupBuy>> allAuth() { // load one by one the buyers
    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(userDetails.getUsername()).get();
		List<EntityModel<GroupBuy>> groupbuy = repository.findAll().stream() // load one by one the groupbuys and put them in a list
	    .map(assembler::toModel).collect(Collectors.toList());
		return CollectionModel.of(groupbuy, //
				  linkTo(methodOn(GroupBuyController.class).allAuth()).withSelfRel()); // creates the hateoas links to the objects
    }


    @GetMapping("/groupbuy/{id}")
    @PreAuthorize("hasRole('BUYER') or hasRole('BROKER')")
    public EntityModel<GroupBuy> oneAuth(@PathVariable Long id) {
    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(userDetails.getUsername()).get();
		GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
		return assembler.toModel(groupbuy);
    }

    @GetMapping("/api/auth/groupbuy?={product}")
   	public CollectionModel<EntityModel<GroupBuy>> oneByProduct(@RequestParam String product) {
       	List<EntityModel<GroupBuy>> groupbuy = repository.findByProduct(product).stream() // load one by one the groupbuys and put them in a list
       		    .map(assembler::toModel).collect(Collectors.toList());
       	return CollectionModel.of(groupbuy, //
   				 linkTo(methodOn(GroupBuyController.class).oneByProduct(product)).withSelfRel());
     }

    @PatchMapping("/groupbuy/{id}")
    @PreAuthorize("hasRole('BROKER')")
    ResponseEntity<?> patchGroupBuy(@Valid @RequestBody GroupBuyPatchRequest patchRequest, @PathVariable Long id) {
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
		repository.save(groupbuy);
		return ResponseEntity.ok(new MessageResponse("Groupbuy patched successfully"));
    }


    @DeleteMapping("/groupbuy/{id}")
    @PreAuthorize("hasRole('BROKER')")
    ResponseEntity<?> deleteGroupBuy(@PathVariable Long id) {
    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
		repository.deleteById(groupbuy.getId());
		return ResponseEntity.ok(new MessageResponse("Groupbuy deleted successfully"));
    }


    @PostMapping("/groupbuy")
    @PreAuthorize("hasRole('BROKER')")
    ResponseEntity<?> newGroupBuy(@RequestBody GroupBuyPatchRequest request) {
    	GroupBuy groupbuy = new GroupBuy(request.getBroker(), request.getBuyers(), request.getMaxSize(), request.getMinSize(), 
    			request.getDescription(), request.getCategory(), request.getProduct(), request.getCost(), request.getStatus(), 
    			request.getLocation());
    	repository.save(groupbuy);
    	return ResponseEntity.ok(new MessageResponse("Groupbuy created successfully"));
    }

}
