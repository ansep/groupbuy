package it.groupbuy.backend.controllers;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import it.groupbuy.backend.models.Chatroom;
import it.groupbuy.backend.payload.WebSocketMessage;
import it.groupbuy.backend.repository.ChatroomRepository;
import it.groupbuy.backend.repository.WebSocketMessageRepository;

@Controller
public class WebSocketController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatroomRepository chatroomRepository;
    private final WebSocketMessageRepository webSocketMessageRepository;

    public WebSocketController(SimpMessagingTemplate simpMessagingTemplate, ChatroomRepository chatroomRepository, WebSocketMessageRepository webSocketMessageRepository){
	this.simpMessagingTemplate = simpMessagingTemplate;
	this.chatroomRepository = chatroomRepository;
	this.webSocketMessageRepository = webSocketMessageRepository;
    }

    @MessageMapping("/message")
    public void greeting(WebSocketMessage message){
	simpMessagingTemplate.convertAndSend("/queue/" + message.getToWhom(), message);
	Chatroom chatroom = chatroomRepository.
	    findBySenderUsernameAndRecipientUsername(message.getFromWho(), message.getToWhom())
	    .orElse(new Chatroom(message.getFromWho(), message.getToWhom()));
	chatroom.getMessages().add(message);
	chatroomRepository.save(chatroom);
    }

    // This really wasn't needed :p complex logic for no reason
    @GetMapping("/chat/{sender}/{recipient}")
    @ResponseBody
    public List<WebSocketMessage> getHistory(@PathVariable String sender, @PathVariable String recipient) {
	List<WebSocketMessage> list =
	    chatroomRepository.findBySenderUsernameAndRecipientUsername(sender, recipient)
	    .orElse(new Chatroom(sender, recipient)).getMessages();
	List<WebSocketMessage> list_tmp =
	    chatroomRepository.findBySenderUsernameAndRecipientUsername(recipient, sender)
	    .orElse(new Chatroom(recipient, sender)).getMessages();
	List<WebSocketMessage> merged = new ArrayList<>(list);
	merged.addAll(list_tmp);
        merged.sort(Comparator.comparing(WebSocketMessage::getCreatedOn));
	return merged;
    }

    @GetMapping("/chat/messages/{username}")
    @ResponseBody
    public List<WebSocketMessage> getAllMessageHistory(@PathVariable String username) {
	List<WebSocketMessage> list = webSocketMessageRepository.findAllMessagesByUsername(username, Sort.by("createdOn"));
	return list;
    }
}
