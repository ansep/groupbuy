package it.groupbuy.backend;

import java.util.Objects;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String password;
    private String roles;

    private String firstName;
    private String lastName;
    private String telephoneNumber;

    public UserInfo() {}

    public UserInfo(String username,
		    String email,
		    String password,
		    String roles,
		    String firstName,
		    String lastName,
		    String telephoneNumber) {
	this.username = username;
	this.email = email;
	this.password = password;
	this.roles = roles;
	this.firstName = firstName;
	this.lastName = lastName;
	this.telephoneNumber = telephoneNumber;
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

    public String getRoles() {
	return roles;
    }

    public void setRoles(String roles) {
	this.roles = roles;
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

    @Override
    public String toString() {
	return String.format("UserInfo[id=%d, username=%d, email=%d, roles=%d, firstName=%d, lastName=%d, telephoneNumber=%d]",
			     this.id,
			     this.username,
			     this.email,
			     this.roles,
			     this.firstName,
			     this.lastName,
			     this.telephoneNumber);
    }

    @Override
    public boolean equals(Object obj) {
	if(this == obj)
	    return true;
	if(!(obj instanceof UserInfo))
	    return false;
	UserInfo userInfo = (UserInfo) obj;
	return Objects.equals(this.id, userInfo.id) &&
	    Objects.equals(this.username, userInfo.username) &&
	    Objects.equals(this.email, userInfo.email) &&
	    Objects.equals(this.roles, userInfo.roles) &&
	    Objects.equals(this.firstName, userInfo.firstName) &&
	    Objects.equals(this.lastName, userInfo.lastName) &&
	    Objects.equals(this.telephoneNumber, userInfo.telephoneNumber);
    }

    @Override
    public int hashCode() {
	return Objects.hash(this.id,
			    this.username,
			    this.email,
			    this.roles,
			    this.firstName,
			    this.lastName,
			    this.telephoneNumber);
    }
}
