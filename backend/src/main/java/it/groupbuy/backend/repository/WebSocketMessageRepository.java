package it.groupbuy.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.groupbuy.backend.payload.WebSocketMessage;

@Repository
public interface WebSocketMessageRepository extends JpaRepository<WebSocketMessage, Long> {

    Optional<WebSocketMessage> findById(Long id);

    @Query(value = "SELECT m FROM WebSocketMessage m WHERE m.fromWho = :username OR m.toWhom = :username")
    List<WebSocketMessage> findAllMessagesByUsername(@Param("username") String username, Sort sort);

}
