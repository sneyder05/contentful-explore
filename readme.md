# Contentful Explorer

## Setup & Run project

### Running locally

#### Setup env vars
Create file `.env` at the root folder and the set the following env vars

| Env var | Description | Values |
| - | - | - |
| PORT | Port to lift up app | 3000 |
| CONTENTFUL_SPACE_ID | Contenful space id ||
| CONTENTFUL_ACCESS_TOKEN | Contenful access token ||
| CONTENTFUL_ENVIRONMENT | Contenful env |master|
| CONTENTFUL_CONTENT_TYPE | Contenful space id |product|
| DATABASE_PORT | Postgres DB port | 5432 |
| DATABASE_USER | Postgres DB user | |
| DATABASE_PASSWORD | Postgres DB password | |
| DATABASE_NAME | Postgres DB name | |
| JWT_SECRET | JWT key for tokens | |

#### Run project
To run the project execute command below:
```bash
yarn start
```
Then access to the swagger docs at `http://127.0.0.1:{PORT}/api/docs`

### Running with docker

##### Setup env vars
Create file `.docker.env` at the root folder and the set the following env vars

| Env var | Description | Values |
| - | - | - |
| CONTENTFUL_SPACE_ID | Contenful space id ||
| CONTENTFUL_ACCESS_TOKEN | Contenful access token ||
| CONTENTFUL_ENVIRONMENT | Contenful env |master|
| CONTENTFUL_CONTENT_TYPE | Contenful space id |product|
| JWT_SECRET | JWT key for tokens | |

#### Run project
Build and start the project running the commands below
```bash
docker-compose build
docker-compose up
```

Then access to the swagger docs at http://127.0.0.1:3000/api/dosc

## Generate and use JWT secret

### Generate secret
1. Go to https://jwtsecret.com/generate
   - Generate a **256**-length secret
   - Copy secret in the clipboard

### Use secret
1. Set the env var `JWT_SECRET` with the copied secret
2. Go to https://jwt.io
   - In the right side paste the secret in the section `Verify signature > 'your-256-bit-secret'`
   - No extra info is needed for sections `Header` or `Payload`
   - Copy the encoded token from the left side
2. When calling an endpoint use the token as `Authorization` header

## Force to pull products

There's no an endpoint to pull contentful products manually since the process is triggerd every hour automatically. To force the data follow steps below

1. In the IDE, find `@Cron(CronExpression.EVERY_HOUR)`. A single match will be shown
2. Go to the file and modify the cron expresion replacing `EVERY_HOUR` by `EVERY_10_MINUTES`. The whole line should look like `@Cron(CronExpression.EVERY_10_MINUTES)`
3. Start the app and then wait for 10 minutes to have fresh products
4. A logger with message `[SyncProductsService] Syncing products...` indicates the process started
5. A logger with message `[SyncProductsService] Products saved` indicates the process finished