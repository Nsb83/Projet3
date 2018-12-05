package fr.autostopfrance.Autostop.utils;

import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.stream.Stream;

@Component
public class UserCommandRunner implements CommandLineRunner {
    private final UserRepository repository;


    @Autowired
    public UserCommandRunner(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        User user1 = repository.findById(1L).get();

        System.out.println(user1.toString());

    }

}
