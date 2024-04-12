package it.groupbuy.backend;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.RepresentationModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class RootController { /*provides root routes of the application*/
	
	@GetMapping
	RepresentationModel<?> index () {
		
		RepresentationModel<?> rootmodel = new RepresentationModel();
		rootmodel.add(linkTo(methodOn(UserController.class).all()).withRel("users"));
		return rootmodel;
	}
	
	
}
