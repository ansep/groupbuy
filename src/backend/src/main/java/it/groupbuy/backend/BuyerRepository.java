package it.groupbuy.backend;

import org.springframework.data.jpa.repository.JpaRepository;

interface BuyerRepository extends JpaRepository<Buyer, Long> { // instantiated by the framework at runtime (autowiring)

}
