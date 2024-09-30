package it.groupbuy.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import it.groupbuy.backend.SpringBootSecurityJwtApplication;
import it.groupbuy.backend.security.jwt.JwtUtils;
import it.groupbuy.backend.security.services.UserDetailsServiceImpl;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private static final Logger log = LoggerFactory.getLogger(SpringBootSecurityJwtApplication.class);

    @Autowired
    UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    JwtUtils jwtUtils;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
	//config.setApplicationDestinationPrefixes("/app");
	//	config.enableSimpleBroker("/user", "/topic", "/queue");
	config.setApplicationDestinationPrefixes("/app")
	    .enableStompBrokerRelay("/topic", "/queue", "/exchange", "/amq/queue")
	    .setAutoStartup(Boolean.TRUE)
	    .setClientLogin("guest")
	    .setClientPasscode("guest")
	    .setSystemLogin("guest")
	    .setSystemPasscode("guest")
	    .setUserDestinationBroadcast("/topic/unresolved.user.dest")
	    .setUserRegistryBroadcast("/topic/registry.broadcast")
	    .setRelayHost("rabbitmq")
	    .setRelayPort(61613);

	config.setUserDestinationPrefix("/user");

    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
	// È veramente necessario "setAllowedOrigins.withSockJS? Vbb"
	// Risposta: si, ma solo perché così si interfaccia con javascript con
	// meno boilerplate
	registry.addEndpoint("/websocket-chat").setAllowedOriginPatterns("*").withSockJS();
	registry.addEndpoint("/websocket-chat").setAllowedOriginPatterns("*");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
	registration.interceptors(new ChannelInterceptor() {
		@Override
		public Message<?> preSend(Message<?> message, MessageChannel channel) {
		    StompHeaderAccessor accessor =
			MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
		    log.info("MessageHeaderAccessor: {}", accessor);

		    assert accessor != null;
		    if (StompCommand.CONNECT.equals(accessor.getCommand())) {

			String authorizationHeader = accessor.getFirstNativeHeader("Authorization");
			assert authorizationHeader != null;
			String token = authorizationHeader.substring("Bearer ".length());

			String username = jwtUtils.getUserNameFromJwtToken(token);
			UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);
			UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

			accessor.setUser(usernamePasswordAuthenticationToken);
		    }

		    return message;
		}

	    });
    }

}
