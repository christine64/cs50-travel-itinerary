# CS50 Capstone Project:

This app is scaffolded using both Django Python for backend and Create-React-App for the front 
In order to have the app run correctly we must run the frontend application and the backened application, this is so when the front end is running, it will retrieve the information from the database using Django/PHP.

I have decided to seperate these for seperate of concerns, so each application can be distint and if it were used would be far easier to maintain and add more routes/components and state management to the application if necessary that purely Django would ultimately be insufficient in ease of providing.
Seperating the concerns would mean better isolation of bugs/problems were they to occur.

I think this distinctly differntiates my capstone application from the other projects on this course because of my use of seperation of concerns and expanded use of JavaScript and additionally adding the framework React. I have also updated the Django app in order to accomodate my use of React to have API endpoints that are accessible outside of the domain, which I think also adds to the complexity of this application, differentiating it from the past projects.

On top of this, I have called an external API (restcountries) to allow users to be able to see further information on the locations they wish to go and or planning to go.

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

### Features
# Login - Created using an API endpoint
# Travel Itinerary
1. Displays travel itinerary with information on location, travel dates and activities (API endpoint retrieval)
2. Can add a new travel itinerary from a form that posts to the our django app (API endpoint creation)
# Locations
1. Displays a list of locations that user can keep handy if they are looking to travel there (API endpoint retrieval)
2. Each location is selectable and directs to it's own page where further information on location is displayed from an external API (Rest Countries) 
3. Can add more countries to the list using the form on the main locations page (API endpoint creation)
# Wishlist/Future Travel
1. Displays a list of future travel locations (API endpoint retrieval)
2. Can delete from wishlist using API endpoint