# My Ecommerce Software Requirements

Goals : Build Fake Store API that can be used with any type project that needs products, categories, authentication and users. you can use examples below to check how fakeStoreApi works!

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

<!--

## ToDo:

- Password forgot/reset, confirmation email on signup
- Credit card payment with stripe
- Cash on delivery (no online payment required)

## Database

All the models can be found in the models directory created using mongoose.





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
[GET] https://localhost:3000/api/users
```

```json
[
  {
    "_id": "6362a1793b0236acba300bad",
    "name": "Jhon",
    "email": "john@mail.com",
    "password": "$2b$10$CW5dB3.zTAYgOTolpHG2Geswre.bt4TdXGkdrTGyHpytv5RNXFEZi",
    "role": 0,
    "createdAt": "2022-11-02T16:57:29.319Z",
    "updatedAt": "2022-11-22T21:01:17.949Z"
  }
  // ...
]
```

## Get a single user

You can get a single user by adding the `id` as a parameter: `/api/users/{id}`

```bash
[GET] https://localhost:3000/api/users/{userId}
```

```json
{
  "_id": "6362a1793b0236acba300bad",
  "name": "Jhon",
  "email": "john@mail.com",
  "password": "$2b$10$CW5dB3.zTAYgOTolpHG2Geswre.bt4TdXGkdrTGyHpytv5RNXFEZi",
  "role": 0,
  "createdAt": "2022-11-02T16:57:29.319Z",
  "updatedAt": "2022-11-22T21:01:17.949Z"
}
```

## Create a user

You can create a new user by sending an object like the following to `/api/users/`

```bash
[POST] https://localhost:3000/api/users/
```

```json
{
  "name": "Jhon",
  "email": "john@mail.com",
  "password": "123456"
}
```

> Note that the password will be encrypted.

## Update a user

You can update a user exists by sending an object like the following and adding the `id` as a parameter: `/api/users/{id}`

```bash
[PUT] https://localhost:3000/api/users/{userId}
```

```json
{
  "email": "john@mail.com",
  "name": "Change name"
}
```

> Note that it is not necessary to send all user attributes, just send the attributes that want to update.

## Delete a user

You can delete a user exists by adding the `id` as a parameter: `/api/users/{id}`

```bash
[DELETE] https://localhost:3000/api/users/{userId}
```

```json
status : 204 No Content
```

## Change Password

You can change password of any user exists by sending an object like the following and adding the `id` as a parameter: `/api/users/changeMyPassword/{id}`

```bash
[PUT] https://localhost:3000/api/users/changeMyPassword/63a5e987577e750d00acd787
```

```json
{
  "currentPassword": "123456",
  "password": "1234",
  "passwordConfirm": "1234"
}
```

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
[GET] https://localhost:3000/api/users/getMe
```

```json
{
  "_id": "63a8803af43c0858d3f535e3",
  "name": "Kvn",
  "email": "kvn@gmail.com",
  "password": "$2b$10$n7dykMNDae9Eu/0IGO/CZ./jq5MfYjuaWqypPRZr.xO2L9sjABxdG",
  "role": "user",
  "active": true
}
```

## Update Logged User

You can update logged user by sending an object like the following

```bash
[PUT] https://localhost:3000/api/users/updateMe
```

```json
{
  "name": "KvnHart",
  "email": "KvnHart@gmail.com"
}
```

## Deactivate Logged Users

```bash
[DELETE] https://localhost:3000/api/users/deleteMe
```

## Activate Logged Users

```bash
[PUT] https://localhost:3000/api/users/activeMe
```

## Authentication

#### Endpoints for Authentication

---

Auth Routes:

| @Route           | @Type | @access      | @desc                       |
| ---------------- | ----- | ------------ | --------------------------- |
| /api/auth/signup | POST  | Public       | create a new user in db     |
| /api/auth/login  | POST  | Public       | authenticate a current user |
| /api/auth/logout | GET   | Private/User | log a user out              |

## Login

You can do login by sending an object like the following to `/auth/login/`

```bash
[POST] https://localhost:3000/api/auth/login
```

```json
{
  "email": "john@mail.com",
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
  "name": "Jhon",
  "email": "john@mail.com",
  "password": "123456"
}
```

## Sign Out

```bash
[GET] https://localhost:3000/api/auth/signout
```

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
[POST] https://localhost:3000/api/categories/
```

```json
{
  "name": "New Category",
  "image": "https://localhost:3000/640/480/test"
}
```

## Update a category

You can update a category exists by sending an object like the following and adding the id as a parameter: `/categories/{id}`

```bash
[PUT] https://localhost:3000/api/categories/{categoryId}
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
[DELETE] https://localhost:3000/api/categories/{categoryId}
```

```json
status : 204 No Content
```

## Get a single category

You can get a single category by adding the `id` as a parameter: `/categories/{id}`

```bash
[GET] https://localhost:3000/api/categories/${id}
```

```json
{
  "data": {
    "_id": "636e61a8aa2719937c3cf0dc",
    "name": "Men's Clothing",
    "slug": "men's-clothing",
    "createdAt": "2022-11-11T14:52:24.938Z",
    "updatedAt": "2022-11-11T14:52:24.938Z"
  }
}
```

## Get all categories

You can access the list of categories by using the `/categories` endpoint.

```bash
[GET] https://localhost:3000/api/categories/
```

```json
{
  "data": {
    "_id": "636e61a8aa2719937c3cf0dc",
    "name": "Men's Clothing",
    "slug": "men's-clothing",
    "createdAt": "2022-11-11T14:52:24.938Z",
    "updatedAt": "2022-11-11T14:52:24.938Z"
  }
}
// ...
```

## Get all products by category

You can access the list of products by using the `/categories/{categoryId}/products` endpoint.

```bash
[GET] https://localhost:3000/api/categories/{categoryId}/products
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
[POST] https://localhost:3000/api/categories/
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
[PUT] https://localhost:3000/api/subcategories/{subCategoryId}
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
[DELETE] https://localhost:3000/api/subcategories/{categoryId}
```

```json
status : 204 No Content
```

## Get all Sub-Categories

You can access the list of subcategories by using the `/subcategories` endpoint.

```bash
[GET] https://localhost:3000/api/subcategories/
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
[GET] https://localhost:3000/api/categories/${id}
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
[GET] https://localhost:3000/api/categories/${categoryId}/subcategories
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
[POST] https://localhost:3000/api/categories/${categoryId}/subcategories/
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
[POST] https://localhost:3000/api/brands/
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
[PUT] https://localhost:3000/api/subcategories/{brandId}
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
[DELETE] https://localhost:3000/api/brands/{brandId}
```

```json
status : 204 No Content
```

## Get List of Brands

You can access the list of brands by using the `/brands` endpoint.

```bash
[GET] https://localhost:3000/api/brands/
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
[GET] https://localhost:3000/api/categories/${id}
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
[GET] https://localhost:3000/api/products
```

```json
{
  "title": "Big Chill Women's Wrap Fleece Jacket",
  "description": "Fleece is not only for athleisure! Get a sophisticated style upgrade to your standard .............",
  "quantity": 3,
  "sold": 0,
  "price": 44.96,
  "priceAfterDiscount": 14.99,
  "imageCover": "product-9ee766fa-2eb1-47b5-9c3f-94fc483bdcb3-1672326428001-cover.jpeg",
  "images": [
    "product-008610d3-0044-45b3-8e3a-8b886abcd130-1672326428159-2.jpeg",
    "product-519c8e4a-887b-4463-b0f5-932943ac7498-1672326428158-1.jpeg"
  ],
  "category": "636e64579569c30b4ef8de53",
  "ratingsQuantity": 0
}
```

## Update a product

you can update a product exists by sending an object like the following and adding the `id` as a parameter: `/api/products/{id}`

```bash
[PUT] https://localhost:3000/api/products/{productsId}
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
[DELETE] https://localhost:3000/api/products/{productrId}
```

```json
status : 204 No Content
```

## Get a single product

You can get a single product by adding the `id` as a parameter: `/api/products/{id}`

```bash
[GET] https://localhost:3000/api/products/{productId}
```

```json
{
  "data": {
    "_id": "636e6bef6c34aa33724e6cdb",
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "slug": "john-hardy-women's-legends-naga-gold-and-silver-dragon-station-chain-bracelet",
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
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
    "updatedAt": "2022-12-20T12:12:03.570Z",
    "__v": 0
  }
}
```

## Get all products

You can access the list of 200 products by using the `/api/products` endpoint.

```bash
[GET] https://localhost:3000/api/products
```

```json
{
  "page": 1,
  "result": 200,
  "data": [
    {
      "_id": "63adad1c279142448c05b4ff",
      "title": "Big Chill Women's Wrap Fleece Jacket",
      "slug": "big-chill-women's-wrap-fleece-jacket",
      "description": "Fleece is not only for athleisure.......................",
      "quantity": 3,
      "sold": 0,
      "price": 44.96,
      "priceAfterDiscount": 14.99,
      "colors": [],
      "category": {
        "_id": "636e64579569c30b4ef8de53",
        "name": "Women's Clothing"
      },
      "ratingsQuantity": 0,
      "createdAt": "2022-12-29T15:07:08.918Z",
      "updatedAt": "2022-12-29T15:07:08.918Z"
    }
  ]
  // ...
}
```

## Get Related Products

You can get related product by adding the `/api/products/related/{id}` endpoint.

```bash
[GET] https://localhost:3000/api/products/related/{productId}
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
[GET] https://localhost:3000/api/products/search
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
[GET] https://localhost:3000/api/products/?keyword=Clark,Olsen
```

```json
{
  "page": 1,
  "result": 16,
  "data": [
    {
      "_id": "63adad1c279142448c05b4ff",
      "title": "Big Chill Women's Wrap Fleece Jacket",
      "slug": "big-chill-women's-wrap-fleece-jacket",
      "description": "Fleece is not only for athleisure! .................",
      "quantity": 3,
      "sold": 0,
      "price": 44.96,
      "priceAfterDiscount": 14.99,
      "colors": [],
      "category": {
        "_id": "636e64579569c30b4ef8de53",
        "name": "Women's Clothing"
      },
      "subcategories": [],
      "ratingsQuantity": 0,
      "createdAt": "2022-12-29T15:07:08.918Z",
      "updatedAt": "2022-12-29T15:07:08.918Z"
    }
  ]
  // ...
}
```

## Filter results

To Filter results the API needs to be called with the `ratingsAverage[gte]` set number that you want

```bash
[GET] https://localhost:3000/api/products/?ratingsAverage[gte]=1.6
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
[GET] https://localhost:3000/api/products/?fields=title,price
```

```json
{
  "page": 1,
  "result": 16,
  "data": [
    {
      "_id": "63adad1c279142448c05b4ff",
      "title": "Big Chill Women's Wrap Fleece Jacket",
      "price": 44.96
    }
  ]
  // ...
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
[GET] https://localhost:3000/api/reviews
```

```json
{
  "title": "Good Product",
  "ratings": 4,
  "product": "63adace3279142448c05b4fb"
}
```

## Update a product

you can update review exists by sending an object like the following and adding the `id` as a parameter: `/api/reviews/{id}`

```bash
[PUT] https://localhost:3000/api/reviews/{reviewId}
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
[DELETE] https://localhost:3000/api/reviews/{reviewId}
```

```json
status : 204 No Content
```

## Get specific review

You can get specific review by adding the `id` as a parameter: `/api/reviews/{id}`

```bash
[GET] https://localhost:3000/api/reviews/{reviewId}
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
[GET] https://localhost:3000/api/reviews
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
[GET] https://localhost:3000/api/{productId}/reviews
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
[GET] https://localhost:3000/api/wishlist
```

```json
{
  "product": "63ada0558394679ebc49646f"
}
```

## Remove Product From Wishlist

You can Remove Product From Wishlist by adding the `id` as a parameter: `/api/wishlist/{id}`

```bash
[DELETE] https://localhost:3000/api/wishlist/{reviewId}
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
[GET] https://localhost:3000/api/wishlist
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
