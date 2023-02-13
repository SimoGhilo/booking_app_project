# booking_app_project

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

/////////////////////////// Update this tomo///////////////////////////////////////////////////
What's in the box?
Configuration Files

    webpack.config.js - Our webpack configuration for bundlign our client application
    .babelrc - Babel configuration file
    scripts/ - Contains scripts to be run at deployment (look into the package.json to see where each script should be used)

Back End (API)

    server.js - Express server entry point
    routes/ - Empty directory to store all of your server's API routes
    models/ - Empty directory to store all of your models
    db/ - Our database directory containing:
        db.js
            This is the database connection module that will use our Postgres ENV variables stored in our .env file
        schema.sql
            Empty SQL file that can be used to setup and edityour applications relations
            You can run this file in your CLI using psql -d <your_databaase> -f db/schema.sql
        seeds.sql
            Empty SQL file that can used to seed your database
            You can run this file in your CLI using psql -d <your_databaase> -f db/seeds.sql

Front End (React Client)

    src/ - Contains all of our React client's files
        index.js - The client application's entry point as defined in our webpack config
        components/ - Directory to store all of our React components
            App.jsx - Our React applicaiton container component
            App.css - Basic styling for the Hello World application (check out the demo link of how to use css modules in the Technology Used section above)
            normaliz.css - (Necolas's)[https://necolas.github.io/normalize.css/] CSS normalize
