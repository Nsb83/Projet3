package fr.autostopfrance.Autostop.utils;

import fr.autostopfrance.Autostop.controllers.UserController;
import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import fr.autostopfrance.Autostop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;

@Component
public class UserCommandRunner implements CommandLineRunner {
    private final UserDAO repository;
    @Autowired
    public UserController userController;

    private Logger log = LoggerFactory.getLogger("Wilder");

    @Autowired
    public UserCommandRunner(UserDAO repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
//        log.info("Preloading " + repository.save(new User("Nicolas",
//                "Barbier",
//                "0688296348",
//                "http://URLdeMaPhoto.fr",
//                "Homme",
//                LocalDate.of(1983, 05, 19)
//                )));
//        User user1 = new User (
//                "Bourrat",
//                "JN",
//                "0987654321",
//                "hhtpp://HHHHG.fr",
//                "homme",
//                LocalDate.of(1990, 10, 19),
//                "jnb@mail.fr",
//                "ttt");

//        userController.postUser(user1);

//        userController.deleteUser(18);

//        for (User myUser : userController.findUsers()) {
//            log.info(myUser.toString());
//        }

    }
}
