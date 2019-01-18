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
		
		LatLng pedestrianLocation = new LatLng(45.7462409, 4.8268639);
		
//		LatLng driverNearestStep = new LatLng(45.7462409,4.9);
		
		int searchRadius = 300;
		
		AlgoObject[] algoTable = {
								  new AlgoObject(new LatLng(45.8421521, 4.9512112), 1),
								  new AlgoObject(new LatLng(45.54212, 4.75151), 0.5),
								  new AlgoObject(new LatLng(45.457277, 4.58565), 4),
								  new AlgoObject(new LatLng(45.746248, 4.9), 0.0001),
								  new AlgoObject(new LatLng(45.45647, 4.889865), 0.0003259)
								  };
		
		MatchService test = new MatchService();
		
		LatLng driverNearestStep = test.getNearestDriverStep(algoTable, pedestrianLocation);
		
		System.out.println("Driver nearest coordinate : " + driverNearestStep.toString());
		
		long distance = test.calculateDistance(pedestrianLocation, driverNearestStep);
		
		System.out.println("Distance between driver nearest coordinate and pedestrian : " + distance + " mètres");
		
		boolean areUsersMatchable = test.areUsersMatchable(searchRadius, distance);
		
		System.out.println("Résultat algo : " + String.valueOf(areUsersMatchable));
		
		
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
