# My Ecommerce Software Requirements

Goal : developed an end to end Ecommerce web Application using Node js , Express js, and Mongoose.

<!---
## Stories

As a user I want to

- Create an account, login or logout
- Browse available products added by the admin

As an admin I want to

- View all the information stored in the database. I want to view/create/edit/delete orders, users, products and categories.
and --->

## The features in the API :

- Signing Up, signing in and signing out of users
- Authentication using JSON Web Tokens (JWT).
- admin Middlware
- Schema Validation using Joi
- categories ( CRUD | Get List of Categories | Get specific Category | Get All Subcategories for Specific Category | Create Subcategory on Category )
- subcategories ( CRUD | Get List of subCategories | Get specific subCategory )
- brand ( CRUD | Get List of Brands | Get specific brand )
- product ( CRUD )
- Handling Errors ( Handle Unhandled Routes | Handle rejection outside express )

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
- image (String)

subCategory Schema:

- title (String)
- slug (String)
- category (ObjectId - a reference to the category schema)

brand Schema:

- title (String)
- image (String)

Product Schema:

- title (String)
- slug (String)
- description (String)
- quantity (Number)
- price (Number)
- sold (Number)
- priceAfterDiscount (Number)
- Color ([String])
- imageCover (string)
- images ([String])
- category (ObjectId - a reference to the category schema)
- subcategories (ObjectId - a reference to the subcategories schema)
- brand (ObjectId - a reference to the brand schema)
- ratingsAverage (number)
- ratingsQuantity (number)
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

- /api/category/create/:userId | POST | Private | create Category
- /api/category/?page=2&limit=1 | GET | Public | Get List of Categories
- /api/category/:categoryId | GET | Public | Get specific Category
- /api/category/:categoryId/:userId | PUT | Private | Update specific Category
- /api/category/:categoryId/:userId | DELETE | Private | Delete specific Category
- /api/category/:categoryId/subcategories| GET | Public | Get All Subcategories for Specific Category
- /api/category/:categoryId/subcategories | POST | Public | Create Subcategory on Category

subCategory Routes:

- /api/subcategories/create/:userId | POST | Private | create subCategory
- /api/subcategories/?page=2&limit=1 | GET | Public | Get List of subCategories
- /api/subcategories/:subCategoryId | GET | Public | Get specific subCategory
- /api/subcategories/:subCategoryId/:userId | PUT | Private | Update specific subCategory
- /api/subcategories/:subCategoryId/:userId | DELETE | Private | Delete specific subCategory

Brand Routes:

- /api/brand/create/:userId | POST | Private | create Brand
- /api/brand/?page=2&limit=1 | GET | Public | Get List of Brands
- /api/brand/:brandId | GET | Public | Get specific Brand
- /api/brand/:brandId/:userId | PUT | Private | Update specific Brand
- /api/brand/:brandId/:userId | DELETE | Private | Delete specific Brand

## Validation Layer

Category:

| Attribute name | Notes                      |
| -------------- | -------------------------- |
| name \*        | String,min 3,max 32,unique |
| slug           | String,lowercase           |

subCategory:

| Attribute name | Notes                                         |
| -------------- | --------------------------------------------- |
| name \*        | String,min 3,max 32,unique                    |
| slug           | String,lowercase                              |
| category \*    | subCategory must be belong to parent category |

Brand:

| Attribute name | Notes                      |
| -------------- | -------------------------- |
| name \*        | String,min 3,max 32,unique |
| image          | String                     |

Product:

| Attribute name     | Notes                         |
| ------------------ | ----------------------------- |
| title \*           | String,min 3,max 100          |
| slug \*            | String,lowercase              |
| description \*     | String , min 20               |
| quantity \*        | Number                        |
| sold               | Number , default: 0           |
| price \*           | Number, max: 200000           |
| priceAfterDiscount | Number                        |
| colors             | [String]                      |
| imageCover \*      | String                        |
| images             | [String]                      |
| category           | ObjectId ref: 'Category'      |
| subcategories      | ObjectId ref: 'subcategories' |
| ratingsAverage     | Number min 1,max 5            |
| ratingsQuantity    | Number default: 0             |
| shipping           | boolean                       |

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

- MONGO_URI
- JWT_SECRET
