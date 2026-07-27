FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY Backend/gradlew Backend/settings.gradle Backend/build.gradle ./Backend/
COPY Backend/gradle ./Backend/gradle

WORKDIR /app/Backend
RUN chmod +x ./gradlew

COPY Backend/src ./src
RUN ./gradlew --no-daemon bootJar

FROM eclipse-temurin:21-jre

RUN apt-get update \
	&& apt-get install -y --no-install-recommends python3 python3-pip python3-venv \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/Backend/build/libs/*.jar /app/Backend/app.jar
COPY Backend/src/main/python /app/Backend/src/main/python
COPY Backend/requirements.txt /app/Backend/requirements.txt
COPY data /app/data
COPY models /app/models

RUN python3 -m venv /app/Backend/.venv \
	&& /app/Backend/.venv/bin/pip install --no-cache-dir -r /app/Backend/requirements.txt

ENV PREDICT_PYTHON=/app/Backend/.venv/bin/python

WORKDIR /app/Backend
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
