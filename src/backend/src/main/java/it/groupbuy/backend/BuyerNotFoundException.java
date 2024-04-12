package it.groupbuy.backend;

public class BuyerNotFoundException extends RuntimeException {

    public BuyerNotFoundException(Long id) {
	super("Could not find Buyer " + id);
    }
}
