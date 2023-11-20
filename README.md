# My Ecommerce Software Requirements

fakeStoreApi is an online REST API that you can use whenever you need Pseudo-real data for your e-commerce or shopping website without running any server-side code.

## The features in the API :

- ✅ Signing Up, signing in and signing out of users
- ✅ Authentication using JSON Web tokens (JWT).
- ✅ Advance searching, sorting, pagination and filtering
- ✅ Schema validation using Express-Validator
- ✅ single/multiple Image upload and image processing
- ✅ All CRUD Operations
- ✅ Star rating system
- ✅ Discount coupon code
- ✅ Add to wishlist
- ✅ Add to cart

## EndPoints

<!--ts-->

- [Authentication](#authentication)
  - [Login](#login)
  - [Sign Up](#sign-up)
- [Users ](#users--access--admin-)
  - [Get all users](#get-all-users)
  - [Get a single user](#get-a-single-user)
  - [Create a user](#create-a-user)
  - [Update a user](#update-a-user)
  - [Delete a user](#delete-a-user)
  - [Change Password](#change-password)
  - [Schema User](#schema-user)
- [Logged Users](#logged-users)
  - [Get Logged User](#get-logged-user)
  - [Update Logged User](#update-logged-user)
  - [Deactivate Logged Users](#deactivate-logged-users)
  - [Activate Logged Users](#activate-logged-users)
- [Categories](#categories)
  - [Create a category](#create-a-category)
  - [Update a category](#update-a-category)
  - [Delete a category](#delete-a-category)
  - [Get a single category](#get-a-single-category)
  - [Get all categories](#get-all-categories)
  - [Get all products by category](#get-all-products-by-category)
  - [Schema Category](#schema-category)
- [Subcategories](#subcategories)
  - [Create Sub-Category](#create-sub-category)
  - [Update a Sub-Category ](#update-a-sub-category)
  - [Delete a sub-Category ](#delete-a-sub-category)
  - [Get all Sub-Categories ](#get-all-sub-categories)
  - [Get a single sub-Category ](#get-a-single-sub-category)
  - [Get All Subcategories for Specific Category ](#get-all-subcategories-for-specific-category)
  - [Create Subcategory on Category ](#create-subcategory-on-category)
  - [Schema Sub-Category ](#schema-sub-category)
- [Brands](#brands)
  - [Add new Brand](#add-new-brand)
  - [Update specific Brand ](#update-specific-brand)
  - [Delete specific Brand ](#delete-specific-brand)
  - [Get specific Brand ](#get-specific-brand)
  - [Schema Brand ](#schema-brand)
- [product](#products)
  - [Create a product](#create-a-product)
  - [Update a product ](#update-a-product)
  - [Delete a product ](#delete-a-product)
  - [Get a single product ](#get-a-single-product)
  - [Get all products ](#get-all-products)
  - [Get Related Products ](#get-related-products)
  - [Search for a product by price ](#search-for-a-product-by-price)
  - [Search by title or description ](#search-by-title-or-description)
  - [Filter results ](#filter-results)
  - [Field Limiting ](#field-limiting)
  - [Product Schema ](#product-schema)
- [Reviews](#reviews)
  - [Add new Review ](#add-new-review)
  - [Update a Review ](#update-a-review)
  - [Delete specific review ](#delete-specific-review)
  - [Get specific review ](#get-specific-review)
  - [Get List of reviews ](#get-list-of-reviews)
  - [Get all reviews on specifique products ](#get-all-reviews-on-specifique-products)
  - [Review Schema ](#review-schema)
- [Wishlist](#wishlist)
  - [Add Product To Wishlist ](#add-product-to-wishlist)
  - [Remove Product From Wishlist ](#remove-product-from-wishlist)
  - [Get Logged User Wishlist ](#get-logged-user-wishlist)
- [Addresses](#addresses)
  - [Add address to user addresses list ](#add-address-to-user-addresses-list)
  - [Remove address from user addresses list ](#remove-address-from-user-addresses-list)
  - [Get logged user addresses list ](#get-logged-user-addresses-list)
- [Coupon](#coupon)
  - [Create Coupon ](#create-coupon)
  - [Update specific coupon ](#update-specific-coupon)
  - [Delete specific coupon ](#delete-specific-coupon)
  - [Get list of coupons ](#get-list-of-coupons)
  - [Get specific coupon ](#get-specific-coupon)
  - [Coupon Schema ](#coupon-schema)
- [Cart](#cart)
  - [Add product to cart ](#add-product-to-cart)
  - [Get logged user cart ](#get-logged-user-cart)
  - [Update specific cart ](#delete-specific-cart)
  - [Remove specific cart item ](#remove-specific-cart-item)
  - [Clear logged user cart ](#clear-logged-user-cart)
  - [Apply Coupon On Shopping Cart ](#apply-coupon-on-shopping-cart)
  - [Cart Schema ](#cart-schema)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`
`JWT_SECRET`

##### BASE_URL = `https://yofakestoreapi.onrender.com`

## API Authentication

Some endpoints may require authentication for example To create a create/delete/update category, you need to register your API users and obtain an access token.

The endpoints that require authentication expect a bearer token sent in the `Authorization header`.

**Example**:

`Authorization: Bearer YOUR TOKEN`

<!--te-->

<!--

## ToDo:

- Password forgot/reset, confirmation email on signup
- Credit card payment with stripe
- Cash on delivery (no online payment required)

## Database

All the models can be found in the models directory created using mongoose.






## Route

Product Routes:









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
  -->

---

## Users { @access : Admin }

#### Endpoints for Users

---

User Routes:

| @Route                           | @Type  | @access       | @desc             |
| -------------------------------- | ------ | ------------- | ----------------- |
| /api/users                       | GET    | Private/Admin | Get all users     |
| /api/users/{id}                  | GET    | Private/Admin | Get a single user |
| /api/users                       | POST   | Private/Admin | Create a user     |
| /api/users/{id}                  | PUT    | Private/Admin | Update a user     |
| /api/users/{id}                  | DELETE | Private/Admin | Delete a user     |
| /api/users/changeMyPassword/{id} | PUT    | Private/Admin | Change Password   |

## Get all users

You can access the list of users by using the `/api/users` endpoint.

```
[GET] https://yofakestoreapi.onrender.com/api/users
```

```json
[
  {
    "_id": "63bc7cb13e721990a8cc4ff5",
    "name": "Jhon",
    "email": "john@mail.com",
    "password": "$2a$12$ZZuflASgU6q.hZ0PsoqtL.tGocZZtBUAxHsvP/jvz3APY70/8BU2y",
    "role": "user",
    "active": true,
    "wishlist": [],
    "addresses": [],
    "createdAt": "2023-01-09T20:44:33.095Z",
    "updatedAt": "2023-01-09T20:44:33.095Z"
  }
  // ...
]
```

## Get a single user

You can get a single user by adding the `id` as a parameter: `/api/users/{userId}`

```bash
[GET] https://yofakestoreapi.onrender.com/api/users/63bc7cb13e721990a8cc4ff5
```

```json
{
  "data": {
    "_id": "63bc7cb13e721990a8cc4ff5",
    "name": "Jhon",
    "email": "john@mail.com",
    "password": "$2a$12$ZZuflASgU6q.hZ0PsoqtL.tGocZZtBUAxHsvP/jvz3APY70/8BU2y",
    "role": "user",
    "active": true,
    "wishlist": [],
    "addresses": [],
    "createdAt": "2023-01-09T20:44:33.095Z",
    "updatedAt": "2023-01-09T20:44:33.095Z",
    "__v": 0
  }
}
```

## Create a user

You can create a new user by sending an object like the following to `/api/users/`

```bash
[POST] https://yofakestoreapi.onrender.com/api/users/
```

```json
{
  "name": "Oscar",
  "email": "oscar@mail.com",
  "password": "123456",
  "passwordConfirm": "123456"
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
    "data": {
        "name": "Oscar",
        "slug": "oscar",
        "email": "oscar@mail.com",
        "password": "$2a$12$LhfBZCCTvsKgSmBKS9brN.tRKSVKuWJYVc1Kr1fh65hMuBWU3N12O",
        "role": "user",
        "active": true,
        "wishlist": [],
        "_id": "63bc81973e721990a8cc501f",
        "addresses": [],
        "createdAt": "2023-01-09T21:05:27.441Z",
        "updatedAt": "2023-01-09T21:05:27.441Z",
        "__v": 0
    }
}
```

</details>

> Note that the password will be encrypted.

## Update a user

You can update a user exists by sending an object like the following and adding the `id` as a parameter: `/api/users/{userId}`

```bash
[PUT] https://yofakestoreapi.onrender.com/api/users/63bc81973e721990a8cc501f
```

```json
{
  "name": "Billy",
  "email": "billy@mail.com"
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
    "data": {
        "_id": "63bc81973e721990a8cc501f",
        "name": "Billy",
        "slug": "billy",
        "email": "billy@mail.com",
        "password": "$2a$12$LhfBZCCTvsKgSmBKS9brN.tRKSVKuWJYVc1Kr1fh65hMuBWU3N12O",
        "role": "user",
        "active": true,
        "wishlist": [],
        "addresses": [],
        "createdAt": "2023-01-09T21:05:27.441Z",
        "updatedAt": "2023-01-09T21:07:22.679Z",
        "__v": 0
    }
}
```

</details>

> Note that it is not necessary to send all user attributes, just send the attributes that want to update.

## Delete a user

You can delete a user exists by adding the `id` as a parameter: `/api/users/{userId}`

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/users/63bc81973e721990a8cc501f
```

```json
status : 204 No Content
```

## Change Password

You can change password of any user exists by sending an object like the following and adding the `id` as a parameter: `/api/users/changePassword/{userId}`

<!--  changeMyPassword/{userId -->

```bash
[PUT] https://yofakestoreapi.onrender.com/api/users/changePassword/63bc802d3e721990a8cc5005
```

```json
{
  "currentPassword": "123456",
  "password": "1234",
  "passwordConfirm": "1234"
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
    "data": {
        "_id": "63bc802d3e721990a8cc5005",
        "name": "Admin",
        "email": "admin@mail.com",
        "password": "$2a$12$TfmUC4p.eR8HVDyXBGn4y.9EiO.54W5J78rBDxl9PWMuRQN0iMvwy",
        "role": "admin",
        "active": true,
        "wishlist": [],
        "addresses": [],
        "createdAt": "2023-01-09T20:59:25.738Z",
        "updatedAt": "2023-01-09T21:17:11.214Z",
        "__v": 0,
        "passwordChangedAt": "2023-01-09T21:17:11.214Z"
    }
}
```

</details>

## Schema User

| Attribute | Type    |
| --------- | ------- |
| name      | string  |
| role      | string  |
| email     | string  |
| password  | string  |
| active    | boolean |
| Addresses | array   |

---

---

## Logged Users

#### Endpoints for Logged Users

---

| @Route              | @Type  | @access         | @desc                   |
| ------------------- | ------ | --------------- | ----------------------- |
| /api/users/getMe    | GET    | Private/Protect | Get Logged User         |
| /api/users/updateMe | PUT    | Private/Protect | Update Logged User      |
| /api/users/deleteMe | DELETE | Private/Protect | Deactivate Logged Users |
| /api/users/activeMe | PUT    | Private/Protect | Activate Logged Users   |

## Get Logged User

```bash
[GET] https://yofakestoreapi.onrender.com/api/users/getMe
```

```json
{
  "data": {
    "_id": "63bc7cf53e721990a8cc4ff8",
    "name": "Ruby",
    "email": "ruby@mail.com",
    "password": "$2a$12$vJ1Yf9Jkj700doCaSZBlgudPTOLlzpkGgOlB4fUzOwaKcYyQGfGJS",
    "role": "user",
    "active": true,
    "wishlist": [],
    "addresses": [],
    "createdAt": "2023-01-09T20:45:41.648Z",
    "updatedAt": "2023-01-09T20:45:41.648Z",
    "__v": 0
  }
}
```

## Update Logged User

You can update logged user by sending an object like the following

```bash
[PUT] https://yofakestoreapi.onrender.com/api/users/updateMe
```

```json
{
  "name": "Ruby",
  "email": "ruby@mail.com"
}
```

## Deactivate Logged Users

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/users/deleteMe
```

## Activate Logged Users

```bash
[PUT] https://yofakestoreapi.onrender.com/api/users/activeMe
```

## Authentication

#### Endpoints for Authentication

---

Auth Routes:

| @Route           | @Type | @access | @desc                       |
| ---------------- | ----- | ------- | --------------------------- |
| /api/auth/signup | POST  | Public  | Create a new user in db     |
| /api/auth/login  | POST  | Public  | Authenticate a current user |

## Login

You can do login by sending an object like the following to `/auth/login/`

```bash
[POST] https://yofakestoreapi.onrender.com/api/auth/login
```

```json
{
  "email": "ruby@mail.com",
  "password": "123456"
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
    "data": {
        "_id": "63bc7cf53e721990a8cc4ff8",
        "name": "Ruby",
        "email": "ruby@mail.com",
        "role": "user",
        "active": true,
        "wishlist": [],
        "addresses": [],
        "createdAt": "2023-01-09T20:45:41.648Z",
        "updatedAt": "2023-01-09T20:45:41.648Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2JjN2NmNTNlNzIxOTkwYThjYzRmZjgiLCJpYXQiOjE2NzMyOTczOTYsImV4cCI6MTY4MTA3MzM5Nn0.cHnKhOCIYvWkEvS2yNYKYDrTvvUOV5GaxddTzbqYSLA"
}
```

</details>

## Sign Up

Create a user by sending user's credentials (in JSON format) in the Body of the HTTP Request. The content of the Body should look like the following:

```bash
[POST] https://yofakestoreapi.onrender.com/api/auth/signup
```

```json
{
  "name": "Ruby",
  "email": "ruby@mail.com",
  "password": "123456",
  "passwordConfirm": "123456"
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
    "data": {
        "name": "Ruby",
        "email": "ruby@mail.com",
        "password": "$2a$12$vJ1Yf9Jkj700doCaSZBlgudPTOLlzpkGgOlB4fUzOwaKcYyQGfGJS",
        "role": "user",
        "active": true,
        "wishlist": [],
        "_id": "63bc7cf53e721990a8cc4ff8",
        "addresses": [],
        "createdAt": "2023-01-09T20:45:41.648Z",
        "updatedAt": "2023-01-09T20:45:41.648Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2JjN2NmNTNlNzIxOTkwYThjYzRmZjgiLCJpYXQiOjE2NzMyOTcxNDQsImV4cCI6MTY4MTA3MzE0NH0.FpBunPGtHG88Xi2fvJ4k-q7t3vW_ARPBpmAH-eMAmzQ"
}
```

</details>

---

## Categories

#### Endpoints for Categories

---

Category Routes:

| @Route                               | @Type  | @access       | @desc                        |
| ------------------------------------ | ------ | ------------- | ---------------------------- |
| /api/categories/                     | POST   | Private/Admin | Create a category            |
| /api/categories/:categoryId/         | PUT    | Private/Admin | Update a category            |
| /api/categories/:categoryId/         | DELETE | Private/Admin | Delete a category            |
| /api/categories/:categoryId          | GET    | Public        | Get a single category        |
| /api/categories/?page=2&limit=1      | GET    | Public        | Get List of Categories       |
| /api/categories/:categoryId/products | GET    | Public        | Get all products by category |

## Create a category

You can create a new category by sending an object like the following to `/categories/`

```bash
[POST] https://yofakestoreapi.onrender.com/api/categories/
```

```json
{
  "name": "Dog Food",
  "image": "https://yofakestoreapi.onrender.com//categories/category-bc9c91b0-0602-4679-a90a-ec2d35dcc895-1673300203174.jpeg"
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
    "data": {
        "name": "Dog Food",
        "slug": "dog-food",
        "image": "https://yofakestoreapi.onrender.com//categories/category-bc9c91b0-0602-4679-a90a-ec2d35dcc895-1673300203174.jpeg",
        "_id": "63bc88ec3e721990a8cc5064",
        "createdAt": "2023-01-09T21:36:44.017Z",
        "updatedAt": "2023-01-09T21:36:44.017Z",
        "__v": 0
    }
}
```

</details>

## Update a category

You can update a category exists by sending an object like the following and adding the id as a parameter: `/categories/{categoryId}`

```bash
[PUT] https://yofakestoreapi.onrender.com/api/categories/63bc88ec3e721990a8cc5064
```

```json
{
  "name": "Change name"
}
```

> Note that it is not necessary to send all user attributes, just send the attributes that want to update.

## Delete a category

You can delete a category exists by adding the `id`as a parameter: `/api/users/{id}`

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/categories/{categoryId}
```

```json
status : 204 No Content
```

## Get a single category

You can get a single category by adding the `id` as a parameter: `/categories/{categoryId}`

```bash
[GET] https://yofakestoreapi.onrender.com/api/categories/63bc88ec3e721990a8cc5064
```

```json
{
  "data": {
    "_id": "63bc88ec3e721990a8cc5064",
    "name": "Dog Food",
    "slug": "dog-food",
    "image": "https://yofakestoreapi.onrender.com//categories/category-bc9c91b0-0602-4679-a90a-ec2d35dcc895-1673300203174.jpeg",
    "createdAt": "2023-01-09T21:36:44.017Z",
    "updatedAt": "2023-01-09T21:36:44.017Z",
    "__v": 0
  }
}
```

## Get all categories

You can access the list of categories by using the `/categories` endpoint.

```bash
[GET] https://yofakestoreapi.onrender.com/api/categories/
```

```json
{
  "data": [
    {
      "_id": "63bc88ec3e721990a8cc5064",
      "name": "Dog Food",
      "slug": "dog-food",
      "image": "https://yofakestoreapi.onrender.com//categories/category-bc9c91b0-0602-4679-a90a-ec2d35dcc895-1673300203174.jpeg",
      "createdAt": "2023-01-09T21:36:44.017Z",
      "updatedAt": "2023-01-09T21:36:44.017Z"
    }
    // ...
  ]
}
```

## Get all products by category

You can access the list of products by using the `/categories/{categoryId}/products` endpoint.

```bash
[GET] https://yofakestoreapi.onrender.com/api/categories/{categoryId}/products
```

```json
{
  "page": 1,
  "result": 5,
  "data": [
    {
      "_id": "636e6bef6c34aa33724e6cd9",
      "title": "Mens Cotton Jacket",
      "slug": "mens-cotton-jacket",
      "description": "great outerwear jackets ...........",
      "quantity": 20,
      "sold": 75,
      "price": 55.99,
      "colors": [],
      "category": {
        "_id": "636e61a8aa2719937c3cf0dc",
        "name": "Men's Clothing"
      },
      "subcategories": [],
      "ratingsAverage": 4,
      "ratingsQuantity": 70,
      "createdAt": "2022-11-11T15:36:15.688Z",
      "updatedAt": "2022-11-11T15:36:15.688Z"
    }
    // ...
  ]
}
```

## Schema Category

| Attribute | Type   |
| --------- | ------ |
| name      | string |
| slug      | string |
| image     | string |

---

## Subcategories

#### Endpoints for Subcategories

---

Sub-Category Routes:

| @Route                             | @Type  | @access       | @desc                                       |
| ---------------------------------- | ------ | ------------- | ------------------------------------------- |
| /api/subcategories/                | POST   | Private/Admin | Add New Sub-Category                        |
| /api/subcategories/:id             | PUT    | Private/Admin | Update specific subCategory                 |
| /api/subcategories/:id             | DELETE | Private/Admin | Delete specific subCategory                 |
| /api/subcategories/?page=2&limit=1 | GET    | Public        | Get List of subCategories                   |
| /api/subcategories/:id             | GET    | Public        | Get specific subCategory                    |
| /api/categories/:id/subcategories  | GET    | Public        | Get All Subcategories for Specific Category |
| /api/categories/:id/subcategories  | POST   | Public        | Create Subcategory on Category              |

## Create Sub-Category

You can create a new subcategory by sending an object like the following to `/subcategories/`

```bash
[POST] https://yofakestoreapi.onrender.com/api/categories/
```

```json
{
  "name": "test",
  "category": "636e61cbaa2719937c3cf0e0"
}
```

## Update a Sub-Category

You can update a Sub-category exists by sending an object like the following and adding the id as a parameter: `/subcategories/{id}`

```bash
[PUT] https://yofakestoreapi.onrender.com/api/subcategories/{subCategoryId}
```

```json
{
  "name": "Change name",
  "category": "99999999999"
}
```

> Note that it is not necessary to send all user attributes, just send the attributes that want to update.

## Delete a sub-Category

You can delete a subcategory exists by adding the `id`as a parameter: `/api/subcategories/{id}`

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/subcategories/{categoryId}
```

```json
status : 204 No Content
```

## Get all Sub-Categories

You can access the list of subcategories by using the `/subcategories` endpoint.

```bash
[GET] https://yofakestoreapi.onrender.com/api/subcategories/
```

```json
{
  "page": 1,
  "subcategories": [
    {
      "_id": "63ac8c42e7a0e5ce49dce1bd",
      "name": "Travel & Outdoor",
      "category": "636e61cbaa2719937c3cf0e0",
      "createdAt": "2022-12-28T18:34:42.494Z",
      "updatedAt": "2022-12-28T18:34:42.494Z",
      "__v": 0
    }
    // ...
  ]
}
```

## Get a single sub-Category

You can get a single subcategory by adding the `id` as a parameter: `/subcategories/{id}`

```bash
[GET] https://yofakestoreapi.onrender.com/api/categories/${id}
```

```json
{
  "subcategory": {
    "_id": "63ac901625fabe4f633c4be4",
    "name": "Travel & Outdoor",
    "category": "636e61cbaa2719937c3cf0e0",
    "createdAt": "2022-12-28T18:51:02.581Z",
    "updatedAt": "2022-12-28T18:51:02.581Z"
  }
}
```

## Get All Subcategories for Specific Category

You can get All Subcategories for Specific Category by adding the `categoryId` as a parameter: `categories/${categoryId}/subcategories`

```bash
[GET] https://yofakestoreapi.onrender.com/api/categories/${categoryId}/subcategories
```

```json
"page": 1,
    "subcategories": [
        {
            "_id": "63ad3d03304ec94eb416f2f9",
            "name": "Shirts",
            "slug": "shirts",
            "category": "636e61a8aa2719937c3cf0dc",
            "createdAt": "2022-12-29T07:08:51.708Z",
            "updatedAt": "2022-12-29T07:08:51.708Z",
            "__v": 0
        },
        // ...
    ]
```

## Create Subcategory on Category

You can create a new subcategory by sending an object like the following to `/categories/${categoryId}/subcategories/`

```bash
[POST] https://yofakestoreapi.onrender.com/api/categories/${categoryId}/subcategories/
```

```json
{
  "name": "test"
}
```

## Schema Sub-Category

| Attribute | Type     |
| --------- | -------- |
| title     | string   |
| slug      | string   |
| category  | ObjectId |

---

## Brands

#### Endpoints for Brands

---

Brand Routes:

| @Route                     | @Type  | @access       | @desc                 |
| -------------------------- | ------ | ------------- | --------------------- |
| /api/brand/                | POST   | Private/Admin | Add new Brand         |
| /api/brand/:brandId/       | PUT    | Private/Admin | Update specific Brand |
| /api/brand/:brandId/       | DELETE | Private/Admin | Delete specific Brand |
| /api/brand/?page=2&limit=1 | GET    | Public        | Get List of Brands    |
| /api/brand/:brandId        | GET    | Public        | Get specific Brand    |

## Add new Brand

You can create a new brand by sending an object like the following to `/brands/`

```bash
[POST] https://yofakestoreapi.onrender.com/api/brands/
```

```json
{
  "name": "BMW",
  "image": "http://localhost:3000/brands/brand-4c6dc1a5-c156-409a-8774-1d47b71f3f6d-1672313914144.jpeg"
}
```

## Update specific Brand

You can update a brand exists by sending an object like the following and adding the `id` as a parameter: `/brands/{id}`

```bash
[PUT] https://yofakestoreapi.onrender.com/api/subcategories/{brandId}
```

```json
{
  "name": "Change name"
}
```

> Note that it is not necessary to send all brand attributes, just send the attributes that want to update.

## Delete specific Brand

You can delete brand exists by adding the `id`as a parameter: `/api/brands/{id}`

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/brands/{brandId}
```

```json
status : 204 No Content
```

## Get List of Brands

You can access the list of brands by using the `/brands` endpoint.

```bash
[GET] https://yofakestoreapi.onrender.com/api/brands/
```

```json
{
  "page": 1,
  "result": 13,
  "data": [
    {
      "_id": "63ad7c3aa9e90aed3fac800e",
      "name": "brand name",
      "image": "http://localhost:3000/brands/brand-4c6dc1a5-c156-409a-8774-1d47b71f3f6d-1672313914144.jpeg",
      "createdAt": "2022-12-29T11:38:34.244Z",
      "updatedAt": "2022-12-29T11:38:34.244Z"
    }
    // ...
  ]
}
```

## Get specific Brand

You can get a single brand by adding the `id` as a parameter: `/brands/{id}`

```bash
[GET] https://yofakestoreapi.onrender.com/api/categories/${id}
```

```json
{
  "data": {
    "_id": "63ad7c3aa9e90aed3fac800e",
    "name": "brand name",
    "image": "http://localhost:3000/brands/brand-4c6dc1a5-c156-409a-8774-1d47b71f3f6d-1672313914144.jpeg",
    "createdAt": "2022-12-29T11:38:34.244Z",
    "updatedAt": "2022-12-29T11:38:34.244Z",
    "__v": 0
  }
}
```

## Schema Brand

| Attribute | Type   |
| --------- | ------ |
| title     | string |
| image     | string |

## Products

#### Endpoints for Products

---

Product Routes:

| @Route                                 | @Type  | @access       | @desc                          |
| -------------------------------------- | ------ | ------------- | ------------------------------ |
| /api/products/                         | POST   | Private/Admin | Create a product               |
| /api/products/:productId               | PUT    | Private/Admin | Update a product               |
| /api/products/:productId               | DELETE | Private/Admin | Delete a product               |
| /api/products/:productId               | GET    | Public        | Get a single product           |
| /api/products/                         | GET    | Public        | Get all products               |
| /api/products/related/:productId/      | GET    | Public        | Get related products           |
| /api/products/search                   | POST   | Public        | Search for a product by price  |
| /api/products?sortedBy=price           | GET    | Public        | Sort results                   |
| /api/products?keyword=Clark,Olsen      | GET    | Public        | Search by title or description |
| /api/products?ratingsAverage[gte]=1.6  | GET    | Public        | Filter results                 |
| /api/products?fields=title,description | GET    | Public        | Field Limiting                 |

## Create a product

You can create a new product by sending an object like the following to `/api/products/` endpoint.

```
[GET] https://yofakestoreapi.onrender.com/api/products
```

```json
{
  "data": {
    "title": "Pedigree Complete Nutrition Grilled Steak & Vegetable Flavor Dog Kibble Adult Dry Dog Food",
    "slug": "pedigree-complete-nutrition-grilled-steak-and-vegetable-flavor-dog-kibble-adult-dry-dog-food",
    "description": "Give your furry friend a taste of the good life with the Pedigree Complete Nutrition Grilled Steak & Vegetable Flavor Dog Kibble Adult Dry Dog Food. With a succulent steak flavor accented with hearty vegetables, this food has everything you need to keep your dog feeling his best. It’s prepared with whole grains for healthy digestion, plus essential nutrients and omega-6 fatty acids to promote a healthy skin and luxurious coat. And perhaps best of all, the crunchy texture of the kibble helps clean his teeth, so he’s always ready for his close up. It’s the easy way to combine great-tasting food plus nutrition that promotes health and vitality into a single bowl.",
    "quantity": 12,
    "sold": 0,
    "price": 27.78,
    "priceAfterDiscount": 16.99,
    "colors": [],
    "imageCover": "https://yofakestoreapi.onrender.com//products/product-f720ed78-f7ae-4b97-984e-724fd649b526-1673301241065-cover.jpeg",
    "images": [
      "https://yofakestoreapi.onrender.com//products/product-75dda5a2-05c8-4ece-9e93-56cd68629d9b-1673301243414-3.jpeg",
      "https://yofakestoreapi.onrender.com//products/product-6265568d-907a-4c00-a8da-3461ffd0f9d9-1673301243413-1.jpeg",
      "https://yofakestoreapi.onrender.com//products/product-c1abe725-affd-4db1-b223-fe3a397f8551-1673301243414-2.jpeg",
      "https://yofakestoreapi.onrender.com//products/product-5a1e1cc9-37ad-438f-ab25-fec0ecf2596d-1673301243415-4.jpeg"
    ],
    "category": "63bc88ec3e721990a8cc5064",
    "subcategories": [],
    "ratingsQuantity": 0,
    "_id": "63bc8d063e721990a8cc5085",
    "createdAt": "2023-01-09T21:54:14.049Z",
    "updatedAt": "2023-01-09T21:54:14.049Z",
    "__v": 0,
    "id": "63bc8d063e721990a8cc5085"
  }
}
```

## Update a product

you can update a product exists by sending an object like the following and adding the `id` as a parameter: `/api/products/{id}`

```bash
[PUT] https://yofakestoreapi.onrender.com/api/products/63bc8d063e721990a8cc5085
```

```json
{
  "title": "Change title",
  "price": 100
}
```

> Note that it is not necessary to send all product attributes, just send the attributes that want to update.

## Delete a product

You can delete a product exists by adding the `id` as a parameter: `/api/products/{id}`

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/products/63bc8e693e721990a8cc508d
```

```json
status : 204 No Content
```

## Get a single product

You can get a single product by adding the `id` as a parameter: `/api/products/{id}`

```bash
[GET] https://yofakestoreapi.onrender.com/api/products/63bc8e4b3e721990a8cc5089
```

```json
{
  "data": {
    "_id": "63bc8e4b3e721990a8cc5089",
    "title": "Kibbles 'n Bits Original Savory Beef & Chicken Flavors Dry Dog Food",
    "slug": "kibbles-'n-bits-original-savory-beef-and-chicken-flavors-dry-dog-food",
    "description": "Give your pup the nutrition and flavor he loves with the Kibbles 'n Bits Original Savory Beef & Chicken Flavors Dry Dog Food. This formula packs plenty of meaty taste into a blend of crunchy kibble and soft meaty bits made with the flavors of beef and chicken. It’s loaded with high-quality protein to help support strong muscles, plus vitamins, minerals and antioxidants so it’s a complete and balanced diet for adults. Plus, it’s proudly made in the USA so it’s a satisfying meal you can feel good about serving your dog every day!\n\n",
    "quantity": 80,
    "sold": 0,
    "price": 26.83,
    "priceAfterDiscount": 25.49,
    "colors": [],
    "imageCover": "https://yofakestoreapi.onrender.com//products/product-843c9047-6b04-41ef-8006-c649a9717976-1673301569183-cover.jpeg",
    "images": [
      "https://yofakestoreapi.onrender.com//products/product-0cfe07c8-2f7e-460c-9ce0-3f405e6fea95-1673301571031-4.jpeg",
      "https://yofakestoreapi.onrender.com//products/product-86670577-2138-4e16-b405-0b4757a67293-1673301571030-1.jpeg",
      "https://yofakestoreapi.onrender.com//products/product-0d83e714-47b7-4b01-8126-8d9be261f7fe-1673301571031-3.jpeg",
      "https://yofakestoreapi.onrender.com//products/product-998a7b86-fb60-4299-a5ca-895906919a58-1673301571030-2.jpeg"
    ],
    "category": {
      "name": "Dog Food"
    },
    "subcategories": [],
    "ratingsQuantity": 0,
    "createdAt": "2023-01-09T21:59:39.954Z",
    "updatedAt": "2023-01-09T21:59:39.954Z",
    "__v": 0,
    "reviews": [],
    "id": "63bc8e4b3e721990a8cc5089"
  }
}
```

## Get all products

You can access the list of 200 products by using the `/api/products` endpoint.

```bash
[GET] https://yofakestoreapi.onrender.com/api/products
```

```json
{
  "results": 2,
  "paginationResult": {
    "currentPage": 1,
    "limit": 50,
    "numberOfPages": 1
  },
  "data": [
    {
      "_id": "63bc8d063e721990a8cc5085",
      "title": "Pedigree Complete Nutrition Grilled Steak & Vegetable Flavor Dog Kibble Adult Dry Dog Food",
      "slug": "pedigree-complete-nutrition-grilled-steak-and-vegetable-flavor-dog-kibble-adult-dry-dog-food",
      "description": "Give your furry friend a taste of the good life with the Pedigree Complete Nutrition Grilled Steak & Vegetable Flavor Dog Kibble Adult Dry Dog Food. With a succulent steak flavor accented with hearty vegetables, this food has everything you need to keep your dog feeling his best. It’s prepared with whole grains for healthy digestion, plus essential nutrients and omega-6 fatty acids to promote a healthy skin and luxurious coat. And perhaps best of all, the crunchy texture of the kibble helps clean his teeth, so he’s always ready for his close up. It’s the easy way to combine great-tasting food plus nutrition that promotes health and vitality into a single bowl.",
      "quantity": 12,
      "sold": 0,
      "price": 27.78,
      "priceAfterDiscount": 16.99,
      "colors": [],
      "imageCover": "https://yofakestoreapi.onrender.com//products/product-f720ed78-f7ae-4b97-984e-724fd649b526-1673301241065-cover.jpeg",
      "images": [
        "https://yofakestoreapi.onrender.com//products/product-75dda5a2-05c8-4ece-9e93-56cd68629d9b-1673301243414-3.jpeg",
        "https://yofakestoreapi.onrender.com//products/product-6265568d-907a-4c00-a8da-3461ffd0f9d9-1673301243413-1.jpeg",
        "https://yofakestoreapi.onrender.com//products/product-c1abe725-affd-4db1-b223-fe3a397f8551-1673301243414-2.jpeg",
        "https://yofakestoreapi.onrender.com//products/product-5a1e1cc9-37ad-438f-ab25-fec0ecf2596d-1673301243415-4.jpeg"
      ],
      "category": {
        "name": "Dog Food"
      },
      "subcategories": [],
      "ratingsQuantity": 0,
      "createdAt": "2023-01-09T21:54:14.049Z",
      "updatedAt": "2023-01-09T21:54:14.049Z",
      "id": "63bc8d063e721990a8cc5085"
    }
    // ...
  ]
}
```

## Get Related Products

You can get related product by adding the `/api/products/related/{id}` endpoint.

```bash
[GET] https://yofakestoreapi.onrender.com/api/products/related/{productId}
```

```json
[
  {
    "_id": "636e6bef6c34aa33724e6cdb",
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "slug": "john-hardy-women's-legends-naga-gold-and-silver-dragon-station-chain-bracelet",
    "description": "From our Legends Collection, the Naga was inspired by the .....................",
    "quantity": 91,
    "sold": 23,
    "price": 695,
    "colors": [],
    "imageCover": "https://test.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "images": [],
    "category": {
      "_id": "636e64579569c30b4ef8de53",
      "name": "Women's Clothing"
    },
    "subcategories": [],
    "ratingsAverage": 4.4,
    "ratingsQuantity": 12,
    "createdAt": "2022-11-11T15:36:15.688Z",
    "updatedAt": "2022-12-20T12:12:03.570Z"
  }
  // ...
]
```

## Search for a product by price

You can search for a product by price by sending an object like the following

```bash
[GET] https://yofakestoreapi.onrender.com/api/products/search
```

```json
{
  "filters": {
    "price": [4, 20]
  }
}
```

## Search by title or description

To Search by title or description the API needs to be called with the `keyword` set word that you want

```bash
[GET] https://yofakestoreapi.onrender.com/api/products/?keyword=Flavors
```

```json
{
  "results": 1,
  "paginationResult": {
    "currentPage": 1,
    "limit": 50,
    "numberOfPages": 1
  },
  "data": [
    {
      "_id": "63bc8e4b3e721990a8cc5089",
      "title": "Kibbles 'n Bits Original Savory Beef & Chicken Flavors Dry Dog Food",
      "slug": "kibbles-'n-bits-original-savory-beef-and-chicken-flavors-dry-dog-food",
      "description": "Give your pup the nutrition and flavor he loves with the Kibbles 'n Bits Original Savory Beef & Chicken Flavors Dry Dog Food. This formula packs plenty of meaty taste into a blend of crunchy kibble and soft meaty bits made with the flavors of beef and chicken. It’s loaded with high-quality protein to help support strong muscles, plus vitamins, minerals and antioxidants so it’s a complete and balanced diet for adults. Plus, it’s proudly made in the USA so it’s a satisfying meal you can feel good about serving your dog every day!\n\n",
      "quantity": 80,
      "sold": 0,
      "price": 26.83,
      "priceAfterDiscount": 25.49,
      "colors": [],
      "imageCover": "https://yofakestoreapi.onrender.com//products/product-843c9047-6b04-41ef-8006-c649a9717976-1673301569183-cover.jpeg",
      "images": [
        "https://yofakestoreapi.onrender.com//products/product-0cfe07c8-2f7e-460c-9ce0-3f405e6fea95-1673301571031-4.jpeg",
        "https://yofakestoreapi.onrender.com//products/product-86670577-2138-4e16-b405-0b4757a67293-1673301571030-1.jpeg",
        "https://yofakestoreapi.onrender.com//products/product-0d83e714-47b7-4b01-8126-8d9be261f7fe-1673301571031-3.jpeg",
        "https://yofakestoreapi.onrender.com//products/product-998a7b86-fb60-4299-a5ca-895906919a58-1673301571030-2.jpeg"
      ],
      "category": {
        "name": "Dog Food"
      },
      "subcategories": [],
      "ratingsQuantity": 0,
      "createdAt": "2023-01-09T21:59:39.954Z",
      "updatedAt": "2023-01-09T21:59:39.954Z",
      "id": "63bc8e4b3e721990a8cc5089"
    }
    // ..
  ]
}
```

## Filter results

To Filter results the API needs to be called with the `ratingsAverage[gte]` set number that you want

```bash
[GET] https://yofakestoreapi.onrender.com/api/products/?ratingsAverage[gte]=1.6
```

```json
{
  "page": 1,
  "result": 16,
  "data": [
    {
      "_id": "636e6bef6c34aa33724e6cd9",
      "title": "Mens Cotton Jacket",
      "slug": "mens-cotton-jacket",
      "description": "great outerwear jackets for Spring/Autumn/Winter, .........",
      "quantity": 20,
      "sold": 75,
      "price": 55.99,
      "colors": [],
      "category": {
        "_id": "636e61a8aa2719937c3cf0dc",
        "name": "Men's Clothing"
      },
      "subcategories": [],
      "ratingsAverage": 4,
      "ratingsQuantity": 70,
      "createdAt": "2022-11-11T15:36:15.688Z",
      "updatedAt": "2022-11-11T15:36:15.688Z"
    }
  ]
  // ...
}
```

## Field Limiting

To Field Limiting the API needs to be called with the `fields` set attribute that you want to display

```bash
[GET] https://yofakestoreapi.onrender.com/api/products/?fields=title,price
```

```json
{
  "results": 2,
  "paginationResult": {
    "currentPage": 1,
    "limit": 50,
    "numberOfPages": 1
  },
  "data": [
    {
      "_id": "63bc8d063e721990a8cc5085",
      "title": "Pedigree Complete Nutrition Grilled Steak & Vegetable Flavor Dog Kibble Adult Dry Dog Food",
      "price": 27.78,
      "category": {
        "name": "Dog Food"
      },
      "id": "63bc8d063e721990a8cc5085"
    }
    // ..
  ]
}
```

## Product Schema

| Attribute          | Type     |
| ------------------ | -------- |
| title              | string   |
| slug               | string   |
| description        | string   |
| quantity           | Number   |
| price              | Number   |
| sold               | Number   |
| priceAfterDiscount | Number   |
| Colors             | arrays   |
| imageCover         | string   |
| images             | images   |
| category           | ObjectId |
| subcategories      | ObjectId |
| brand              | ObjectId |
| ratingsAverage     | Number   |
| ratingsAverage     | Number   |
| ratingsQuantity    | Number   |
| shipping           | Boolean  |

---

## Reviews

#### Endpoints for Reviews

---

Review Routes:

| @Route                           | @Type  | @access               | @desc                                  |
| -------------------------------- | ------ | --------------------- | -------------------------------------- |
| /api/reviews/                    | POST   | Private/Protect       | Add new Review                         |
| /api/reviews/:reviewId           | PUT    | Private/Protect       | Update specific review                 |
| /api/reviews/:reviewId           | DELETE | Private/Protect/Admin | Delete specific review                 |
| /api/reviews/?page=2&limit=1     | GET    | Public                | Get List of reviews                    |
| /api/reviews/:reviewId           | GET    | Public                | Get specific review                    |
| /api/products/:productId/reviews | GET    | Public                | Get all reviews on specifique products |

## Add new Review

You can create a new review by sending an object like the following to `/api/reviews/` endpoint.

```
[GET] https://yofakestoreapi.onrender.com/api/reviews
```

```json
{
  "title": "Good Product",
  "ratings": 4,
  "product": "63adace3279142448c05b4fb"
}
```

## Update a review

you can update review exists by sending an object like the following and adding the `id` as a parameter: `/api/reviews/{id}`

```bash
[PUT] https://yofakestoreapi.onrender.com/api/reviews/{reviewId}
```

```json
{
  "title": "updating Reviews",
  "ratings": 5
}
```

> Note that it is not necessary to send all review attributes, just send the attributes that want to update.

## Delete specific review

You can delete specific review by adding the `id` as a parameter: `/api/reviews/{id}`

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/reviews/{reviewId}
```

```json
status : 204 No Content
```

## Get specific review

You can get specific review by adding the `id` as a parameter: `/api/reviews/{id}`

```bash
[GET] https://yofakestoreapi.onrender.com/api/reviews/{reviewId}
```

```json
{
  "data": {
    "_id": "63aec38300b84ab23dbf222d",
    "title": "Good Product",
    "ratings": 4,
    "user": {
      "_id": "63a9b1b28fbd8a25a5202f58",
      "name": "Emma"
    },
    "product": "63adad1c279142448c05b4ff",
    "createdAt": "2022-12-30T10:54:59.146Z",
    "updatedAt": "2022-12-30T10:54:59.146Z"
  }
}
```

## Get List of reviews

You can access the list of reviews by using the `/api/reviews` endpoint.

```bash
[GET] https://yofakestoreapi.onrender.com/api/reviews
```

```json
{
  "page": 1,
  "result": 7,
  "data": [
    {
      "_id": "63aec39f00b84ab23dbf2236",
      "title": "Good Product",
      "ratings": 5,
      "user": {
        "_id": "63a9b1b28fbd8a25a5202f58",
        "name": "Emma"
      },
      "product": "63adace3279142448c05b4fb",
      "createdAt": "2022-12-30T10:55:27.679Z",
      "updatedAt": "2022-12-30T10:55:55.834Z"
    }
    // ...
  ]
}
```

## Get all reviews on specifique products

You can access the list of reviews on specifique products by using the `/api/{productId}/reviews` endpoint.

```bash
[GET] https://yofakestoreapi.onrender.com/api/{productId}/reviews
```

```json
{
  "result": 2,
  "data": [
    {
      "_id": "63aec1dff1a585ce1a2cd108",
      "title": "Bad Product",
      "ratings": 2,
      "user": {
        "_id": "63aead724ba368735b49ae67",
        "name": "KvnHart"
      },
      "product": "63adace3279142448c05b4fb",
      "createdAt": "2022-12-30T10:47:59.701Z",
      "updatedAt": "2022-12-30T10:47:59.701Z",
      "__v": 0
    }
    // ...
  ]
}
```

## Review Schema

Review Schema:

| Attribute | Type     |
| --------- | -------- |
| title     | string   |
| ratings   | Number   |
| user      | ObjectId |
| product   | ObjectId |

---

## Wishlist

#### Endpoints for Wishlist

---

Wishlist Routes:

| @Route                    | @Type  | @access      | @desc                        |
| ------------------------- | ------ | ------------ | ---------------------------- |
| /api/wishlist/            | POST   | Private/User | Add Product To Wishlist      |
| /api/wishlist/:ProductId/ | DELETE | Private/User | Remove Product From Wishlist |
| /api/wishlist/            | GET    | Private/User | Get Logged User Wishlist     |

## Add Product To Wishlist

You can add Product To Wishlist by sending an object like the following to `/api/wishlist/` endpoint.

```
[POST] https://yofakestoreapi.onrender.com/api/wishlist
```

```json
{
  "product": "63ada0558394679ebc49646f"
}
```

## Remove Product From Wishlist

You can Remove Product From Wishlist by adding the `id` as a parameter: `/api/wishlist/{id}`

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/wishlist/{productId}
```

```json
{
  "status": "success",
  "message": "Product removed successfully from your wishlist.",
  "data": ["63adace3279142448c05b4fb", "63ada0558394679ebc49646f"]
}
```

## Get Logged User Wishlist

You can access the list of User Wishlist by using the `/api/wishlist` endpoint.

```
[GET] https://yofakestoreapi.onrender.com/api/wishlist
```

```json
{
  "status": "success",
  "results": 2,
  "data": [
    {
      "_id": "63adace3279142448c05b4fb",
      "title": "Big Chill Women's Wrap Fleece Jacket",
      "slug": "big-chill-women's-wrap-fleece-jacket",
      "description": "Fleece is not only for athleisure! ..........",
      "quantity": 3,
      "sold": 0,
      "price": 44.96,
      "priceAfterDiscount": 14.99,
      "colors": [],
      "imageCover": "product-3eed9312-8a1f-4a9c-b4a2-ce5a652d5f5c-1672326370700-cover.jpeg",
      "images": [
        "product-ca74c168-ea0b-49b8-aa02-c695b7509d4f-1672326370887-2.jpeg",
        "product-f90b50d4-a784-4ea9-9ae4-4c48bdd6d49a-1672326370884-1.jpeg"
      ],
      "category": {
        "_id": "636e64579569c30b4ef8de53",
        "name": "Women's Clothing"
      },
      "subcategories": [],
      "ratingsQuantity": 2,
      "createdAt": "2022-12-29T15:06:11.655Z",
      "updatedAt": "2022-12-30T10:55:55.852Z",
      "__v": 0,
      "ratingsAverage": 3.5
    }
    // ...
  ]
}
```

---

## Addresses

#### Endpoints for Addresses

---

Addresses Routes:

| @Route                      | @Type  | @access      | @desc                                   |
| --------------------------- | ------ | ------------ | --------------------------------------- |
| /api/addressess/            | POST   | Private/User | Add address to user addresses list      |
| /api/addressess/:addressId/ | DELETE | Private/User | Remove address from user addresses list |
| /api/addressess/            | GET    | Private/User | Get logged user addresses list          |

## Add address to user addresses list

You can Add address to user addresses list by sending an object like the following to `/api/addressess/` endpoint.

```
[POST] https://yofakestoreapi.onrender.com/api/addressess
```

```json
{
  "alias": "Home",
  "details": "985 Pinnickinnick Street",
  "phone": "615-827-2462",
  "city": "Sayreville",
  "postalCode": "08872"
}
```

## Remove address from user addresses list

You can Remove address from user addresses list by adding the `id` as a parameter: `/api/addressess/{id}`

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/addressess/{addressId}
```

```json
{
  "status": "success",
  "message": "Address removed successfully.",
  "data": [
    {
      "alias": "Home",
      "details": "985 Pinnickinnick Street",
      "phone": "615-827-2462",
      "city": "Sayreville",
      "postalCode": "08872",
      "_id": "63b045fbdd839ae49bd78e5f"
    }
    // ..
  ]
}
```

## Get logged user addresses list

You can access the list of addresses by using the `/api/addressess` endpoint.

```
[GET] https://yofakestoreapi.onrender.com/api/addressess
```

```json
{
  "status": "success",
  "results": 2,
  "data": [
    {
      "alias": "Home",
      "details": "985 Pinnickinnick Street",
      "phone": "615-827-2462",
      "city": "Sayreville",
      "postalCode": "08872",
      "_id": "63b045fbdd839ae49bd78e5f"
    }
    // ..
  ]
}
```

---

## Coupon

#### Endpoints for Coupon

---

Coupon Routes:

| @Route            | @Type  | @access       | @desc                  |
| ----------------- | ------ | ------------- | ---------------------- |
| /api/coupons/     | POST   | Private/Admin | Create Coupon          |
| /api/coupons/:id/ | PUT    | Private/Admin | Update specific Coupon |
| /api/coupons/:id/ | DELETE | Private/Admin | Delete specific Coupon |
| /api/coupons/     | GET    | Public        | Get All Coupons        |
| /api/coupons/:id/ | GET    | Public        | Get specific Coupon    |

## Create Coupon

You can Create Coupon by sending an object like the following to `/coupons/`

```bash
[POST] https://yofakestoreapi.onrender.com/api/coupons/
```

```json
{
  "name": "HAPPY20",
  "expire": "2021/12/01",
  "discount": 30
}
```

## Update specific coupon

You can Update specific coupon by sending an object like the following and adding the `id` as a parameter: `/coupons/{id}`

```bash
[PUT] https://yofakestoreapi.onrender.com/api/coupons/{couponId}
```

```json
{
  "discount": 10
}
```

> Note that it is not necessary to send all coupon attributes, just send the attributes that want to update.

## Delete specific coupon

You can Delete specific coupon by adding the `id`as a parameter: `/api/coupons/{id}`

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/coupons/{couponId}
```

```json
status : 204 No Content
```

## Get list of coupons

You can access the list of coupons by using the `/api/coupons` endpoint.

```bash
[GET] https://yofakestoreapi.onrender.com/api/coupons
```

```json
{
  "page": 1,
  "result": 3,
  "data": [
    {
      "_id": "63b0552c3fb00490d0b7d573",
      "name": "HAPPY20",
      "expire": "2021-11-30T23:00:00.000Z",
      "discount": 20,
      "createdAt": "2022-12-31T15:28:44.651Z",
      "updatedAt": "2022-12-31T15:28:44.651Z"
    }
    // ..
  ]
}
```

## Get specific coupon

You can get specific coupon by adding the `id` as a parameter: `/api/coupons/{id}`

```bash
[GET] https://yofakestoreapi.onrender.com/api/coupons/{couponId}
```

```json
{
  "data": {
    "_id": "63b0552c3fb00490d0b7d573",
    "name": "HAPPY20",
    "expire": "2021-11-30T23:00:00.000Z",
    "discount": 20,
    "createdAt": "2022-12-31T15:28:44.651Z",
    "updatedAt": "2022-12-31T15:28:44.651Z",
    "__v": 0
  }
}
```

## Coupon Schema

| Attribute | Type   |
| --------- | ------ |
| name      | string |
| discount  | Number |
| expire    | Date   |

---

## Cart

#### Endpoints for Cart

---

Cart Routes:

| @Route                | @Type  | @access      | @desc                         |
| --------------------- | ------ | ------------ | ----------------------------- |
| /api/cart/            | POST   | Private/User | Add product to cart           |
| /api/cart/            | GET    | Private/User | Get logged user cart          |
| /api/cart/:itemId/    | DELETE | Private/User | Remove specific cart item     |
| /api/cart/            | DELETE | Private/User | Clear logged user cart        |
| /api/cart/:itemId/    | PUT    | Private/User | Update cart item quantity     |
| /api/cart/applyCoupon | PUT    | Private/User | Apply coupon on shopping cart |

## Add product to cart

You can Add product to cart by sending an object like the following to `/cart/`

```bash
[POST] https://yofakestoreapi.onrender.com/api/cart/
```

```json
{
  "productId": "636e6bef6c34aa33724e6cdd",
  "color": "Black"
}
```

## Get logged user cart

```bash
[GET] https://yofakestoreapi.onrender.com/api/cart
```

```json
{
  "status": "success",
  "numOfCartItems": 2,
  "data": {
    "_id": "63b08822a8808232467c2993",
    "cartItems": [
      {
        "product": "636e6bef6c34aa33724e6cdd",
        "quantity": 1,
        "color": "Black",
        "price": 9.99,
        "_id": "63b08822a8808232467c2994"
      }
      // ...
    ],
    "user": "63aeed564a116b073bc4d0cf",
    "createdAt": "2022-12-31T19:06:10.762Z",
    "updatedAt": "2022-12-31T19:11:18.797Z",
    "__v": 1
  }
}
```

## Update specific cart

You can Update specific coupon by sending an object like the following and adding the `id` as a parameter: `/cart/{id}`

```bash
[PUT] https://yofakestoreapi.onrender.com/api/cart/{itemId}
```

```json
{
  "quantity": 2
}
```

## Remove specific cart item

You can remove Specific Cart Item by adding the `id`as a parameter: `/api/cart/{id}`

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/cart/{itemId}
```

## Clear logged user cart

```bash
[DELETE] https://yofakestoreapi.onrender.com/api/cart/
```

## Apply Coupon On Shopping Cart

You can Apply Coupon On Shopping Cart by sending an object like the following

```bash
[PUT] https://yofakestoreapi.onrender.com/api/cart/applyCoupon
```

```json
{
  "coupon": "HAPPY24"
}
```

## Cart Schema

| Attribute               | Type   |
| ----------------------- | ------ |
| cartItems               | arrays |
| totalCartPrice          | Number |
| totalPriceAfterDiscount | Number |
