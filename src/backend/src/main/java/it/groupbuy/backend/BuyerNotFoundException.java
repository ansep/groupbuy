package it.groupbuy.backend;

class BuyerNotFoundException extends RuntimeException{
	
	BuyerNotFoundException(long id) {
		super("Could not found buyer " + id);
		
	}

}
