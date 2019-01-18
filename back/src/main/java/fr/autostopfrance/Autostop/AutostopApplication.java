package fr.autostopfrance.Autostop;

import fr.autostopfrance.Autostop.models.AlgoObject;
import fr.autostopfrance.Autostop.services.MatchService;
import fr.autostopfrance.Autostop.utils.FileStorageProperties;

import java.util.ArrayList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.google.maps.model.LatLng;

@SpringBootApplication
@EnableConfigurationProperties({FileStorageProperties.class})
public class AutostopApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutostopApplication.class, args);
		
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SpringApplicationContext springApplicationContext() {
		return new SpringApplicationContext();
	}
}
