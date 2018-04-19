package backend.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "backend.spring")
public class SpringBackendMain {

    public static void main(String[] args) {
        SpringApplication.run(SpringBackendMain.class, args);
    }

}
