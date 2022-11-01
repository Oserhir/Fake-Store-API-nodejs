# My Ecommerce Software Requirements

Goal : developed an end to end Ecommerce web Application using Node js, React , Express js, and Mongoose.

## The features in the API :

- Signing Up, signing in and signing out of users
- Authentication using JSON Web Tokens (JWT).
- Schema Validation using Joi

## Database

All the models can be found in the models directory created using mongoose.

User Schema:

- name (String)
- email (String)
- password (String)
- Role(Number)
- history(array)

## Route

Auth Routes:

- /api/signup | GET | sign up page
- /api/signup | POST | create a new user in db
- /api/login | GET | log in page
- /api/login | POST | authenticate a current user
- /api/logout | GET | log a user out

User Routes:

- /api/profile/:userId | GET | retrieve a user's profile information

## Technology

I use Express on NodeJs for the server, MongoDB to store data as document in JSON format and Mongoose for modeling.

- JavaScript
- Node.js
- Express
- MongoDB

The application is built with:

- express 4.18.2
- mongoose 6.6.5
- dotenv 16.0.3
- bcrypt 5.1.0
- body-parser 1.20.1
- cookie-parser 1.4.6
- express-jwt 7.7.7
- joi 17.6.3
- jsonwebtoken 8.5.1
- uuid 9.0.0
