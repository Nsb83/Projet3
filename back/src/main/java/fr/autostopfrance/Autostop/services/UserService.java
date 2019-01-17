package fr.autostopfrance.Autostop.services;

import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import fr.autostopfrance.Autostop.models.UploadPicture;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<User> findUsers() {
        return userDAO.findAll();
    }

    public User postUser(User user) {
        User _user = userDAO.save(new User(
                user.getLastName(),
                user.getFirstName(),
                user.getPhone(),
                user.getSex(),
                user.getDateOfBirth(),
                user.getEmail(),
                bCryptPasswordEncoder.encode(user.getPassword()),
                user.isVehiculed(),
                user.getUploadPicture(),
                user.getDriver(),
                user.getPedestrian(),
                user.getTrip()
                ));
        return _user;
    }

    public ResponseEntity<String> deleteUser(long idUser) {
        userDAO.deleteById(idUser);
        return new ResponseEntity<>("User has been deleted!", HttpStatus.OK);
    }

    public Optional<User> findById(long idUser) {
        return userDAO.findById(idUser);
    }


    public ResponseEntity<User> updateUser (long idUser, User user) {
        System.out.println("Updating User " + idUser);

        Optional<User> currentUserOptional = userDAO.findById(idUser);

        if (!currentUserOptional.isPresent()) {
            System.out.println("User with id " + idUser + " not found");
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }

        User currentUser = currentUserOptional.get();

        currentUser.setLastName(user.getLastName());
        currentUser.setFirstName(user.getFirstName());
        currentUser.setPhone(user.getPhone());
        currentUser.setSex(user.getSex());
        currentUser.setDateOfBirth(user.getDateOfBirth());
        currentUser.setEmail(user.getEmail());
        userDAO.save(currentUser);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    public ResponseEntity<User> updatePicture (long idUser, UploadPicture uploadPicture) {
        Optional<User> currentUserOptional = userDAO.findById(idUser);

        User currentUser = currentUserOptional.get();
        currentUser.getUploadPicture().setFileName(uploadPicture.getFileName());
        currentUser.getUploadPicture().setFileDownloadUri(uploadPicture.getFileDownloadUri());
        currentUser.getUploadPicture().setFileType(uploadPicture.getFileType());
        currentUser.getUploadPicture().setSize(uploadPicture.getSize());

        userDAO.save(currentUser);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    public User getUser(String email) {
        User user = userDAO.findByEmail(email);
        if(user == null) throw new UsernameNotFoundException(email);
        User returnValue = new User();
        BeanUtils.copyProperties(user, returnValue);
        return returnValue;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userDAO.findByEmail(email);
        if(user == null) throw new UsernameNotFoundException(email);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }


}
