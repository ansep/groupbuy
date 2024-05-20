package it.groupbuy.backend.models;

import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @NotNull
    private Long broker;

    private ArrayList<Long> buyers = new ArrayList<Long>();

    @NotNull
    private Integer maxSize;

    @NotNull
    private Integer minSize;

    @NotBlank
    @Size(max = 100)
    private String description;

    @NotBlank
    @Size(max = 20)
    private String category;

    @NotBlank
    @Size(max = 20)
    private String product;

    @NotNull
    private Float cost;

    @NotNull
    private EStatus status;

    @NotBlank
    @Size(max = 20)
    private String location;

    public GroupBuy() {}

    public GroupBuy(Long broker, ArrayList<Long> buyers, Integer maxSize,
		    Integer minSize, String description, String category,
		    String product, Float cost, EStatus status, String location)
    {
	this.broker = broker;
	this.buyers = buyers;
	this.maxSize = maxSize;
	this.minSize = minSize;
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

    public Long getBroker() {
	return id;
    }

    public void setBroker(Long id) {
	this.broker = id;
    }

    public ArrayList<Long> getBuyers() {
	return buyers;
    }

    public void addBuyer(Long id) {
	buyers.add(id);
    }

    public void delBuyer(Long id) {
	buyers.remove(id);
    }

    public Integer getMinSize() {
	return minSize;
    }

    public void setMinSize(int size) {
	this.minSize = size;
    }

    public Integer getMaxSize() {
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

    public Float getCost() {
	return cost;
    }

    public void setCost(float cost) {
	this.cost = cost;
    }

}
