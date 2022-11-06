# My Ecommerce Software Requirements

Goal : developed an end to end Ecommerce web Application using Node js, React , Express js, and Mongoose.

## Stories

As a user I want to

- Create an account, login or logout
- Browse available products added by the admin

As an admin I want to

- View all the information stored in the database. I want to view/create/edit/delete orders, users, products and categories.

## The features in the API :

- Signing Up, signing in and signing out of users
- Authentication using JSON Web Tokens (JWT).
- admin Middlware
- Schema Validation using Joi
- categories - CRUD
- product - CRUD

## Database

All the models can be found in the models directory created using mongoose.

User Schema:

- name (String)
- email (String)
- password (String)
- Role(Number)
- history(array)

Category Schema:

- title (String)
- slug (String)

Product Schema:

- title (String)
- description (String)
- price (Number)
- quantity (Number)
- sold (Number)
- imagePath (String)
- category (ObjectId - a reference to the category schema)
- shipping (Boolean)

## Route

Auth Routes:

- /api/signup | GET | sign up page
- /api/signup | POST | create a new user in db
- /api/login | GET | log in page
- /api/login | POST | authenticate a current user
- /api/logout | GET | log a user out

User Routes:

- /api/profile/:userId | GET | retrieve a user's profile information

Product Routes:

- /api/product/create/:userId | POST | Add new product
- /api/product/:productId | GET | show single product
- /api/product/:productId/:userId" | PUT | Update product
- /api/product/:productId/:userId" | DELETE | Delete product

Category Routes:

- /api/category/create/:userId | POST | create Category
- /api/category/ | GET | Get List of Categories
- /api/category/:categoryId | GET | Get specific Category
- /api/category/:categoryId/:userId | PUT | Update specific Category
- /api/category/:categoryId/:userId | DELETE | Delete specific Category

## Technology

I use Express on NodeJs for the server, MongoDB to store data as document in JSON format and Mongoose for modeling.

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
- multer 1.4.5-lts.1
- slugify 1.6.5

## Run

To run this application, you have to set your own environmental variables. For security reasons, Below are the variables that you need to set in order to run the application:

- dbDatabaseURL
- JWT_SECRET
