# Choco Tech

This project was generated using [Nx](https://nx.dev).

This project base on Doji requirement that we have learned in SE II.

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Table of Contents

- [Preparing for development](#preparing-for-development)
- [Testing before deploy](#testing-before-deploy)
- [Deployment](#deployment)

## Preparing for development

1.  First, you need to clone the project using [git](https://git-scm.com/downloads). Following the command.

    ```bash
    git clone https://github.com/2110336-SoftwareEngineering2-2021-2/sec2_ChocoTech.git
    ```

2.  Then, you have to install all dependencies.

    ```bash
    yarn install
    # or  (same result)
    yarn
    ```

    If you don't have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable). Please install [here](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

3.  This project requires Node.js version 16. To check your node version. Try

    ```bash
    node -v
    ```

4.  Try to start your dev server! In this Nx workspace we have 2 main apps; [Next.js](https://nextjs.org/) for Frontend and [Nest.js](https://nestjs.com/) for Backend. In addition, we have [Storybook](https://storybook.js.org/) for UI docs

    But first of all, you have to run Postgres and Redis before development. Following the commands.

    ```bash
     # create external network, called private
     docker create network private
    ```

    ```bash
    # run Postgres and Redis
    docker-compose up -d
    # or (same result)
    docker compose up -d
    ```

    Follow the command to start dev server for all apps. The Frontend app will run on http://localhost:3000 and the Backend app will run on http://localhost:3333

    ```bash
    yarn dev
    ```

    Follow the command to start dev server for only Frontend apps. The Frontend app will run on http://localhost:3000

    ```bash
    yarn dev:frontend
    ```

    Follow the command to start dev server for only Backend apps. The Backend app will run on http://localhost:3333

    ```bash
    yarn dev:backend
    ```

    Follow the command to start Storybook. The Backend app will run on http://localhost:4400

    ```bash
    yarn mui:storybook
    ```

## Testing before deploy

The project will deploy using `Dockerfile`.

If you try to test developed production app in your local machine. Try to build Docker image by follwing the command

```bash
docker build -t choco-app .
```

This command means Docker will search for `Dockerfile` and use it as building step. Then, Docker will create an image named `choco-app`. It'll take 5-10 mins on your first build.

Then, try to start Docker container using the image by follwing the command.

```bash
docker run -p 8080:80 -it --env-file .env.compose  --network private --name choco-app choco-app
```

This command means Docker will run `choco-app` image and named the container as `choco-app`. It'll take `.env.compose` as environment variables for Backend and it'll run on port 8080 (e.g. http://localhost:8080). The network argument `private` is required for accesing `Postgres` and `Redis` (External network that you have created before).

To make sure the container is running. Try

```bash
docker ps
```

To kill the container. Try

```bash
docker container kill choco-app
```

The Frontend app, Backend app, Storyobook and Swagger will be combined into 1 image. The path rule will be defined in [nginx.conf](./nginx/nginx.conf)

## Deployment

This project is deployed using [Railway](https://railway.app/), cloud service. To deploy the app.
You just have to push commits to

- `main` branch for production.
- `dev` branch for development.

Each deployment take about 5-10 mins.

**Production**

- Frontend: https://choco.saenyakorn.dev
- Backend: https://choco.saenyakorn.dev/_api
- Storybook: https://choco.saenyakorn.dev/storybook
- Swagger: https://choco.saenyakorn.dev/swagger

**Development**

- Frontend: https://dev.choco.saenyakorn.dev
- Backend: https://dev.choco.saenyakorn.dev/_api
- Storybook: https://dev.choco.saenyakorn.dev/storybook
- Swagger: https://dev.choco.saenyakorn.dev/swagger
