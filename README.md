# StoreFront backend

Welcome to StoreFront backend repo please follow the below instruction to make the project up and running 
W



#### Project setup

- clone the project

```bash
  https://github.com/HeshamSayed/StoreFrontApi.git
```


# Env Variables
add a .env file in the root directory and set the missing ### environment parameters

POSTGRES_HOST=127.0.0.1 or localhost
POSTGRES_PORT=5432
POSTGRES_PORT_TEST=5432
POSTGRES_DB=store
POSTGRES_USER=hesham
POSTGRES_PASSWORD=password
BCRYPT_PASSWORD=here is BCRYPT password
SALT_ROUNDS=10
TOKEN_SECRET=here is the secret token


```bash
  npm install to install the dependencies
```

```bash
  npm run db-up to set up the database and get access via http://127.0.0.1:5432
```


```bash
  npm run build to build the app
```


# Start the app

```bash
  npm run start to start the app and get access via http://127.0.0.1:3000
```



# Test the app

check database.json and you will find "test" database for testing the app


   {
        "dev": {
        "driver": "pg",
        "host": "localhost",
        "port": 5432,
        "database": "store",
        "user": "hesham",
        "password": "password"
        },
        "test": {
        "driver": "pg",
        "host": "localhost",
        "port": 5432,
        "database": "store_test",
        "user": "hesham",
        "password": "password"
        }
    }


## Running Tests

To run all tests, run the following command

```bash
  npm run test
```

## Developer

Hesham Sayed