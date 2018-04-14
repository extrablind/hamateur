# HAMateur

This is an NodeJS4, AdonisJs4, Sqlite3 program for french HAM radio exam test (to be short : a kind of quizz program)

## Setup

First, install NodeJS and npm (node package manager) globally
Then execute :

```bash
# Adonis (NodeJS part)
cd <this-app-dir>
cp .env.example .env # make change in .env file if needed
npm install
cd ../ && adonis migration:reset && adonis migration:run && adonis hamateur:importer
nodemon server.js
# Angular part
cd angular
ng build
ng serve
```

## Start

```bash
# Both servers must be up !
cd <this-app-dir>
nodemon server.js
cd angular && ng serve
```
Open browser and go to localhost:4200

Enjoy !

## Assets

```bash
# Put images in
/angular/public/assets/img-exam
```