# Mysql to Typescript interfaces

![alt](https://raw.githubusercontent.com/EdwinGeul01/mysql-to-types/refs/heads/main/banner.png)

Lib to help conver a mysql schema to typescript interfaces

## Installation

```bash
$ npm i database-to-types
```

## how to use it

- create a file called `conection-sql-ts.json` in the root of the project with the following content

```json
{
  "host": "localhost", # host of the database
  "user": "user", # user of the database
  "password": "1234", #   password of the database
  "database": "db", # database name
  "port": 3306, # port of the database
  "options": {
    "prefix": "DB_", # prefix of the interface , if your table name is "users" the interface will be named DB_users
    "path": "./DB_new.d.ts" # path of the interface file that will be created
  }
}
```

- add the following script to your package.json

```json
"scripts": {
  "sync-db": "sync-db"
}
```

- run the script

```bash
$ npm run sync-db
```
