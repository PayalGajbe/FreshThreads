package com.freshThreads;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	@Bean //equivalent to <bean id ..../> in xml file
	//Use case - for configuring 3rd part Java classes as spring beans !
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();	
		modelMapper.getConfiguration()
		.setMatchingStrategy(MatchingStrategies.STRICT) //only MATCHING prop names n data types between src n dest will be transferred , during the mapping
		.setPropertyCondition(Conditions.isNotNull());// only non null properties will be transferred from src --> dest , during the mapping
	return modelMapper;//rets configured ModelMapper instance to the caller : SC

	}
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}

}
