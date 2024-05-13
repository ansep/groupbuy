package it.groupbuy.backend.controllers;

//scaricare postman
import java.util.HashSet;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import it.groupbuy.backend.repository.RoleRepository;
import it.groupbuy.backend.repository.UserRepository;
import it.groupbuy.backend.security.jwt.JwtUtils;
import it.groupbuy.backend.security.services.UserDetailsImpl;
import jakarta.validation.Valid;

@RestController

public class GroupBuyController {

    private final GroupbuyRepository repository;
	private final GroupBuyModelAssembler assembler;

	GroupBuyController(GroupBuyRepository repository, GroupBuyModelAssembler assembler) {
		this.repository = repository;
	    this.assembler = assembler;
	}

	
	@GetMapping("api/auth/groupbuy")
	CollectionModel<EntityModel<GroupBuy>> all() { // load one by one the buyers

		List<EntityModel<GroupBuy>> groupbuy = GroupbuyRepository.findAll().stream() // load one by one the buyers and put them in a list
	        .map(assembler::toModel) //
	        .collect(Collectors.toList());

	    return CollectionModel.of(groupbuy, //
	        linkTo(methodOn(GroupBuyController.class).all()).withSelfRel()); // creates the hateoas links to the objects
	}
	
	@GetMapping("api/auth/groupbuy/{id}")
	EntityModel<GroupBuy> one(@PathVariable Long id) {

		GroupBuy groupbuy = GroupbuyRepository.findById(id) //
	        .orElseThrow(() -> new GroupBuyNotFoundException(id));

	    return assembler.toModel(groupbuy);
	}
	
	@PutMapping("/groupbuy/{id}")
	GroupBuy replaceGroupBuy(@RequestBody GroupBuy newgroupbuy, @PathVariable Long id) {
		
		return repository.findById(id)
	      .map(groupbuy -> {
	    	groupbuy.setMinSize(newgroupbuy.getMinSize());
	    	groupbuy.setMaxSize(newgroupbuy.getMaxSize());
	    	groupbuy.setDescription(newgroupbuy.getDescription());
	    	groupbuy.setProduct(newgroupbuy.getProduct());
	    	groupbuy.setLocation(newgroupbuy.getLocation());
	    	groupbuy.setStatus(newgroupbuy.getStatus());
	    	groupbuy.setCost(newgroupbuy.getCost());
	    	groupbuy.setCategory(newgroupbuy.getCategory());
	        return repository.save(groupbuy);
	      })
	      .orElseThrow(() -> new GroupBuyNotFoundException(id));
	}
	
	@DeleteMapping("/groupbuy/{id}")
	void deleteGroupBuy(@PathVariable Long id) {
		GroupBuy groupbuy = repository.findById(id) //
						.orElseThrow(() -> new GroupBuyNotFoundException(id));
		repository.deleteById(groupbuy.getId());
	}
	
}











































