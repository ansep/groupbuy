package it.groupbuy.backend.controllers;

import java.util.Set;
import java.util.HashSet;
import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import it.groupbuy.backend.models.Chatroom;
import it.groupbuy.backend.payload.WebSocketMessage;
import it.groupbuy.backend.repository.ChatroomRepository;

@Controller
public class WebSocketController {
    private final SimpMessagingTemplate simpMessagingTemplate;   //1
    private final Set<String> connectedUsers;     //2
    private final ChatroomRepository chatroomRepository;

    public WebSocketController(SimpMessagingTemplate simpMessagingTemplate, ChatroomRepository chatroomRepository){
	this.simpMessagingTemplate = simpMessagingTemplate; //1
	this.connectedUsers = new HashSet<>();  //2
	this.chatroomRepository = chatroomRepository;
    }

    @MessageMapping("/register")  //3
    @SendToUser("/queue/newMember")
    public Set<String> registerUser(String webChatUsername){
	if(!connectedUsers.contains(webChatUsername)) {
	    connectedUsers.add(webChatUsername);
	    simpMessagingTemplate.convertAndSend("/topic/newMember", webChatUsername); //4
	    return connectedUsers;
	} else {
	    return new HashSet<>();
	}
    }

    @MessageMapping("/unregister")  //5
    @SendTo("/topic/disconnectedUser")
    public String unregisterUser(String webChatUsername){
	connectedUsers.remove(webChatUsername);
	return webChatUsername;
    }

    @MessageMapping("/message")
    public void greeting(WebSocketMessage message){
	simpMessagingTemplate.convertAndSend("/queue/" + message.getToWhom(), message);
	Chatroom chatroom = chatroomRepository.findBySenderUsernameAndRecipientUsername(message.getFromWho(), message.getToWhom())
	    .orElse(new Chatroom(message.getFromWho(), message.getToWhom()));
	chatroom.getMessage_list().add(message);
	chatroomRepository.save(chatroom);
    }

    @GetMapping("/chat/{recipient}/{sender}")
    public List<WebSocketMessage> getHistory(@PathVariable String recipient, @PathVariable String sender) {
	return chatroomRepository.findBySenderUsernameAndRecipientUsername(sender, recipient)
	    .orElse(new Chatroom(sender, recipient)).getMessage_list();

    }
}
