package it.groupbuy.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import it.groupbuy.backend.security.jwt.AuthEntryPointJwt;
import it.groupbuy.backend.security.jwt.AuthTokenFilter;
import it.groupbuy.backend.security.services.UserDetailsServiceImpl;

@Configuration
@EnableMethodSecurity
// (securedEnabled = true,
// jsr250Enabled = true,
// prePostEnabled = true) // by default
public class WebSecurityConfig { // extends WebSecurityConfigurerAdapter {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
	return new AuthTokenFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
	DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

	authProvider.setUserDetailsService(userDetailsService);
	authProvider.setPasswordEncoder(passwordEncoder());

	return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
	return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
	return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	http.csrf(csrf -> csrf.disable())
	    .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
	    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	    .authorizeHttpRequests(auth ->
				   auth.requestMatchers("/api/auth/**").permitAll()
				   .requestMatchers("/").permitAll()
				   .requestMatchers("/favicon.ico").permitAll()
				   .requestMatchers("/index.html").permitAll()
				   .requestMatchers("/js/index.js").permitAll()
				   .requestMatchers("/webjars/**").permitAll()
				   .requestMatchers("/websocket-chat/**").permitAll()
				   .requestMatchers("/chat/**").permitAll()
				   .requestMatchers(HttpMethod.GET, "/api/user/*/picture").permitAll()
				   .requestMatchers(HttpMethod.GET, "/groupbuy/*/picture").permitAll()
				   .requestMatchers("/error/**").permitAll()
				   .anyRequest().authenticated()
				   //.anyRequest().permitAll() //debug
				   );

	http.authenticationProvider(authenticationProvider());

	http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

	return http.build();
    }
}
