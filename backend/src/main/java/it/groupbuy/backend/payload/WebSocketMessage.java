package it.groupbuy.backend.payload;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class WebSocketMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String fromWho;

    @NotBlank
    private String toWhom;

    @NotBlank
    private String message;

    @CreationTimestamp
    private Instant createdOn;


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

    public Long getId() {
	return id;
    }

    public Instant getCreatedOn() {
	return createdOn;
    }

    public void setCreatedOn(Instant createdOn) {
	this.createdOn = createdOn;
    }


}
