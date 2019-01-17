
package fr.autostopfrance.Autostop.controllers;

import fr.autostopfrance.Autostop.models.UploadPicture;
import fr.autostopfrance.Autostop.services.DriverService;
import fr.autostopfrance.Autostop.services.StorageService;

import fr.autostopfrance.Autostop.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


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
    public UploadPicture uploadUserPicture(@PathVariable("idUser") String publicId, @RequestParam("file") MultipartFile file) {
        String fileName = storageService.storeFile(publicId, file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        UploadPicture uploadPicture = new UploadPicture(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());

        userService.updatePicture(publicId, uploadPicture);

        return uploadPicture;
    }

    @PostMapping("/uploadFile/drivers/{idUser}")
    public UploadPicture uploadCarPicture(@PathVariable("idUser") String publicId, @RequestParam("file") MultipartFile file) {
        String fileName = storageService.storeFile(publicId, file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        UploadPicture uploadPicture = new UploadPicture(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());

        driverService.postCarPicture(publicId, uploadPicture);

        return uploadPicture;
    }

//    @PostMapping("/uploadMultipleFiles")
//    public List<UploadPicture> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
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
