package it.groupbuy.backend.models;

import java.util.List;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users",
       uniqueConstraints = {
	   @UniqueConstraint(columnNames = "username"),
	   @UniqueConstraint(columnNames = "email")
       })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @NotBlank
    @Size(max = 20)
    private String firstName;

    @NotBlank
    @Size(max = 20)
    private String lastName;

    @NotBlank
    @Size(max = 18)
    private String telephoneNumber;

    private String profilePicturePath;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
	       joinColumns = @JoinColumn(name = "user_id"),
	       inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "buyers")
    private List<GroupBuy> subscribed_groupbuy;

    @OneToMany(fetch = FetchType.EAGER, mappedBy="broker")
    private List<GroupBuy> owned_groupbuy;

    // If we have a broker
    @OneToMany
    private List<GroupBuy> publishedGroupbuy = new ArrayList<>();

    // If we have a buyer
    @OneToMany
    private List<GroupBuy> subscribedGroupbuy = new ArrayList<>();

    public User() {}

    public User(String username, String email, String password, String firstName, String lastName, String telephoneNumber) {
	this.username = username;
	this.email = email;
	this.password = password;
	this.firstName = firstName;
	this.lastName = lastName;
	this.telephoneNumber = telephoneNumber;
    }

    public void removeOwnedGropbuy(GroupBuy g) {
    	this.owned_groupbuy.remove(g);
    }

    public void addOwnedGropbuy(GroupBuy g) {
    	this.owned_groupbuy.add(g);
    }

    public void addSubscribedGropbuy(GroupBuy g) {
    	this.subscribed_groupbuy.add(g);
    }

    public void deleteSubscribedGropbuy(GroupBuy g) {
    	this.subscribed_groupbuy.remove(g);
    }


    public List<GroupBuy> getSubscribed_groupbuy() {
	return subscribed_groupbuy;
    }

    public void setSubscribed_groupbuy(List<GroupBuy> subscribed_groupbuy) {
	this.subscribed_groupbuy = subscribed_groupbuy;
    }

    public List<GroupBuy> getOwned_groupbuy() {
	return owned_groupbuy;
    }

    public void setOwned_groupbuy(List<GroupBuy> owned_groupbuy) {
	this.owned_groupbuy = owned_groupbuy;
    }

    public Long getId() {
	return id;
    }

    public void setId(Long id) {
	this.id = id;
    }

    public String getUsername() {
	return username;
    }

    public void setUsername(String username) {
	this.username = username;
    }

    public String getEmail() {
	return email;
    }

    public void setEmail(String email) {
	this.email = email;
    }

    public String getPassword() {
	return password;
    }

    public void setPassword(String password) {
	this.password = password;
    }

    public String getFirstName() {
	return firstName;
    }

    public void setFirstName(String firstName) {
	this.firstName = firstName;
    }

    public String getLastName() {
	return lastName;
    }

    public void setLastName(String lastName) {
	this.lastName = lastName;
    }

    public String getTelephoneNumber() {
	return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
	this.telephoneNumber = telephoneNumber;
    }

    public Set<Role> getRoles() {
	return roles;
    }

    public void setRoles(Set<Role> roles) {
	this.roles = roles;
    }


    public String getProfilePicturePath() {
	return profilePicturePath;
    }

    public void setProfilePicturePath(String profilePicturePath) {
	this.profilePicturePath = profilePicturePath;
    }

    public List<GroupBuy> getSubscribedGroupbuy() {
	return subscribedGroupbuy;
    }

    public void setSubscribedGroupbuy(List<GroupBuy> subscribedGroupbuy) {
	this.subscribedGroupbuy = subscribedGroupbuy;
    }

    public List<GroupBuy> getPublishedGroupbuy() {
	return publishedGroupbuy;
    }

    public void setPublishedGroupbuy(List<GroupBuy> publishedGroupbuy) {
	this.publishedGroupbuy = publishedGroupbuy;
    }
}
