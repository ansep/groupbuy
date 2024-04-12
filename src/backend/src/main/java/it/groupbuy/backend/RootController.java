package it.groupbuy.backend;

import org.springframework.hateoas.RepresentationModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping
    RepresentationModel<?> index() {
	RepresentationModel<?> rootModel = new RepresentationModel<>();
	rootModel.add(linkTo(methodOn(BuyerController.class).all()).withRel("buyers"));
	return rootModel;
    }

}
