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
| POST | /login | username, password | UserData |
| POST | /register | username, password, email, firstname, lastname, password2 | user_id |
| GET | /logout |  |  |

```
UserData = {
    id,
    username,
    firstname,
    lastname,
    email,
    created_date
}
```