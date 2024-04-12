package it.groupbuy.backend;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class UserController {
	
	private final UserRepository userRepository;
	private final UserModelAssembler assembler;

	UserController(UserRepository userRepository, UserModelAssembler assembler) {
		this.userRepository = userRepository;
	    this.assembler = assembler;
	}
	
	
	@GetMapping("/users")
	CollectionModel<EntityModel<User>> all() { // load one by one the users

		List<EntityModel<User>> users = userRepository.findAll().stream() // load one by one the users and put them in a list
	        .map(assembler::toModel) //
	        .collect(Collectors.toList());

	    return CollectionModel.of(users, //
	        linkTo(methodOn(UserController.class).all()).withSelfRel()); // creates the hateoas links to the objects
	}
	
	
	@GetMapping("/users/{id}")
	EntityModel<User> one(@PathVariable Long id) {

	    User user = userRepository.findById(id) //
	        .orElseThrow(() -> new UserNotFoundException(id));

	    return assembler.toModel(user);
	}

	
	@PostMapping("/users/signup")
	ResponseEntity<EntityModel<User>> newUser(@RequestBody User user) {
		User newUser =  userRepository.save(user);
		return ResponseEntity //
		        .created(linkTo(methodOn(UserController.class).one(newUser.getId())).toUri()) //
		        .body(assembler.toModel(newUser)); // creates hateoas link of the new user
	}
	
	
	@PutMapping("/users/{id}")
	User replaceUser(@RequestBody User newUser, @PathVariable Long id) {
	    
		return userRepository.findById(id)
	      .map(user -> {
	        user.setFirstName(newUser.getFirstName());
	        user.setLastName(newUser.getLastName());
	        user.setTelephoneNumber(newUser.getTelephoneNumber());
	        user.setEmail(newUser.getEmail());
	        user.setUsername(newUser.getUsername());
	        user.setPassword(newUser.getPassword());
	        return userRepository.save(user);
	      })
	      .orElseThrow(() -> new UserNotFoundException(id));
	 }
	
	
	@DeleteMapping("/users/{id}")
	void deleteUser(@PathVariable Long id) {
		User user = userRepository.findById(id) //
						.orElseThrow(() -> new UserNotFoundException(id));
		userRepository.deleteById(user.getId());
		
	}
	
}


















