package it.groupbuy.backend.controllers;

import java.util.ArrayList;
import java.util.HashSet;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.groupbuy.backend.models.ERole;
import it.groupbuy.backend.models.GroupBuy;
import it.groupbuy.backend.models.Role;
import it.groupbuy.backend.models.User;
import it.groupbuy.backend.payload.request.LoginRequest;
import it.groupbuy.backend.payload.request.SignupRequest;
import it.groupbuy.backend.payload.response.JwtResponse;
import it.groupbuy.backend.payload.response.MessageResponse;
import it.groupbuy.backend.repository.RoleRepository;
import it.groupbuy.backend.repository.UserRepository;
import it.groupbuy.backend.security.jwt.JwtUtils;
import it.groupbuy.backend.security.services.UserDetailsImpl;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

	Authentication authentication =
	    authenticationManager
	    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

	SecurityContextHolder.getContext().setAuthentication(authentication);
	String jwt = jwtUtils.generateJwtToken(authentication);

	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
	List<String> roles = userDetails.getAuthorities().stream()
	    .map(item -> item.getAuthority())
	    .collect(Collectors.toList());

	return ResponseEntity.ok(new JwtResponse(jwt,
						 userDetails.getId(),
						 userDetails.getUsername(),
						 userDetails.getEmail(),
						 roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
	if (userRepository.existsByUsername(signUpRequest.getUsername())) {
	    return ResponseEntity
		.badRequest()
		.body(new MessageResponse("Error: Username is already taken!"));
	}

	if (userRepository.existsByEmail(signUpRequest.getEmail())) {
	    return ResponseEntity
		.badRequest()
		.body(new MessageResponse("Error: Email is already in use!"));
	}

	// Create new user's account
	User user = new User(signUpRequest.getUsername(),
			     signUpRequest.getEmail(),
			     encoder.encode(signUpRequest.getPassword()),
			     signUpRequest.getFirstName(),
			     signUpRequest.getLastName(),
			     signUpRequest.getTelephoneNumber());

	List<GroupBuy> own_groups = new ArrayList<GroupBuy>();
	List<GroupBuy> sub_groups = new ArrayList<GroupBuy>();
	Set<String> strRoles = signUpRequest.getRole();
	Set<Role> roles = new HashSet<>();

	if (strRoles.isEmpty()) {
	    // Role userRole = roleRepository.findByName(ERole.ROLE_BUYER)
	    // 	.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	    // roles.add(userRole);
	    return ResponseEntity
		.badRequest()
		.body(new MessageResponse("Error: A role has to be specified"));
	} else {
	    strRoles.forEach(role -> {
		    switch (role.toLowerCase()) {
		    case "broker":
			Role brokerRole = roleRepository.findByName(ERole.ROLE_BROKER)
			    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(brokerRole);

			break;
		    default:
			Role userRole = roleRepository.findByName(ERole.ROLE_BUYER)
			    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		    }
		});
	}

	user.setOwned_groupbuy(own_groups);
	user.setSubscribed_groupbuy(sub_groups);
	user.setRoles(roles);
	userRepository.save(user);

	return ResponseEntity.ok(new MessageResponse("User registered successfully!", user.getId()));
    }
}
