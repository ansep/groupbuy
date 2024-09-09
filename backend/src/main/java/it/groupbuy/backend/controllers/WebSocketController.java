package it.groupbuy.backend.controllers;

import java.util.Set;
import java.util.HashSet;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import it.groupbuy.backend.payload.WebSocketMessage;

@Controller
public class WebSocketController {
    private final SimpMessagingTemplate simpMessagingTemplate;   //1
    private final Set<String> connectedUsers;     //2

    public WebSocketController(SimpMessagingTemplate simpMessagingTemplate){
	this.simpMessagingTemplate = simpMessagingTemplate; //1
	connectedUsers = new HashSet<>();  //2
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
	simpMessagingTemplate.convertAndSendToUser(message.getToWhom(), "/queue/private", message);
    }

    // @MessageMapping("/message")
    // @SendToUser("/queue/private")
    // public String greeting(WebSocketMessage message){
    // 	return message.getMessage();
    // }

    @MessageMapping("/groupbuy/{id}")
    @SendTo("/topic/groupbuy/{id}")
    public void broadcast(WebSocketMessage message, @PathVariable Long id) {
 	simpMessagingTemplate.convertAndSend(message);
    }
}
