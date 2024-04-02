package it.groupbuy.backend;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
class Buyer {


	private @Id @Generated Long id;
	private String firstName;
	private String lastName;
	private String telephoneNumber;
	private String email;
	private String Username;
	private String password;
	
	Buyer() {}

	Buyer(String firstName, String lastName, String telephoneNumber, String email, String Username, String password) {

		this.firstName = firstName;
	    this.lastName = lastName;
	    this.telephoneNumber = telephoneNumber;
	    this.email = email;
	    this.Username = Username;
	    this.password = password;
	 }

	 public String getName() {
		 return this.firstName + " " + this.lastName;
	 }

	 public void setName(String name) {
		 String[] parts = name.split(" ");
		 this.firstName = parts[0];
		 this.lastName = parts[1];
	  }

	 public Long getId() {
		 return this.id;
	 }
	 
	 public void setId(Long id) {
		 this.id = id;
	 }

	 public String getFirstName() {
		 return this.firstName;
	 }

	 public void setFirstName(String firstName) {
		 this.firstName = firstName;
	 }
	 
	 public String getLastName() {
		 return this.lastName;
	 }

	 public void setLastName(String lastName) {
		 this.lastName = lastName;
	 }
	 
	 public String getTelephoneNumber() {
		 return this.telephoneNumber;
	 }

	 public void setTelephoneNumber(String telephoneNumber) {
		 this.telephoneNumber = telephoneNumber;
	 }
	 
	 public String getEmail() {
		 return this.email;
	 }

	 public void setEmail(String email) {
		 this.email = email;
	 }
	 
	 public String getUsername() {
		 return this.Username;
	 }

	 public void setUsername(String Username) {
		 this.Username = Username;
	 }
	 
	 public String getPassword() {
		 return this.password;
	 }

	 public void setPassword(String password) {
		 this.password = password;
	 }
	 
	 @Override
	 public boolean equals(Object o) {
		 if (this == o)
			 return true;
	     if (!(o instanceof Buyer))
	         return false;
	     Buyer buyer = (Buyer) o;
	     return Objects.equals(this.id, buyer.id) && Objects.equals(this.firstName, buyer.firstName)
	        && Objects.equals(this.lastName, buyer.lastName) && Objects.equals(this.telephoneNumber, buyer.telephoneNumber)
	        && Objects.equals(this.email, buyer.email) && Objects.equals(this.Username, buyer.Username) 
	        && Objects.equals(this.password, buyer.password); 
	 }

	 @Override
	 public int hashCode() {
		 return Objects.hash(this.id, this.firstName, this.lastName, this.telephoneNumber, this.email, this.Username,
				 this.password);
	 }

	 @Override
	 public String toString() {
		 return "Buyer{" + "id=" + this.id + ", firstName=" + this.firstName + '\'' + ", lastName='" + this.lastName + 
				 "telephoneNumber =" + this.telephoneNumber  + '\'' + ", telephoneNumber='" + this.telephoneNumber  
				 + '\'' + ", email='" + this.email + '\'' + ", Username='" + this.Username + '}';
	 }	
	
}
