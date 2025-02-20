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

## Globally use

- install the package globally

```bash
$ npm i -g database-to-types
```

- run the following command

- replace the names of the database, user, password, host and port with the ones of your database

```bash
$ npx sync-db -s mysql://username:password@host:port/database
```

### For example

```bash
$ npx sync-db -s mysql://user123:password123@localhost:3306/database123
```

### options args

| option | description                | default           |
| ------ | -------------------------- | ----------------- |
| -s     | database config            | none              |
| -f     | path to the interface file | ./interfaces.d.ts |
| -p     | prefix of the interface    | none              |


If it helps you, you can give me a star on [GitHub](https://github.com/EdwinGeul01/mysql-to-types) 😀