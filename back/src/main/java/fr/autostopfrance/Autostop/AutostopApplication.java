package fr.autostopfrance.Autostop;

import fr.autostopfrance.Autostop.models.AlgoObject;
import fr.autostopfrance.Autostop.services.MatchService;
import fr.autostopfrance.Autostop.utils.FileStorageProperties;
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
//		SpringApplication.run(AutostopApplication.class, args);
		
		LatLng pedestrianLocation = new LatLng(45.7462409,4.8268639);
		
		LatLng driverNearestStep = new LatLng(45.7462409,4.9);
		
		int searchRadius = 18627;
		
		AlgoObject[] algoTable = {new AlgoObject(pedestrianLocation, 1),
								  new AlgoObject(pedestrianLocation, 0.5),
								  new AlgoObject(pedestrianLocation, 4),
								  new AlgoObject(pedestrianLocation, 0.0001),
								  new AlgoObject(pedestrianLocation, 0.0003259)
								  };
		
		MatchService test = new MatchService();
		
		long distance = test.calculateDistance(pedestrianLocation, driverNearestStep);
		
		boolean areUsersMatchable = test.areUsersMatchable(searchRadius, distance);
		
		System.out.println("Résultat algo:" + String.valueOf(areUsersMatchable));
		
		
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
