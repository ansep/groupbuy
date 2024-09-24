package it.groupbuy.backend.payload.response;


public class MessageResponse {
    private String message;
    private String responseId;

    public MessageResponse(String message, String responseId) {
	this.message = message;
	this.responseId = responseId;
    }

    public MessageResponse(String message) {
	this.message = message;
    }

    public String getMessage() {
	return message;
    }

    public void setMessage(String message) {
	this.message = message;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }
}
