package it.groupbuy.backend.models;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import it.groupbuy.backend.controllers.GroupBuyController;

// It allows to move from objects of the DB to java objects
@Component
public class GroupBuyModelAssembler implements RepresentationModelAssembler<GroupBuy, EntityModel<GroupBuy>> {

	  @Override
	  public EntityModel<GroupBuy> toModel(GroupBuy groupbuy) {
		  EntityModel<GroupBuy> groupbuy_model = EntityModel.of(groupbuy, //
			        linkTo(methodOn(GroupBuyController.class).one(groupbuy.getId())).withSelfRel(),
			        linkTo(methodOn(GroupBuyController.class).all()).withRel("/api/auth/groupbuy"));
		  return groupbuy_model;
	  }


}
