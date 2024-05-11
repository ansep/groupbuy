
package it.groupbuy.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.groupbuy.backend.models.User;
import it.groupbuy.backend.payload.request.PatchRequest;
import it.groupbuy.backend.payload.response.MessageResponse;
import it.groupbuy.backend.repository.UserRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserRepository userRepository;


    @PatchMapping("/user")
    @PreAuthorize("hasRole('BUYER') or hasRole('BROKER')")
    public ResponseEntity<?> patchUser(@Valid @RequestBody PatchRequest patchRequest) {
	UserDetails userDetails =
	    (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	User user = userRepository.findByUsername(userDetails.getUsername()).get();
	// FIXME: Sarebbe meglio iterando i field tramite reflection
	// vedi https://medium.com/@devchopra999/handling-patch-requests-efficiently-in-springboot-3db06e4783e2
	if(patchRequest.getEmail() != null)
	    user.setEmail(patchRequest.getEmail());
	if(patchRequest.getFirstName() != null)
	    user.setFirstName(patchRequest.getFirstName());
	if(patchRequest.getLastName() != null)
	    user.setLastName(patchRequest.getLastName());
	if(patchRequest.getTelephoneNumber() != null)
	    user.setTelephoneNumber(patchRequest.getTelephoneNumber());
	userRepository.save(user);
	return ResponseEntity.ok(new MessageResponse("User patched successfully"));
    }


}
