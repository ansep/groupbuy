package it.groupbuy.backend.payload.response;

import it.groupbuy.backend.models.EStatus;

public class GroupbuyResponse {

    private Long id;
    private Integer maxSize;
    private String description;
    private String category;
    private String product;
    private Float cost;
    private EStatus status;
    private String location;
    private String postingPicturePath;

    public GroupbuyResponse(Long id, Integer maxSize, String description,
			    String category,String product, Float cost,EStatus status, String location,
			    String postingPicturePath) {
    	this.id = id;
	this.maxSize = maxSize;
    	this.description = description;
    	this.category = category;
    	this.product = product;
    	this.cost = cost;
    	this.status = status;
    	this.location = location;
	this.postingPicturePath = postingPicturePath;
    }

    public Long getId() {
    	return id;
    }

    public void setId(Long id) {
    	this.id = id;
    }

    public Integer getMaxSize() {
    	return this.maxSize;
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

    public Float getCost() {
    	return cost;
    }

    public void setCost(Float cost) {
    	this.cost = cost;
    }

    public String getPostingPicturePath() {
	return postingPicturePath;
    }

    public void setPostingPicturePath(String postingPicturePath) {
	this.postingPicturePath = postingPicturePath;
    }

}
