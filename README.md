# Pharmacy App :

## Api Endpoints :

| Route | Description |
|---|---|
| / | Front end |
| /api | Api endpoints |
| /api/auth | Authentication endpoints |
| /api/products | Products endpoints |


### /api/auth :

| Method | Endpoint | Payload | Returns |
|---|---|---|---|
| GET | / | | UserData |
| POST | /login | username, password | UserData |
| POST | /register | username, password, email, firstname, lastname, password2 | user_id |
| GET | /logout |  |  |

```
UserData = {
    id,
    username,
    firstname,
    lastname,
    is_admin,
    email,
    created_date
}
```


### /api/products :

| Method | Endpoint | Payload | Returns |
|---|---|---|---|
| GET | / | page | List of ProductData |
| GET | /:id | id | ProductDataWithDetails |
| POST | / | title, price, unitesInStock, [description] |  |
| PUT | /:id | title, price, unitesInStock, [description] |  |
| DELETE | /:id |  |  |
| POST | /:id/images | image |  |
| DELETE | /:id/images/:id |  |  |