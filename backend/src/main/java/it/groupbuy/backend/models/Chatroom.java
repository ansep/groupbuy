package it.groupbuy.backend.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import it.groupbuy.backend.payload.WebSocketMessage;

@Entity
@Table(name = "Chatroom")
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String senderUsername;

    @NotBlank
    private String recipientUsername;

    @OneToMany
    private List<WebSocketMessage> message_list;

    public Chatroom() {}

    public Chatroom(String senderUsername, String recipientUsername) {
	this.senderUsername = senderUsername;
	this.recipientUsername = recipientUsername;
	this.message_list = new ArrayList<>();
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

    public List<WebSocketMessage> getMessage_list() {
	return message_list;
    }

    public void setMessage_list(List<WebSocketMessage> message_list) {
	this.message_list = message_list;
    }
}
