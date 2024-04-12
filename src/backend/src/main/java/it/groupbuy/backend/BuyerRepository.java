package it.groupbuy.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface BuyerRepository extends JpaRepository<Buyer, Long> { // instantiated by the framework at runtime (autowiring)

	@Query("select b from Buyer b where b.username = ?1")
	 Buyer findByUsername(String username);
	
	@Query("select b from Buyer b where b.email = ?1")
	 Buyer findByEmail(String emailAddress);
	
	@Query("select b from Buyer b where b.email = ?1")
	 Buyer findByIdFromEmail(String emailAddress);
	
	@Query("select b from Buyer b where b.username = ?1")
	 Buyer findByIdFromUsername(String username);
	
}
