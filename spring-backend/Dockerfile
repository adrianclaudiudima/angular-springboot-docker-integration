FROM java:9-jre
MAINTAINER Adrian Dima<adrianclaudiudima@gmail.com>

# --add-opens=java.base/java.lang=ALL-UNNAMED required for reflective calls done by hibernate - this would normally by done in a module-info.java but spring is not yet ready :D -
ENTRYPOINT ["java", "-jar", "--add-modules=java.xml.bind","--add-opens=java.base/java.lang=ALL-UNNAMED" ,"rest.jar"]

ADD target/lib /lib
ARG JAR_FILE
ADD target/${JAR_FILE} /rest.jar