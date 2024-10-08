
package it.groupbuy.backend.repository;


import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.groupbuy.backend.models.GroupBuy;

@Repository
public interface GroupbuyRepository extends JpaRepository<GroupBuy, Long> {

}
