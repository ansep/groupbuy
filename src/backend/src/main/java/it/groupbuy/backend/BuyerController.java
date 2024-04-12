
package it.groupbuy.backend;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BuyerController {

    private final BuyerRepository buyerRepository;
    private final BuyerModelAssembler assembler;

    BuyerController(BuyerRepository buyerRepository, BuyerModelAssembler assembler) {
	this.buyerRepository = buyerRepository;
	this.assembler = assembler;
    }

    @GetMapping("/buyers")
    CollectionModel<EntityModel<Buyer>> all() {
	List<EntityModel<Buyer>> buyers = buyerRepository.findAll().stream()
	    .map(assembler::toModel)
	    .collect(Collectors.toList());

	return CollectionModel.of(buyers,
				  linkTo(methodOn(BuyerController.class).all()).withSelfRel());
    }

}
