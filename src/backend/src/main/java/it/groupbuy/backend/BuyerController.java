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
class BuyerController {
	
	private final BuyerRepository buyerRepository;
	private final BuyerModelAssembler assembler;

	BuyerController(BuyerRepository orderRepository, BuyerModelAssembler assembler) {
		this.buyerRepository = orderRepository;
	    this.assembler = assembler;
	}
	
	
	@GetMapping("/buyers")
	CollectionModel<EntityModel<Buyer>> all() { // load one by one the buyers

		List<EntityModel<Buyer>> buyers = buyerRepository.findAll().stream() // load one by one the buyers and put them in a list
	        .map(assembler::toModel) //
	        .collect(Collectors.toList());

	    return CollectionModel.of(buyers, //
	        linkTo(methodOn(BuyerController.class).all()).withSelfRel()); // creates the hateoas links to the objects
	}
	
	
	@GetMapping("/buyers/{id}")
	EntityModel<Buyer> one(@PathVariable Long id) {

	    Buyer buyer = buyerRepository.findById(id) //
	        .orElseThrow(() -> new BuyerNotFoundException(id));

	    return assembler.toModel(buyer);
	}

	
	@PostMapping("/buyers/signup")
	ResponseEntity<EntityModel<Buyer>> newBuyer(@RequestBody Buyer buyer) {
		Buyer newBuyer =  buyerRepository.save(buyer);
		return ResponseEntity //
		        .created(linkTo(methodOn(BuyerController.class).one(newBuyer.getId())).toUri()) //
		        .body(assembler.toModel(newBuyer)); // creates hateoas link of the new buyer
	}
	
	
	@PutMapping("/buyers/{id}")
	Buyer replaceBuyer(@RequestBody Buyer newBuyer, @PathVariable Long id) {
	    
		return buyerRepository.findById(id)
	      .map(buyer -> {
	        buyer.setFirstName(newBuyer.getFirstName());
	        buyer.setLastName(newBuyer.getLastName());
	        buyer.setTelephoneNumber(newBuyer.getTelephoneNumber());
	        buyer.setEmail(newBuyer.getEmail());
	        buyer.setUsername(newBuyer.getUsername());
	        buyer.setPassword(newBuyer.getPassword());
	        return buyerRepository.save(buyer);
	      })
	      .orElseThrow(() -> new BuyerNotFoundException(id));
	 }
	
	
	@DeleteMapping("/buyers/{id}")
	void deleteBuyer(@PathVariable Long id) {
		Buyer buyer = buyerRepository.findById(id) //
						.orElseThrow(() -> new BuyerNotFoundException(id));
		buyerRepository.deleteById(buyer.getId());
		
	}
	
}


















