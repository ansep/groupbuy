package it.groupbuy.backend.models;

import java.util.ArrayList;
import java.util.List;

import it.groupbuy.backend.payload.WebSocketMessage;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String senderUsername;

    @NotBlank
    private String recipientUsername;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WebSocketMessage> messages;

    public Chatroom() {}

    public Chatroom(String senderUsername, String recipientUsername) {
	this.senderUsername = senderUsername;
	this.recipientUsername = recipientUsername;
	this.messages = new ArrayList<WebSocketMessage>();
    }

    public Long getId() {
	return id;
    }

    public void setId(Long id) {
	this.id = id;
    }

    public String getSenderUsername() {
	return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
	this.senderUsername = senderUsername;
    }

    public String getRecipientUsername() {
	return recipientUsername;
    }

    public void setRecipientUsername(String recipientUsername) {
	this.recipientUsername = recipientUsername;
    }

    public List<WebSocketMessage> getMessages() {
	return messages;
    }

    public void setMessages(List<WebSocketMessage> messages) {
	this.messages = messages;
    }

}
