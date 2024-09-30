package it.groupbuy.backend.repository;

import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.groupbuy.backend.models.Chatroom;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, Long> {

    Optional<Chatroom> findById(Long id);

    Optional<Chatroom> findBySenderUsernameAndRecipientUsername(String senderUsername, String recipientUsername);

}
