
package it.groupbuy.backend.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import it.groupbuy.backend.models.GroupBuy;

@Repository
public interface GroupbuyRepository extends JpaRepository<GroupBuy, Long>{
	
	Optional<GroupBuy> findById(Long id);
	
}
