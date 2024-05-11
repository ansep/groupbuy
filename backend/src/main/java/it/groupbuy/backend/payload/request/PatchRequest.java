package it.groupbuy.backend.payload.request;

public class PatchRequest {
    private String email;
    private String firstName;
    private String lastName;
    private String telephoneNumber;

    public String getEmail() {
	return email;
    }

    public void setEmail(String email) {
	this.email = email;
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
}
