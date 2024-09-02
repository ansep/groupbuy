package it.groupbuy.backend.models;

public class GroupBuyNotFoundException extends RuntimeException{
	
	public GroupBuyNotFoundException(long id) {
		super("Could not found GroupBuy with id: " + id);
		
	}
	
	public GroupBuyNotFoundException(String product) {
		super("Could not found GroupBuy with product: " + product);
		
	}

}