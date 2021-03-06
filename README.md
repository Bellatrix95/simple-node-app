
# SIMPLE SHOPPING APP

(NOTE) Simple backend application for handling shopping lists. It's created using NodeJS and MongoDB as an operational database.

## How to run the application

To run application run command `docker-compose up --build -d`.

## Tests

To run the tests:
- create environment variable `MONGODB_CONNECTION_STRING` that contains MongoDB URI,
- npm install
- npm run test

## Auth

On login, each user gets JWT token that can be used to gain access for other routes (only `\register` and `\login` are public)
The token should be put in the Headers as Authorization Bearer {token value}.


# `Simple Node App` API docs #


## Routes ##
| Route | Description 
| ---- | ---- 
| **POST** `/register` | Create new user
| **POST** `/login` | Login with new user to get `token`
| **PUT** `/change_password/` | Change password
|  **DELETE** [`/delete_user/:email` | Delete user by email (Used for running tests)


# Shopping List API docs #

## Routes ##
| Route | Description 
| ---- | ---- 
| **GET** `/shopping_list` | Get users shopping lists
| **GET** `/shopping_list/aggregation` | Get all products and their quantity
| **POST** `/shopping_list` | Create new shopping list
| **PUT** `/shopping_list/:id` | Update shopping list info
| **DELETE** `/shopping_list/:id` | Delete shopping list

## User routes description ##

### POST `/register` - Body parameters ###
| Parameter | Data type | Mandatory | Description 
| -----  | -----  | -----   | ----- 
| email | string | yes | User email
| password | string | yes | User password

#### Response ####
| HTTP Status Code | App Error Code | Description | Response body 
| -----  | -----  | -----   | ----- 
| 200 | | New user created| {message: 'Successfully registered, sign in to continue!'}
| 400 | 400 | In case of an error | {message: 'Error occurred, please try again!'}

### POST `/login` - Body parameters ###
| Parameter | Data type | Mandatory | Description 
| -----  | -----  | -----   | ----- 
| email | string | yes | User email
| password | string | yes | User password

#### Response ####
| HTTP Status Code | App Error Code | Description | Response body 
| -----  | -----  | -----   | ----- 
| 200 | | User logged in | {"message": "Login successful!", "token": "***"}
| 400 | 400 | In case of an error | {message: 'Error occured, please try again!'}
| 400 | 400 | Password does not match | {message: 'Login failed, the password does not match!'}
| 400 | 400 | User not found | {message: "Login failed, user not found!"}

### PUT `/change_password` - Body parameters ###
| Parameter | Data type | Mandatory | Description 
| -----  | -----  | -----   | ----- 
| currentPassword | string | yes | User's current password
| newPassword | string | yes | User's new password

#### Response ####
| HTTP Status Code | App Error Code | Description | Response body 
| -----  | -----  | -----   | ----- 
| 200 | | Password changed | {message: 'Successfully changed password!'}
| 400 | 400 | In case of an error | {message: 'Error occurred, please try again!'}
| 400 | 400 | New password can not be your old password | {message: 'New password can not be your old password!'}
| 400 | 400 | Authentication failed | {message: 'Current password does not match!'}

### DELETE `/delete_user/:email` - Body parameters ###
| Parameter | Data type | Mandatory | Description 
| -----  | -----  | -----   | ----- 
|  |  |  | 

#### Response ####
| HTTP Status Code | App Error Code | Description | Response body 
| -----  | -----  | -----   | ----- 
| 200 | | User deleted | {message: 'User deleted!'}
| 400 | 400 | In case of an error | {message: 'Error occurred, please try again!'}


## Shopping lists routes description ##

### GET `/shopping_list` - Body parameters ###
| Parameter | Data type | Mandatory | Description 
| -----  | -----  | -----   | ----- 
|  |  |  | 

#### Response ####
| HTTP Status Code | App Error Code | Description | Response body 
| -----  | -----  | -----   | ----- 
| 200 | | New user created | { "user_lists": [{ "_id": "5eee79f62fcdce001d93c4d1", "name": "my Shopping list", "products": [{ "quantity": 2, "_id": "5eee79f62fcdce001d93c4d2", "name": "product1"} ], "createdAt": "2020-06-21T00:00:00.000Z", "userId": "5eee79bb2fcdce001d93c4d0"} ]}
| 400 | 400 | In case of an error | {message: 'Error occurred, please try again!'}

### POST `/shopping_list` - Body parameters ###
| Parameter | Data type | Mandatory | Description 
| -----  | -----  | -----   | ----- 
| name | string | yes | Shopping list name
| createdAt | date | no | Datetime when was list created
| products | array of objects | yes | List of product objects that contain `name` and `quantity`

#### Response ####
| HTTP Status Code | App Error Code | Description | Response body 
| -----  | -----  | -----   | ----- 
| 200 | | Create new shopping list | {"message": "New list \"my Shopping list\" created!", "list": {"_id": "5eee79f62fcdce001d93c4d1","name": "my Shopping list","products": [ {"quantity": 2,"_id": "5eee79f62fcdce001d93c4d2","name": "product1" }],"createdAt": "2020-06-21T00:00:00.000Z","userId": "5eee79bb2fcdce001d93c4d0" }}
| 400 | 400 | In case of an error | {message: 'Error occurred, please try again!'}
| 400 | 400 | Error when list name isn't unique | {message: 'Shopping list name is not unique!'}


### PUT `/shopping_list/:id` - Body parameters ###
| Parameter | Data type | Mandatory | Description 
| -----  | -----  | -----   | ----- 
| products | array of objects | no | New list of products
| name | string | no | New list name

#### Response ####
| HTTP Status Code | App Error Code | Description | Response body 
| -----  | -----  | -----   | ----- 
| 200 | | Shopping list updated | {message: 'List updated!'}
| 400 | 400 | In case of an error | {message: 'Error occurred, please try again!'}
| 400 | 400 | There is no data sent | { message: 'Body is empty!' }
| 400 | 400 | This list doesn't belong to logged in user | {message: 'This list does not belong to you!' }
| 400 | 400 | Shopping list not found | {message: "Shopping list not found!"}
| 400 | 400 | Name is already taken | {message: "Shopping list name already exists!"}

### DELETE `/shopping_list/:id` - Body parameters ###
| Parameter | Data type | Mandatory | Description 
| -----  | -----  | -----   | ----- 
|  |  |  | 

#### Response ####
| HTTP Status Code | App Error Code | Description | Response body 
| -----  | -----  | -----   | ----- 
| 200 | | Shopping list deleted | {message: 'List deleted!'}
| 400 | 400 | In case of an error | {message: 'Error occurred, please try again!'}


### DELETE `/shopping_list/aggregate` - Route parameters ###
| Parameter | Data type | Mandatory | Description 
| -----  | -----  | -----   | ----- 
| from | date | yes | Time range parameter
| to | date | yes | Time range parameter

#### Response ####
| HTTP Status Code | App Error Code | Description | Response body 
| -----  | -----  | -----   | ----- 
| 200 | | Returns list of products and their quantities for logged in user | {"aggregation_result": []}
| 400 | 400 | In case of an error | {message: "Aggregation failed!"}
| 400 | 400 | Range parameters are not valid | {message: "Range parameters are not valid!"}