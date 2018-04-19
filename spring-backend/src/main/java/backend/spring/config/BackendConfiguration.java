package backend.spring.config;

import backend.spring.user.dto.UserDto;
import backend.spring.user.model.User;
import backend.spring.user.repository.UsersRepository;
import lombok.extern.slf4j.Slf4j;
import org.dozer.DozerBeanMapperBuilder;
import org.dozer.Mapper;
import org.dozer.loader.api.BeanMappingBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.config.WebFluxConfigurerComposite;

import static org.dozer.loader.api.FieldsMappingOptions.copyByReference;
import static org.dozer.loader.api.FieldsMappingOptions.hintA;

@Configuration
@Slf4j
public class BackendConfiguration {

    @Value("${angular.ui.base.url}")
    private String uiLocalHostUrl;

    @Bean
    public CommandLineRunner getBean(UsersRepository usersRepository) {
        return args -> {
            usersRepository.save(User.builder()
                    .email("firstdata@email.com")
                    .username("First user")
                    .build());
            usersRepository.findAll().forEach(System.out::println);
        };
    }


    @Bean
    public Mapper getDozerMapperBean() {
        BeanMappingBuilder builder = new BeanMappingBuilder() {
            protected void configure() {
                mapping(UserDto.class, User.class)
                        .fields("username", "username",
                                copyByReference(),
                                hintA(String.class)
                        );
            }
        };

        return DozerBeanMapperBuilder.create()
                .withMappingBuilder(builder)
                .build();
    }

    @Bean
    @Profile("default")
    public WebFluxConfigurer corsConfigurer() {
        log.warn("Applying CORS exception - this should not be seen in Docker");
        return new WebFluxConfigurerComposite() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(uiLocalHostUrl).allowedMethods("*");
            }
        };

    }

}



