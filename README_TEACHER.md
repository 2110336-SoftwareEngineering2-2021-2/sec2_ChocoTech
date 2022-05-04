# Choco Tech

Instruction for teachers before runnnig `docker-compose.teacher.yaml`

## Setup

1. Prepare `.env.teacher`

2. You may notice that there are some field in `.env.teacher` empty. To fill them, you may need to ask [@saenyakorn](http://github.com/saenyakorn) for the secrets. But, at least, you can build the docker with these default `.env.teacher`

3. Run this command to start the application with Docker

   ```
   docker compose -f docker-compose.teacher.yaml up -d
   ```

4. You need to migrate the schema to the database

   ```
   yarn migrate-db
   ```

5. The application will running at [http://localhost:8000](http://localhost:8000)

6. You may see the application log by using the command

   ```
   docker logs -f apps
   ```

## Shutdown the application

1. Run this command

   ```
   docker compose -f docker-compose.teacher.yaml down
   ```
