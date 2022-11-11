# My Ecommerce Software Requirements

Goal : developed an Ecommerce web Application using Node js , Express js, and Mongoose.

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
- Schema Validation using Express-Validator
- Custom Filtertion, Pagination, Sorting, Search & Limit fields
- Handling Errors
  - Handle Unhandled Routes
  - Handle rejection outside express
- categories
  - Add new Category
  - Update specific Category
  - Delete specific Category
  - Get List of Categories
  - Get specific Category
  - Get All Subcategories for Specific Category
  - Create Subcategory on Category
- subcategories
  - Add new subCategory
  - Update specific subCategory
  - Delete specific subCategory
  - Get List of subCategories
  - Get specific subCategory
- brand
  - Add new Brand
  - Update specific Brand
  - Delete specific Brand
  - Get List of Brands
  - Get specific brand
- product
  - Add new product
  - Get a single product
  - Update a product
  - Delete a product
  - Get all products
  - Get related products
  - Product Search

## Back-end project structure

- index.js
- config
  - database.js
- controllers
  - auth.js
  - brand.js
  - category.js
  - product.js
  - subcategory.js
  - user.js
- middlewares
  - errorMiddleware.js
  - validatorMiddleware.js
- models
  - brands.js
  - category.js
  - product.js
  - subcategory.js
  - user.js
- router
  - auth.js
  - brand.js
  - category.js
  - product.js
  - subcategory.js
  - user.js
- utils
  - APIError.js
  - dummyData
    - seeder.js
    - products.json
  - validators
    - BrandValidators.js
    - categoryValidators.js
    - productValidators.js
    - subCategoryValidators.js

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

| @Route      | @Type | @access | @desc                       | Live |
| ----------- | ----- | ------- | --------------------------- | ---- |
| /api/signup | GET   | Private | sign up page                |      |
| /api/signup | POST  | Private | create a new user in db     |      |
| /api/login  | GET   | Private | log in page                 |      |
| /api/login  | POST  | Private | authenticate a current user |      |
| /api/logout | GET   | Private | log a user out              |      |

User Routes:

| @Route               | @Type | @access | @desc                                 | Live |
| -------------------- | ----- | ------- | ------------------------------------- | ---- |
| /api/profile/:userId | GET   | Private | retrieve a user's profile information |      |

Product Routes:

| @Route                                 | @Type  | @access | @desc                          | Live |
| -------------------------------------- | ------ | ------- | ------------------------------ | ---- |
| /api/products/create/:userId           | POST   | Private | Add new product                |      |
| /api/products/:productId               | GET    | Private | Get a single product           |      |
| /api/products/:productId/:userId"      | PUT    | Private | Update a product               |      |
| /api/products/:productId/:userId"      | DELETE | Private | Delete a product               |      |
| /api/products/related/:productId/      | GET    | Public  | Get related products           |      |
| /api/products/search                   | POST   | Public  | Product Search                 |      |
| /api/products/                         | GET    | Public  | Get all products               |      |
| /api/products?limit=3                  | GET    | Public  | Limit results                  |      |
| /api/products?sortedBy=price           | GET    | Public  | Sort results                   |      |
| /api/products?keyword=Clark,Olsen      | GET    | Public  | Search by title or description |      |
| /api/products?ratingsAverage[gte]=1.6  | GET    | Public  | Filter results                 |      |
| /api/products?fields=title,description | GET    | Public  | Field Limiting                 |      |

Category Routes:

| @Route                                  | @Type  | @access | @desc                                       | Live |
| --------------------------------------- | ------ | ------- | ------------------------------------------- | ---- |
| /api/category/create/:userId            | POST   | Private | Add new Category                            |      |
| /api/category/?limit=1                  | GET    | Public  | Get List of Categories ( Limit results)     |      |
| /api/category/?page=2&limit=1           | GET    | Public  | Get List of Categories                      |      |
| /api/category/:categoryId               | GET    | Public  | Get specific Category                       |      |
| /api/category/:categoryId/:userId       | PUT    | Private | Update specific Category                    |      |
| /api/category/:categoryId/:userId       | DELETE | Private | Delete specific Category                    |      |
| /api/category/:categoryId/subcategories | GET    | Public  | Get All Subcategories for Specific Category |      |
| /api/category/:categoryId/subcategories | POST   | Public  | Create Subcategory on Category              |      |

subCategory Routes:

| @Route                                    | @Type  | @access | @desc                                      | Live |
| ----------------------------------------- | ------ | ------- | ------------------------------------------ | ---- |
| /api/subcategories/create/:userId         | POST   | Private | Add new subCategory                        |      |
| /api/subcategories/?limit=1               | GET    | Public  | Get List of subCategories ( Limit results) |      |
| /api/subcategories/?page=2&limit=1        | GET    | Public  | Get List of subCategories                  |      |
| /api/subcategories/:subCategoryId         | GET    | Public  | Get specific subCategory                   |      |
| /api/subcategories/:subCategoryId/:userId | PUT    | Private | Update specific subCategory                |      |
| /api/subcategories/:subCategoryId/:userId | DELETE | Private | Delete specific subCategory                |      |

Brand Routes:

| @Route                      | @Type  | @access | @desc                 | Live |
| --------------------------- | ------ | ------- | --------------------- | ---- |
| /api/brand/create/:userId   | POST   | Private | Add new Brand         |      |
| /api/brand/?page=2&limit=1  | GET    | Public  | Get List of Brands    |      |
| /api/brand/:brandId         | GET    | Public  | Get specific Brand    |      |
| /api/brand/:brandId/:userId | PUT    | Private | Update specific Brand |      |
| /api/brand/:brandId/:userId | DELETE | Private | Delete specific Brand |      |

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

| Attribute name     | Notes                                                               |
| ------------------ | ------------------------------------------------------------------- |
| title \*           | String,min 3,max 100                                                |
| slug \*            | String,lowercase                                                    |
| description \*     | String , min 20                                                     |
| quantity \*        | Number                                                              |
| sold               | Number , default: 0                                                 |
| price \*           | Number, max: 200000                                                 |
| priceAfterDiscount | Number , priceAfterDiscount must be lower than price                |
| colors             | [String]                                                            |
| imageCover \*      | String                                                              |
| images             | [String]                                                            |
| category           | Valid MongoDB ObjectId ,Validate Category Existence in The DB       |
| subcategories      | Valid MongoDB ObjectId , Validate Subcategories Existence in Our DB |
| ratingsAverage     | Number min 1,max 5                                                  |
| ratingsQuantity    | Number default: 0                                                   |
| shipping           | boolean                                                             |

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

<!-- 
## How to use it


Products :

Get all products

```JavaScript
fetch('https://x.com/products')
    .then(res=>res.json())
    .then(json=>console.log(json))
```
-- >
