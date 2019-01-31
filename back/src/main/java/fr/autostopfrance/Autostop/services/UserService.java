package fr.autostopfrance.Autostop.services;

import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import fr.autostopfrance.Autostop.models.MatchingUserDetails;
import fr.autostopfrance.Autostop.models.UploadPicture;
import fr.autostopfrance.Autostop.utils.Utils;
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

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    Utils utils;

    public List<User> findAllDrivers() {
        return userDAO.findByVehiculed(true);
    }

    /**
     * Create a new User and store it in database
     *
     * @param user (sent by front)
     * @return new User
     */

    public User postUser(User user) {

        if(userDAO.findByEmail(user.getEmail()) != null) throw new RuntimeException("This Email already exist");

        String publicUserId = utils.generateUserId(20);

        User _user = new User(
                user.getPublicId(),
                user.getLastName(),
                user.getFirstName(),
                user.getPhone(),
                user.getSex(),
                user.getDateOfBirth(),
                user.getEmail(),
                bCryptPasswordEncoder.encode(user.getPassword()),
                user.getUploadPicture(),
                user.getDriver(),
                user.getPedestrian(),
                user.getTrip()
                );

        _user.setPublicId(publicUserId);
        userDAO.save(_user);
        return _user;
    }

    /**
     * Delete User from database. Used for development purpose but wasn't implemented in front due to lack of time
     *
     * @param publicId
     *
     */

    public ResponseEntity<String> deleteUser(String publicId) {
        User user = userDAO.findByPublicId(publicId);
        userDAO.delete(user);
        return new ResponseEntity<>("User has been deleted!", HttpStatus.OK);
    }

    /**
     * Find a user in database using his public Id
     *
     * @param publicId
     * @return User
     */

    public User findById(String publicId) {
        User user = userDAO.findByPublicId(publicId);
        if (user == null)
            throw new UsernameNotFoundException("User with ID: " + publicId + " not found");
        return user;
    }

    /**
     * Update existing User in database
     *
     * @param publicId
     * @param user
     *
     */

    public ResponseEntity<User> updateUser (String publicId, User user) {
        System.out.println("Updating User " + publicId);

        User currentUser = userDAO.findByPublicId(publicId);


        if (currentUser == null) {
            System.out.println("User with id " + publicId + " not found");
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
        currentUser.setLastName(user.getLastName());
        currentUser.setFirstName(user.getFirstName());
        currentUser.setPhone(user.getPhone());
        currentUser.setSex(user.getSex());
        currentUser.setDateOfBirth(user.getDateOfBirth());
        currentUser.setEmail(user.getEmail());
        currentUser.setVehiculed(user.isVehiculed());
        userDAO.save(currentUser);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    /**
     * Update User profile picture ; update was chosen as the picture shall not be mandatory for register
     *
     * @param publicId
     * @param uploadPicture
     *
     */

    public ResponseEntity<User> updatePicture (String publicId, UploadPicture uploadPicture) {
        User currentUser = userDAO.findByPublicId(publicId);

        currentUser.getUploadPicture().setFileName(uploadPicture.getFileName());
        currentUser.getUploadPicture().setFileDownloadUri(uploadPicture.getFileDownloadUri());
        currentUser.getUploadPicture().setFileType(uploadPicture.getFileType());
        currentUser.getUploadPicture().setSize(uploadPicture.getSize());

        userDAO.save(currentUser);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    /**
     * Find a user in database using his email address
     *
     * @see fr.autostopfrance.Autostop.security.AuthenticationFilter
     * @param email
     *
     */

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



	public MatchingUserDetails getMatchingUserDetails(String publicId) {
		User user = userDAO.findByPublicId(publicId);
		MatchingUserDetails matchingUserDetails = new MatchingUserDetails(	user.getPublicId(),
																			user.getLastName(),
																			user.getFirstName(),
																			user.getPhone(),
																			user.getSex(),
																			user.getDateOfBirth(),
																			user.isVehiculed(),
																			user.getUploadPicture(),
																			user.getDriver(),
																			user.getPedestrian(),
																			user.getTrip()
																			);
		return matchingUserDetails;
	}


}
