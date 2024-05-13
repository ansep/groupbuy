package it.groupbuy.backend.models;

class GroupBuyNotFoundException extends RuntimeException{
	
	GroupBuyNotFoundException(long id) {
		super("Could not found GroupBuy " + id);
		
	}

}