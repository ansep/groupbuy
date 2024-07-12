package it.groupbuy.backend.controllers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import it.groupbuy.backend.models.User;
import it.groupbuy.backend.payload.response.UserResponse;
import it.groupbuy.backend.payload.response.GroupbuyResponse;
import it.groupbuy.backend.payload.response.JwtResponse;
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
		List<EntityModel<GroupBuy>> groupbuy = repository.findAll().stream() // load one by one the groupbuys and put them in a list
	    .map(assembler::toModel).collect(Collectors.toList());
		return CollectionModel.of(groupbuy, //
				  linkTo(methodOn(GroupBuyController.class).allAuth()).withSelfRel()); // creates the hateoas links to the objects
    }

    
    @GetMapping("/groupbuy/{id}")
    @PreAuthorize("hasRole('BUYER') or hasRole('BROKER')")
    public EntityModel<GroupBuy> oneAuth(@PathVariable Long id) {
		GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
		return assembler.toModel(groupbuy);
    }

    
    @PatchMapping("/groupbuy/{id}")
    @PreAuthorize("hasRole('BROKER')")
    ResponseEntity<?> patchGroupBuy(@Valid @RequestBody GroupBuyPatchRequest patchRequest, @PathVariable Long id) {
    	GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(userDetails.getUsername()).get();
    	if (!groupbuy.getBroker().getUsername().equals(user.getUsername())) {
    		return ResponseEntity.badRequest().body("Groupbuy not owned");
    	}
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
    @Transactional
    ResponseEntity<?> deleteGroupBuy(@PathVariable Long id) {
    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(userDetails.getUsername()).get();
		GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
		if (!user.getOwned_groupbuy().contains(groupbuy)) {
			return ResponseEntity.badRequest().body("Groupbuy not owned");
		}
		List<GroupBuy> own_groups = user.getOwned_groupbuy();
		own_groups.remove(groupbuy);
		user.setOwned_groupbuy(own_groups);
		userRepository.save(user);
		repository.deleteById(groupbuy.getId());
		return ResponseEntity.ok(new MessageResponse("Groupbuy deleted successfully"));
    }


    @PostMapping("/groupbuy")
    @PreAuthorize("hasRole('BROKER')")
    @Transactional
    ResponseEntity<?> newGroupBuy(@RequestBody GroupBuyPatchRequest request) {
    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(userDetails.getUsername()).get();
    	GroupBuy groupbuy = new GroupBuy(user, request.getMaxSize(),  request.getDescription(), 
    			request.getCategory(), request.getProduct(), request.getCost(), request.getStatus(), 
    			request.getLocation());
    	List<GroupBuy> sub_groups = new ArrayList<GroupBuy>();
    	List<GroupBuy> own_groups = new ArrayList<GroupBuy>();
    	own_groups.add(groupbuy);
    	user.setOwned_groupbuy(own_groups);
    	user.setSubscribed_groupbuy(sub_groups);
    	List<User> newBuyers = new ArrayList<User>();
    	groupbuy.setBuyers(newBuyers);
    	userRepository.save(user);
    	repository.save(groupbuy);
    	return ResponseEntity.ok(new MessageResponse("Groupbuy created successfully"));
    }

    
    @PostMapping("/groupbuy/{id}/subscription")
    @PreAuthorize("hasRole('BUYER')")
    @Transactional
    ResponseEntity<?> subscribe(@PathVariable Long id) {
    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(userDetails.getUsername()).get();
		GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
    	if (groupbuy.getBuyers().contains(user)) {
    		return ResponseEntity.badRequest().body("Already subscribed to this groupbuy");
    	}
    	if (groupbuy.getStatus().equals(EStatus.CLOSE)) {
    		return ResponseEntity.badRequest().body("Groupbuy status: CLOSED");
    	}
    	List<User> b = groupbuy.getBuyers();
		b.add(user);
		groupbuy.setBuyers(b);
		List<GroupBuy> g = user.getSubscribed_groupbuy();
		g.add(groupbuy);
    	user.setSubscribed_groupbuy(g);
    	if (g.size() == groupbuy.getMaxSize()) {
    		groupbuy.setStatus(EStatus.CLOSE);
    	}
    	userRepository.save(user);
    	repository.save(groupbuy);
    	return ResponseEntity.ok(new MessageResponse("Subscription done successfully"));
    }
    
    
    @DeleteMapping("/groupbuy/{id}/subscription")
    @PreAuthorize("hasRole('BUYER')")
    @Transactional
    ResponseEntity<?> unsubscribe(@PathVariable Long id) {
    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(userDetails.getUsername()).get();
		GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
    	if (!groupbuy.getBuyers().contains(user)) {
    		return ResponseEntity.badRequest().body("Already unsubscribed to this groupbuy");
    	}
    	if (groupbuy.getStatus().equals(EStatus.CLOSE)) {
    		return ResponseEntity.badRequest().body("Groupbuy status: CLOSED");
    	}
    	List<User> u = groupbuy.getBuyers();
		u.remove(user);
    	groupbuy.setBuyers(u);
    	List<GroupBuy> g = user.getSubscribed_groupbuy();
    	g.remove(groupbuy);
    	user.setSubscribed_groupbuy(g);
    	userRepository.save(user);
    	repository.save(groupbuy);
    	return ResponseEntity.ok(new MessageResponse("Unsubscription done successfully"));
    }
    
    @GetMapping("/groupbuy/{id}/broker")
    @PreAuthorize("hasRole('BUYER')")
    @Transactional
    ResponseEntity<?> getBroker(@PathVariable Long id){
    	GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
    	User broker = groupbuy.getBroker();
    	UserResponse res = new UserResponse(broker.getId(), broker.getUsername(), broker.getEmail());
    	return ResponseEntity.accepted().body(res);
}
    
    @GetMapping("/groupbuy/{id}/subscription")
    @PreAuthorize("hasRole('BROKER')")
    @Transactional
    ResponseEntity<?> getBuyers(@PathVariable Long id){
    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userRepository.findByUsername(userDetails.getUsername()).get();
		GroupBuy groupbuy = repository.findById(id).orElseThrow(() -> new GroupBuyNotFoundException(id));
		if (!user.getOwned_groupbuy().contains(groupbuy)) {
			ResponseEntity.badRequest().body("Groupbuy not owned");
		}
		List<UserResponse> res = new ArrayList<>();
		List<User> buyers = groupbuy.getBuyers();
		int n = buyers.size();
		for (int i=0; i<n; i++) {
			User buyer = buyers.get(i);
			UserResponse response = new UserResponse(buyer.getId(),  buyer.getUsername(), buyer.getEmail());
			res.add(response);
		}
		return ResponseEntity.accepted().body(res);
    }
    
}
