package it.groupbuy.backend.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "GroupBuy")
public class GroupBuy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@ManyToMany
    @JoinTable(
      name = "subscriptions", 
      joinColumns = @JoinColumn(name = "user_id"), 
      inverseJoinColumns = @JoinColumn(name = "groupbuy_id"))
    private List<User> buyers;

	@ManyToOne
    @JoinColumn(name="user_id")
    private User broker;
    
    @NotNull
    private Integer maxSize;

    @NotBlank
    @Size(max = 100)
    private String description;

    @NotBlank
    @Size(max = 100)
    private String category;

    @NotBlank
    @Size(max = 100)
    private String product;

    @NotNull
    private Float cost;

    @NotNull
    private EStatus status;

    @NotBlank
    @Size(max = 20)
    private String location;

    public GroupBuy() {}

    public GroupBuy(User broker, Integer maxSize, String description, String category,
		    String product, Float cost, EStatus status, String location) {
    	this.broker = broker;
    	this.maxSize = maxSize;
    	this.description = description;
    	this.category = category;
    	this.product = product;
    	this.cost = cost;
    	this.status = status;
    	this.location = location;
    }

    public Long getId() {
    	return id;
    }

    public void setId(Long id) {
    	this.id = id;
    }

    public User getBroker() {
    	return this.broker;
    }

    public void setBroker(User broker) {
    	this.broker = broker;
    }
    
    public List<User> getBuyers() {
    	return this.buyers;
    }
    
    public void setBuyers(List<User> buyers) {
    	this.buyers = buyers;
    }
    
    public void addBuyer(User buyer) {
    	this.buyers.add(buyer);
    }
    
    public void delBuyer(User buyer) {
    	this.buyers.remove(buyer);
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

    public void setCost(float cost) {
    	this.cost = cost;
    }

}
