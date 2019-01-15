
package fr.autostopfrance.Autostop.controllers;

import fr.autostopfrance.Autostop.models.User;
import fr.autostopfrance.Autostop.repositories.UserDAO;
import fr.autostopfrance.Autostop.services.DriverService;
import fr.autostopfrance.Autostop.services.StorageService;

import fr.autostopfrance.Autostop.services.UserService;
import fr.autostopfrance.Autostop.utils.UploadFileResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(origins = {"http://localhost:8000"})
public class ImageController {

    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private DriverService driverService;

    @Autowired
    private StorageService storageService;

    @PostMapping("/uploadFile/{idUser}")
    public UploadFileResponse uploadUserPicture(@PathVariable("idUser") long idUser, @RequestParam("file") MultipartFile file) {
        String fileName = storageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        UploadFileResponse uploadFileResponse = new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());

        userService.updatePicture(idUser, uploadFileResponse);

        return uploadFileResponse;
    }
//
//    @PostMapping("/uploadFile/drivers/{idUser}")
//    public UploadFileResponse uploadCarPicture(@PathVariable("idUser") long idUser, @RequestParam("file") MultipartFile file) {
//        String fileName = storageService.storeFile(file);
//
//        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
//                .path("/downloadFile/")
//                .path(fileName)
//                .toUriString();
//
//        UploadFileResponse uploadFileResponse = new UploadFileResponse(fileName, fileDownloadUri,
//                file.getContentType(), file.getSize());
//
//        driverService.postCarPicture(idUser, uploadFileResponse);
//
//        return uploadFileResponse;
//    }

//    @PostMapping("/uploadMultipleFiles")
//    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
//        return Arrays.asList(files)
//                .stream()
//                .map(file -> uploadFile(file))
//                .collect(Collectors.toList());
//    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = storageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
