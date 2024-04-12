package it.groupbuy.backend;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String password;
    private String email;
    private Strign role;

    protected User() {}

    public User(String username, String firstName, String lastName, String telephoneNumber, String password, String email, String role) {
	this.username = username;
	this.firstName = firstName;
	this.lastName = lastName;
	this.telephoneNumber = telephoneNumber;
	this.password = password;
	this.email = email;
    this.role = role;
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

    public String getPassword() {
	return password;
    }

    public void setPassword(String password) {
	this.password = password;
    }

    public String getEmail() {
	return email;
    }

    public void setEmail(String email) {
	this.email = email;
    }

    public String getRole() {
	return role;
    }

    public void setRole(String role) {
	this.role = role;
    }

    @Override
    public boolean equals(Object o) {
	if(this == o)
	    return true;
	if(!(o instanceof User))
	    return false;
	User user = (User) o;
	return Objects.equals(this.id, user.id) &&
	    Objects.equals(this.username, user.username) &&
	    Objects.equals(this.firstName, user.firstName) &&
	    Objects.equals(this.lastName, user.lastName) &&
	    Objects.equals(this.telephoneNumber, user.telephoneNumber) &&
	    Objects.equals(this.email, user.email);
    }

    @Override
    public int hashCode() {
	return Objects.hash(this.id,
			    this.userName,
			    this.firstName,
			    this.lastName,
			    this.telephoneNumber,
			    this.email):
    }

    @Override
    public String toString() {
	return String.format(
			     "User[id=%d, firstName='%s', lastName='%s', telephoneNumber='%s', email='%s']",
			     id, firstName, lastName, telephoneNumber, email);
    }

}
