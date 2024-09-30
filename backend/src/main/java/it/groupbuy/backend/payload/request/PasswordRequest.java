package it.groupbuy.backend.payload.request;

public class PasswordRequest {
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;

    public PasswordRequest() {}

    public PasswordRequest(String currentPassword, String newPassword, String confirmPassword) {
	this.confirmPassword = confirmPassword;
	this.newPassword = newPassword;
	this.currentPassword = currentPassword;
    }

    public String getCurrentPassword() {
	return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
	this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
	return newPassword;
    }

    public void setNewPassword(String newPassword) {
	this.newPassword = newPassword;
    }

    public String getConfirmPassword() {
	return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
	this.confirmPassword = confirmPassword;
    }

}
