package it.groupbuy.backend;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

// It allows to move from objects of the DB to java objects
@Component
class BuyerModelAssembler implements RepresentationModelAssembler<Buyer, EntityModel<Buyer>> {

  @Override
  public EntityModel<Buyer> toModel(Buyer buyer) {
	  
	  EntityModel<Buyer> buyer_model = EntityModel.of(buyer, //
        linkTo(methodOn(BuyerController.class).one(buyer.getId())).withSelfRel(),
        linkTo(methodOn(BuyerController.class).all()).withRel("buyers"));
	  
	  return buyer_model;
  }
}
