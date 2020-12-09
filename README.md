This app is scaffolded using both Django Python for backend and Create-React-App for the front 
In order to have the app run correctly we must run the frontend application and the backened application, this is so when the front end is running, it will retrieve the information from the database using Django/PHP.

# Running the front end
To open the app, you must first `cd client` to the front end app and install dependencies using npm.

# Install Dependencies
`npm i`

# Open application
`npm run start`

This will start up the app on localhost:3000, and you should be able to see the front end development build.

# Running the back django application
To open the app, you must first `cd server` to the back end app and make migrations and migrate the database

# Make Migrations and migrate
Dependent on the python installation on your machine, this will either be python or python3
`python3 manage.py makemigrations`
`python3 manage.py migrate`

# Open application
`python3 manage.py runserver`

This will start up the app on localhost:8000, and you should be able to see the back end development build running on development server.

