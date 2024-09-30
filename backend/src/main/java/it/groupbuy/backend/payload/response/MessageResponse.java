package it.groupbuy.backend.payload.response;


public class MessageResponse {
    private String message;
    private Long responseId;

    public MessageResponse(String message, Long responseId) {
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

    public Long getResponseId() {
	return responseId;
    }

    public void setResponseId(Long responseId) {
	this.responseId = responseId;
    }
}
