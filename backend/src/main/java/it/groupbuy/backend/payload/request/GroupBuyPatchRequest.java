package it.groupbuy.backend.payload.request;

import it.groupbuy.backend.models.EStatus;

public class GroupBuyPatchRequest {
	
	private int maxSize;
	 
	private String description;
	 
	private String category;

	private String product;
	 
	private float cost;
	 
	private EStatus status;
	 
	private String location;
	    
	public int getMaxSize() {
		return maxSize;
	}

	public void setMaxSize(int size) {
		this.maxSize = size;
	}
	    
	public String getDescription() {
		return description;
	}

	public void setDescription(String desc) {
		this.description = desc;
	}
	    
	public String getCategory() {
		return category;
	}

	public void setCategory(String cat) {
		this.category = cat;
	}
	    
	public String getProduct() {
		return product;
	}

	public void setProduct(String prod) {
		this.product = prod;
	}
	    
	public String getLocation() {
		return location;
	}

	public void setLocation(String loc) {
		this.location = loc;
	}
	    
	public EStatus getStatus() {
		return status;
	}

	public void setStatus(EStatus status) {
		this.status = status;
	}
	    
	public float getCost() {
		return cost;
	}

	public void setCost(float cost) {
		this.cost = cost;
	}
	
}
