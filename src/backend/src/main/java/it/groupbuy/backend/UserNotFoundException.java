package it.groupbuy.backend;

class UserNotFoundException extends RuntimeException{
	
	UserNotFoundException(Long id) {
		super("Could not found user " + id);
	}

}
