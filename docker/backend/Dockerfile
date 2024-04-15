FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
COPY ../../src/backend/ app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
