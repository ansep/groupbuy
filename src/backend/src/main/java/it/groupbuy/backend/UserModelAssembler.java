package it.groupbuy.backend;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

// It allows to move from objects of the DB to java objects
@Component
class UserModelAssembler implements RepresentationModelAssembler<User, EntityModel<User>> {

  @Override
  public EntityModel<User> toModel(User user) {
	  
	  EntityModel<User> user_model = EntityModel.of(user, //
        linkTo(methodOn(UserController.class).one(user.getId())).withSelfRel(),
        linkTo(methodOn(UserController.class).all()).withRel("users"));
	  
	  return user_model;
  }
}
