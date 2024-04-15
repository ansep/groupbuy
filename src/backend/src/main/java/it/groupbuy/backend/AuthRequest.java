package it.groupbuy.backend;

import java.util.Objects;

public class AuthRequest {

    private String username;
    private String password;

    public AuthRequest() {}

    public AuthRequest(String username,
		       String password) {
	this.username = username;
	this.password = password;

    }

    public String getUsername() {
	return username;
    }

    public void setUsername(String username) {
	this.username = username;
    }

    public String getPassword() {
	return password;
    }

    public void setPassword(String password) {
	this.password = password;
    }


    @Override
    public String toString() {
	return String.format("AuthRequest[username=%d]", this.username);
    }

    @Override
    public int hashCode() {
	return Objects.hash(this.username);
    }


    @Override
    public boolean equals(Object o) {
	if(this == o)
	    return true;
	if(!(o instanceof AuthRequest))
	    return false;
	AuthRequest authRequest = (AuthRequest) o;
	return Objects.equals(this.username, authRequest.username);
    }
}
