package it.groupbuy.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface UserRepository extends JpaRepository<User, Long> { // instantiated by the framework at runtime (autowiring)

	@Query("select u from User b where u.username = ?1")
	 User findByUsername(String username);
	
	@Query("select u from User u where u.email = ?1")
	 User findByEmail(String emailAddress);
	
}
