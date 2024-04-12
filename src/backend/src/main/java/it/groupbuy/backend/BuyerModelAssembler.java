package it.groupbuy.backend;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
public class BuyerModelAssembler implements RepresentationModelAssembler<Buyer, EntityModel<Buyer>> {

    @Override
    public EntityModel<Buyer> toModel(Buyer buyer) {
	EntityModel<Buyer> buyerModel = EntityModel.of(buyer,
						       linkTo(methodOn(BuyerController.class).one(buyer.getId())).withSelfRel(),
						       linkTo(methodOn(BuyerController.class).all()).withRel("buyers"));
	return buyerModel;


    }
}
