package it.groupbuy.backend.payload;

public class WebSocketMessage {
    private String toWhom;
    private String fromWho;
    private String message;

    public WebSocketMessage() {}

    public WebSocketMessage(final String toWhom, final String fromWho, final String message) {
	this.toWhom = toWhom;
	this.fromWho = fromWho;
	this.message = message;
    }

    public String getToWhom() {
	return toWhom;
    }

    public void setToWhom(String toWhom) {
	this.toWhom = toWhom;
    }

    public String getFromWho() {
	return fromWho;
    }

    public void setFromWho(String fromWho) {
	this.fromWho = fromWho;
    }

    public String getMessage() {
	return message;
    }

    public void setMessage(String message) {
	this.message = message;
    }

}
