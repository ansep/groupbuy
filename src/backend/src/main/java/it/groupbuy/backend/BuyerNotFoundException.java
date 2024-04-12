package it.groupbuy.backend;

class BuyerNotFoundException extends RuntimeException{
	
	BuyerNotFoundException(Long id) {
		super("Could not found buyer " + id);
	}

}
