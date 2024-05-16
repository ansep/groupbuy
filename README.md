# Group Buy
Group project for Laboratory of Advanced Programming at Sapienza University

Link to user stories spreadsheet: https://docs.google.com/spreadsheets/d/1GdNLgZRrfuZ5uAR3s8YT4Wfu3lsXiVNEBoZCZP2jxYA/edit?usp=sharing

Link to one of the biggest Agile experts explaining how to write user stories: https://www.mountaingoatsoftware.com/agile/user-stories

## Notes on running the docker compose
Simply run

```docker compose up --no-deps --build```

when you are done with the process simply run

```docker compose down```

and again the command above to reset the containers from scratch


## REST API Endpoints
- `POST /api/auth/signin` for obtaining the JWT Bearer Token to use for authentication (unauthenticated)
```
{
    "username": "leonardo",
    "password": "password123"
}
```
- `POST /api/auth/signup` for signing up a new user (unauthenticated)
```
{
    "username": "leonardo",
    "email": "leonardo.idone@gmail.com",
    "password": "password123",
    "firstName": "Leonardo",
    "lastName": "Idone",
    "telephoneNumber": "3468553816",
    "role": ["BUYER"]
}
```
- `PATCH /api/user` to edit a user's information, all fields are optional (authentication required)
```
{
    "email": "newmail@mail.com",
    "firstName": "Mario",
    "lastName": "Rossi",
    "telephoneNumber": "1234567890"
}
```
- `POST /api/user/picture` as form-data file to post a profile picture (authentication required)
- `GET /api/user/{id}/picture` to get user profile picture as attachment (unauthenticated)
