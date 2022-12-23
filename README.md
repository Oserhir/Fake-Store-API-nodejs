# My Ecommerce Software Requirements

Fake Store API can be used with any type project that needs products, users, categories, authentication and users in JSON format. you can use examples below to check how fakeStoreApi works and feel free to enjoy it in your awesome projects!

## This API include feature like:

- ✅ Signing Up, signing in and signing out of users
- ✅ Authentication using JSON Web Tokens (JWT).
- ✅ Advance searching, sorting, pagination and filtering
- ✅ Schema Validation using Express-Validator
- ✅ Image Upload & Multiple Images Upload and image processing
- ✅ All CRUD Operations
- ✅ Star rating system
- ✅ Discount coupon code
- ✅ Add to wishlist
- ✅ Add to cart

## To-do list:

- Password forgot/reset, confirmation email on signup
- Credit card payment with stripe
- Cash on delivery (no online payment required)

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
  - address.js
  - cart.js
  - coupon.js
  - review.js
  - wishlist.js
- middlewares
  - auth.js
  - errorMiddleware.js
  - uploadImageMiddlewares.js
  - validatorMiddleware.js
- models
  - brands.js
  - category.js
  - product.js
  - subcategory.js
  - user.js
  - cart.js
  - coupon.js
  - review.js
- router
  - auth.js
  - brand.js
  - category.js
  - product.js
  - subcategory.js
  - user.js
  - address.js
  - cart.js
  - coupon.js
  - review.js
  - wishlist.js
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
    - ReviewValidators.js
    - subCategoryValidators.
    - wishlistValidator.js

## Database

All the models can be found in the models directory created using mongoose.

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
- Colors ([String])
- imageCover (string)
- images ([String])
- category (ObjectId - a reference to the category schema)
- subcategories (ObjectId - a reference to the subcategories schema)
- brand (ObjectId - a reference to the brand schema)
- ratingsAverage (number)
- ratingsQuantity (number)
- shipping (Boolean)

Review Schema:

- title (String)
- ratings (Number)
- user (ObjectId - a reference to the User schema)
- product (ObjectId - a reference to the product schema)

Coupon Schema:

- name (String)
- discount (Number)
- expire (Date)

Cart Schema:

- cartItems [ { product , quantity , color , price } ]
- totalCartPrice (Number)
- totalPriceAfterDiscount (Number)
- user (ObjectId - a reference to the user schema)

## Route

Product Routes:

| @Route                                 | @Type  | @access | @desc                          |
| -------------------------------------- | ------ | ------- | ------------------------------ |
| /api/products/create/:userId           | POST   | Private | Add new product                |
| /api/products/:productId               | GET    | Private | Get a single product           |
| /api/products/:productId/:userId"      | PUT    | Private | Update a product               |
| /api/products/:productId/:userId"      | DELETE | Private | Delete a product               |
| /api/products/related/:productId/      | GET    | Public  | Get related products           |
| /api/products/search                   | POST   | Public  | Product Search                 |
| /api/products/                         | GET    | Public  | Get all products               |
| /api/products?limit=3                  | GET    | Public  | Limit results                  |
| /api/products?sortedBy=price           | GET    | Public  | Sort results                   |
| /api/products?keyword=Clark,Olsen      | GET    | Public  | Search by title or description |
| /api/products?ratingsAverage[gte]=1.6  | GET    | Public  | Filter results                 |
| /api/products?fields=title,description | GET    | Public  | Field Limiting                 |

Category Routes:

| @Route                                  | @Type  | @access | @desc                                                       |
| --------------------------------------- | ------ | ------- | ----------------------------------------------------------- |
| /api/category/create/:userId            | POST   | Private | Add new Category                                            |
| /api/category/?limit=1                  | GET    | Public  | Get List of Categories ( Limit results)                     |
| /api/category/?page=2&limit=1           | GET    | Public  | Get List of Categories                                      |
| /api/category/:categoryId               | GET    | Public  | Get specific Category                                       |
| /api/category/:categoryId/:userId       | PUT    | Private | Update specific Category                                    |
| /api/category/:categoryId/:userId       | DELETE | Private | Delete specific Category                                    |
| /api/category/:categoryId/subcategories | GET    | Public  | Get All Subcategories for Specific Category ( Nested Route) |
| /api/category/:categoryId/subcategories | POST   | Public  | Create Subcategory on Category ( Nested Route)              |

SubCategory Routes:

| @Route                                    | @Type  | @access | @desc                                      |
| ----------------------------------------- | ------ | ------- | ------------------------------------------ |
| /api/subcategories/create/:userId         | POST   | Private | Add new subCategory                        |
| /api/subcategories/?limit=1               | GET    | Public  | Get List of subCategories ( Limit results) |
| /api/subcategories/?page=2&limit=1        | GET    | Public  | Get List of subCategories                  |
| /api/subcategories/:subCategoryId         | GET    | Public  | Get specific subCategory                   |
| /api/subcategories/:subCategoryId/:userId | PUT    | Private | Update specific subCategory                |
| /api/subcategories/:subCategoryId/:userId | DELETE | Private | Delete specific subCategory                |

Brand Routes:

| @Route                      | @Type  | @access | @desc                 |
| --------------------------- | ------ | ------- | --------------------- |
| /api/brand/create/:userId   | POST   | Private | Add new Brand         |
| /api/brand/?page=2&limit=1  | GET    | Public  | Get List of Brands    |
| /api/brand/:brandId         | GET    | Public  | Get specific Brand    |
| /api/brand/:brandId/:userId | PUT    | Private | Update specific Brand |
| /api/brand/:brandId/:userId | DELETE | Private | Delete specific Brand |

Review Routes:

| @Route                           | @Type  | @access | @desc                                                  |
| -------------------------------- | ------ | ------- | ------------------------------------------------------ |
| /api/reviews/create/:userId      | POST   | Private | Add new Review                                         |
| /api/reviews/?page=2&limit=1     | GET    | Public  | Get List of reviews                                    |
| /api/reviews/:reviewId           | GET    | Public  | Get specific review                                    |
| /api/reviews/:reviewId/:userId   | PUT    | Private | Update specific review                                 |
| /api/reviews/:reviewId/:userId   | DELETE | Private | Delete specific review                                 |
| /api/products/:IdProduct/reviews | GET    | Public  | Get all reviews on specifique products ( Nested Route) |

Wishlist Routes:

| @Route                           | @Type  | @access      | @desc                        |
| -------------------------------- | ------ | ------------ | ---------------------------- |
| /api/wishlist/:userId            | POST   | Private-User | Add Product To Wishlist      |
| /api/wishlist/:ProductId/:userId | DELETE | Private-User | Remove Product From Wishlist |
| /api/wishlist/:userId            | GET    | Private-User | Get Logged User Wishlist     |

Addresses Routes:

| @Route                             | @Type  | @access      | @desc              |
| ---------------------------------- | ------ | ------------ | ------------------ |
| /api/addressess/:userId            | POST   | Private-User | add user address   |
| /api/addressess/:addressId/:userId | DELETE | Private-User | remove user adress |
| /api/addressess/:userId            | GET    | Private-User | get user address   |

Coupon Routes:

| @Route                         | @Type  | @access       | @desc                  |
| ------------------------------ | ------ | ------------- | ---------------------- |
| /api/coupons/create/:userId    | POST   | Private-Admin | Create Coupon          |
| /api/coupons/:userId           | GET    | Private-Admin | Get All Coupons        |
| /api/coupons/:couponId/:userId | GET    | Private-Admin | Get specific Coupon    |
| /api/coupons/:couponId/:userId | PUT    | Private-Admin | Update specific Coupon |
| /api/coupons/:couponId/:userId | DELETE | Private-Admin | Delete specific Coupon |

Cart Routes:

| @Route                    | @Type  | @access      | @desc                         |
| ------------------------- | ------ | ------------ | ----------------------------- |
| /api/cart/create/:userId  | POST   | Private-User | add Product To Cart           |
| /api/cart/:userId         | GET    | Private-User | get Logged User Cart          |
| /api/cart/:itemId/:userId | DELETE | Private-User | remove Specific Cart Item     |
| /api/cart/:userId         | DELETE | Private-User | clear logged user cart        |
| /api/cart/:itemId/:userId | PUT    | Private-User | Update Cart Item Quantity     |
| /api/cart/:userId         | PUT    | Private-User | Apply Coupon On Shopping Cart |

## Validation Layer

Category:

| Attribute name | Notes                      |
| -------------- | -------------------------- |
| name \*        | String,min 3,max 32,unique |
| slug           | String,lowercase           |

SubCategory:

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

Review:

| Attribute name | Notes                                  |
| -------------- | -------------------------------------- |
| title          | String                                 |
| ratings        | Number,min 1,max 5,required            |
| user           | ObjectId (User) ,required              |
| product        | ObjectId (Product) ,isMongoId,required |

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
- colors 1.4.0
- express-async-handler 1.2.0
- express-validator 6.14.2
- lodash 4.17.21
- sharp 0.31.2

## Run

To run this application, you have to set your own environmental variables. For security reasons, Below are the variables that you need to set in order to run the application:

- MONGO_URI
- JWT_SECRET

---

title: Users
description: Endpoints for Users

---

User Routes:

| @Route          | @Type | @access | @desc             |
| --------------- | ----- | ------- | ----------------- |
| /api/users      | GET   | Private | Get all users     |
| /api/users/{id} | GET   | Private | Get a single user |
| /api/users      | POST  | Private | Create a user     |
| /api/users/{id} | PUT   | Private | Update a user     |

## Get all users

You can access the list of users by using the `/users` endpoint.

```
[GET] https://localhost:3000/api/users
```

```json
[
  {
    "_id": "6362a1793b0236acba300bad",
    "name": "Oserhir",
    "email": "oserhir@gmail.com",
    "password": "$2b$10$CW5dB3.zTAYgOTolpHG2Geswre.bt4TdXGkdrTGyHpytv5RNXFEZi",
    "role": 0,
    "createdAt": "2022-11-02T16:57:29.319Z",
    "updatedAt": "2022-11-22T21:01:17.949Z"
  }
  // ...
]
```

## Get a single user

You can get a single user by adding the `id` as a parameter: `/users/{id}`

```bash
[GET] https://localhost:3000/api/users/6362a1793b0236acba300bad
```

```json
{
  "_id": "6362a1793b0236acba300bad",
  "name": "Oserhir",
  "email": "oserhir@gmail.com",
  "password": "$2b$10$CW5dB3.zTAYgOTolpHG2Geswre.bt4TdXGkdrTGyHpytv5RNXFEZi",
  "role": 0,
  "createdAt": "2022-11-02T16:57:29.319Z",
  "updatedAt": "2022-11-22T21:01:17.949Z"
}
```

## Create a user

You can create a new user by sending an object like the following to `/users/`

```bash
[POST] https://localhost:3000/api/users/
```

```json
{
  "name": "oserhir",
  "email": "oserhir@gmail.com",
  "password": "123456789"
}
```

> Note that the password will be encrypted.

## Update a user

You can update a user exists by sending an object like the following and adding the `id` as a parameter: `/users/{id}`

```bash
[PUT] https://localhost:3000/api/users/6362a1793b0236acba300bad
```

```json
{
  "email": "oserhir@mail.com",
  "name": "Change name"
}
```

> Note that it is not necessary to send all user attributes, just send the attributes that want to update.

## Delete a user

You can delete a user exists by adding the `id` as a parameter: `/users/{id}`

```bash
[DELETE] https://localhost:3000/api/users/6362a1793b0236acba300bad
```

```json
status : 204 No Content
```

## Schema User

| Attribute | Type     | Description                           | Validation Layer |
| --------- | -------- | ------------------------------------- | ---------------- |
| id        | number   | The id of the user.                   |                  |
| name      | string   | The name of the user.                 |                  |
| role      | string   | The role of the user is user or admin |                  |
| email     | string   | The email of the user.                |                  |
| password  | string   | The password of the user.             |                  |
| Wishlist  | ObjectId |                                       |                  |
| Addresses | array    |                                       |                  |

---

title: Authentication
description: Endpoints for Authentication

---

Auth Routes:

| @Route            | @Type | @access | @desc                       |
| ----------------- | ----- | ------- | --------------------------- |
| /api/auth/signup  | POST  | Private | create a new user in db     |
| /api/auth/login   | POST  | Private | authenticate a current user |
| /api//auth/logout | GET   | Private | log a user out              |

## Login

You can do login by sending an object like the following to `/auth/login/`

```bash
[POST] https://localhost:3000/api/auth/login
```

```json
{
  "email": "dummy@email.com",
  "password": "123456"
}
```

## Sign Up

Create a user by sending user's credentials (in JSON format) in the Body of the HTTP Request. The content of the Body should look like the following:

```bash
[POST] https://localhost:3000/api/auth/signup
```

```json
{
  "name": "test",
  "email": "dummy@email.com",
  "password": "123456"
}
```

## Sign Out

```bash
[GET] https://localhost:3000/api/auth/signout
```
