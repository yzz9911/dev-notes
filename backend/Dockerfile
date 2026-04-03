# Backend Dockerfile
FROM maven:3.8-openjdk-11 AS builder

WORKDIR /app

# Copy pom.xml
COPY backend/pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY backend/src ./src

# Build the application
RUN mvn clean package -DskipTests

# Production stage
FROM amazoncorretto:11-alpine

WORKDIR /app

# Copy jar from builder
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
