# Booking_app_project

PERN Single Page Application 

Travel.com / Booking.com clone app

PERN stack Single Page Application (PostgreSQL, Express, React.js, Node.js)

Technologies Used:

    Postgresql
        object-relational database system
    Express.js
        framework used for our API server
    React.js
        Client side library for our view layer
    Dotenv
        Loads ENV variables from a .env file
    CSS Modules 
        Cascading stylesheets for styling of React components

Getting Started

Install Node Module with

$ npm install

$ npm start

Back End (API)

    server.js - Express server entry point
    routes/ - Empty directory to store all of your server's API routes
    db/ - Our database directory containing:
        database.js
            This is the database connection module that will use our Postgres ENV variables stored in our .env file
        booking.sql/.psql
            Empty SQL file that can be used to setup and edityour applications relations
            You can run this file in your CLI using psql -d <your_databaase> -f db/schema.sql/.psql
        passport.js
            Handles authentication and authorisation in our back-end application (Local and facebook startegies used)

Front End (React Client)

    src/ - Contains all of our React client's files
        index.js - The client application's entry point as defined in our webpack config
        components/ - Directory to store all of our React components
            App.js - Our React application container component
            styles/ - CSS files
            slice/ - Redux status container
            stripe/ - stripe container component and payment form
            
