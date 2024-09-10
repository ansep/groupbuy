package it.groupbuy.backend.payload;

import it.groupbuy.backend.models.Chatroom;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

@Entity
public class WebSocketMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String toWhom;

    @NotBlank
    private String fromWho;

    @NotBlank
    private String message;

    @ManyToOne
    private Chatroom chatroom;

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

	public void setId(Long id) {
		this.id = id;
	}

	public void setChatroom(Chatroom chatroom) {
		this.chatroom = chatroom;
	}

}
