# HAMateur

This is an NodeJS4, AdonisJs4, Sqlite3 program for french HAM radio exam test (to be short : a kind of quizz program)

## Setup

First, install NodeJS and npm (node package manager) globally
Then execute :

```bash
cd <this-app-dir>
# Make some change in .env if needed (specially db)
cp .env.example .env
npm install
cd angular
ng build
ng serve &
cd ../ && adonis migration:reset && adonis migration:run && adonis hamateur:importer
```

## Start

```bash
nodemon server.js &
cd angular && ng serve &
```
Open browser to localhost:4200

## Assets

```bash
# Put images in
/angular/public/assets/img-exam
```