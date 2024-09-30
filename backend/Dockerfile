FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /workspace/app

RUN apk add --no-cache dos2unix
COPY mvnw .
RUN dos2unix mvnw && chmod +x mvnw
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw dependency:analyze
RUN ./mvnw dependency:go-offline
COPY src src

RUN ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
RUN apk add --no-cache tomcat-native
ENTRYPOINT ["java","-cp","app:app/lib/*","it.groupbuy.backend.SpringBootSecurityJwtApplication"]
