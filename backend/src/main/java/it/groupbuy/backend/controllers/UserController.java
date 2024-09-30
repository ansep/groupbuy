
package it.groupbuy.backend.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import it.groupbuy.backend.models.ERole;
import it.groupbuy.backend.models.EStatus;
import it.groupbuy.backend.models.GroupBuy;
import it.groupbuy.backend.models.User;
import it.groupbuy.backend.payload.request.PasswordRequest;
import it.groupbuy.backend.payload.request.PatchRequest;
import it.groupbuy.backend.payload.response.GroupbuyResponse;
import it.groupbuy.backend.payload.response.MessageResponse;
import it.groupbuy.backend.payload.response.UserResponse;
import it.groupbuy.backend.repository.GroupbuyRepository;
import it.groupbuy.backend.repository.RoleRepository;
import it.groupbuy.backend.repository.UserRepository;
import it.groupbuy.backend.service.FilesStorageService;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    FilesStorageService storageService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GroupbuyRepository groupbuyRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @DeleteMapping("/user")
    @Transactional
    ResponseEntity<?> deleteUser() {
    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	User user = userRepository.findByUsername(userDetails.getUsername()).get();
	List<GroupBuy> list = new ArrayList<>();
	if(user.getRoles().contains(roleRepository.findByName(ERole.ROLE_BROKER).get()))
	    list = user.getOwned_groupbuy();
	if(user.getRoles().contains(roleRepository.findByName(ERole.ROLE_BUYER).get()))
	    list = user.getSubscribed_groupbuy();
	for (GroupBuy groupBuy : list) {
	    groupbuyRepository.delete(groupBuy);
	}
	userRepository.deleteById(user.getId());
	return ResponseEntity.ok(new MessageResponse("User deleted successfully", user.getId()));
    }

    @GetMapping("/user/{id}")
    public UserResponse getUserResponse(@PathVariable Long id) {
	User user = userRepository.findById(id).get();
	UserResponse ret  = new UserResponse(user.getId(),
					     user.getUsername(),
					     user.getEmail(),
					     user.getFirstName(),
					     user.getLastName(),
					     user.getTelephoneNumber(),
					     user.getProfilePicturePath());
	return ret;
    }

    @GetMapping("/user/byname/{username}")
    public UserResponse getUserResponse(@PathVariable String username) {
	User user = userRepository.findByUsername(username).get();
	UserResponse ret  = new UserResponse(user.getId(),
					     user.getUsername(),
					     user.getEmail(),
					     user.getFirstName(),
					     user.getLastName(),
					     user.getTelephoneNumber(),
					     user.getProfilePicturePath());
	return ret;
    }

    @PutMapping("/user/password")
    @PreAuthorize("hasRole('BUYER') or hasRole('BROKER')")
    public ResponseEntity<?> putPassword(@RequestBody PasswordRequest passwordRequest) {
    	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	User user = userRepository.findByUsername(userDetails.getUsername()).get();
	authenticationManager
	    .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), passwordRequest.getCurrentPassword()));
	if(!passwordRequest.getNewPassword().equals(passwordRequest.getConfirmPassword()))
	    return ResponseEntity.badRequest().body(new MessageResponse("Error: password confirmation mismatch", user.getId()));
	user.setPassword(encoder.encode(passwordRequest.getNewPassword()));
	userRepository.save(user);
	return ResponseEntity.ok(new MessageResponse("Password changed succesfully", user.getId()));
    }

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

    @PostMapping("/user/picture")
    @PreAuthorize("hasRole('BUYER') or hasRole('BROKER')")
    public ResponseEntity<?> putProfilePicture(@RequestParam("file") MultipartFile file) {
	UserDetails userDetails =
	    (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	User user = userRepository.findByUsername(userDetails.getUsername()).get();
	String message = "";
	try {
	    storageService.save(file);
	    message = "Uploaded the file successfully: " + file.getOriginalFilename();
	    user.setProfilePicturePath(file.getOriginalFilename());
	    userRepository.save(user);
	    return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
	} catch (Exception e) {
	    message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
	    return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
	}
    }

    @GetMapping("/user/{id}/picture")
    public ResponseEntity<?> getProfilePicture(@PathVariable("id") Long id) {
	User user = userRepository.findById(id).get();
	Resource file = storageService.load(user.getProfilePicturePath());
	return ResponseEntity.ok()
	    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @GetMapping("/user/{id}/ownedGroupbuy")
    @PreAuthorize("hasRole('BROKER')")
    @Transactional
    public ResponseEntity<?> get_owned_groupbuy(@PathVariable Long id) {
	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	User user = userRepository.findByUsername(userDetails.getUsername()).get();
	List<GroupbuyResponse> res = new ArrayList<>();
	List<GroupBuy> groupbuys = user.getOwned_groupbuy();
	int n = groupbuys.size();
	for (int i=0; i<n; i++) {
	    GroupBuy g = groupbuys.get(i);
	    GroupbuyResponse response =
		new GroupbuyResponse(g.getId(), g.getMaxSize(),
				     g.getDescription(), g.getCategory(), g.getProduct(),g.getCost(), g.getStatus(),
				     g.getLocation(), g.getPostingPicturePath());
	    res.add(response);
	}
	return ResponseEntity.accepted().body(res);
    }

    @GetMapping("/user/{id}/subscribedGroupbuy")
    @PreAuthorize("hasRole('BUYER')")
    @Transactional
    public ResponseEntity<?> get_subscribed_groupbuy(@PathVariable Long id) {
	UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	User user = userRepository.findByUsername(userDetails.getUsername()).get();
	List<GroupbuyResponse> res = new ArrayList<>();
	List<GroupBuy> groupbuys = user.getSubscribed_groupbuy();
	int n = groupbuys.size();
	for (int i=0; i<n; i++) {
	    GroupBuy g = groupbuys.get(i);
	    GroupbuyResponse response =
		new GroupbuyResponse(g.getId(), g.getMaxSize(),
				     g.getDescription(), g.getCategory(), g.getProduct(),g.getCost(), g.getStatus(),
				     g.getLocation(), g.getPostingPicturePath());
	    res.add(response);
	}
	return ResponseEntity.accepted().body(res);
    }


}
