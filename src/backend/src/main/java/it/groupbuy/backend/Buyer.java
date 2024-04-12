package it.groupbuy.backend;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Buyer {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String userName;
    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String password;
    private String email;

    protected Buyer() {}

    public Buyer(String userName, String firstName, String lastName, String telephoneNumber, String password, String email) {
	this.userName = userName;
	this.firstName = firstName;
	this.lastName = lastName;
	this.telephoneNumber = telephoneNumber;
	this.password = password;
	this.email = email;
    }


    public Long getId() {
	return id;
    }

    public void setId(Long id) {
	this.id = id;
    }

    public String getUserName() {
	return userName;
    }

    public void setUserName(String userName) {
	this.userName = userName;
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

    @Override
    public boolean equals(Object o) {
	if(this == o)
	    return true;
	if(!(o instanceof Buyer))
	    return false;
	Buyer buyer = (Buyer) o;
	return Objects.equals(this.id, buyer.id) &&
	    Objects.equals(this.userName, buyer.userName) &&
	    Objects.equals(this.firstName, buyer.firstName) &&
	    Objects.equals(this.lastName, buyer.lastName) &&
	    Objects.equals(this.telephoneNumber, buyer.telephoneNumber) &&
	    Objects.equals(this.email, buyer.email);
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
			     "Buyer[id=%d, firstName='%s', lastName='%s', telephoneNumber='%s', email='%s']",
			     id, firstName, lastName, telephoneNumber, email);
    }

}
