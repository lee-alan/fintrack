# FinTrack REST API Documentation

## Signup / Signin

- description: Sign up a new user
- request: `POST api/user/signup/`
  - content-type: `application/json`
  - body: object
    - username: (string) unique username
    - email: email for user (must be unique)
    - password: (string) password for user
- response: 200
  - content-type: `application/json`
  - body: (string) username that was created

```
$ curl -X POST
       -H "Content-Type: `application/json`"
       -d '{"username":"me","password":"pass"}
       http://localhost:3000/api/user/signup/'
```

- description: Sign in as existing user
- request: `POST /api/user/signin/`
  - content-type: `application/json`
  - body: object
    - username: (string) unique username
    - password: (string) password for user
- response: 200
  - content-type: `application/json`
  - body: (string) username that signed in

```
$ curl -X POST
       -H "Content-Type: `application/json`"
       -d '{"username":"me","password":"pass"}
       -c cookie.txt
       http://localhost:3000/api/user/signin/'
```

- description: Sign out of session (destory session)
- request: `POST /api/user/signout/`
- response: 200

```
$ curl -X POST
       -c cookie.txt
       http://localhost:3000/api/user/signout/'
```

---

- description: Enter/update salary information
- request: `PATCH /api/user/profile/salary`
  - content-type: `application/json`
  - body: object
    - salary: (float) income per month
- response: 200

---

- description: Change primary email address
- request: `PATCH /api/user/profile/email`
  - content-type: `application/json`
  - body: object
    - email: (string) unique email to replace one from set up
- response: 200

---

- description: Change user password
- request: `PATCH /api/user/profile/password`
  - content-type: `application/json`
  - body: object
    - username
    - old_password
    - new_password: (string) new Password must be different from old
- response: 200

---

All the below api require a session from the above login api

## Expenses API

### Create

- description: create a new expense
- request: `POST /api/expense/`
  - content-type: `application/json`
  - session
  - body: object
    - username: (string) the username of the user
<<<<<<< Updated upstream
    - category: (string) the category of expense
=======
    - type: (string) the type of expense
>>>>>>> Stashed changes
    - amount: (float) the amount of the expense
    - payment_type: (cash|credit|debit)
    - type: (income|expense)
    - description: (string) description
- response: 200
  - content-type: `application/json`
  - body: object
    - username: (string) the username of the user
    - \_id: (string) the expenses id
    - category: (string) the category of expense
    - amount: (float) the amount of the expense
    - date: (date) date
    - type: (income|expense)
    - payment_type: (cash|credit|debit)
    - description: (string) description

---

### Get Expense

- description: retrieve the expenses that is stored
- request: `GET /api/expense/:id/`
- response: 200
  - content-type: `application/json`
  - body: object
    - username: (string) the username of the user
    - \_id: (string) the expenses id
    - category: (string) the category of expense
    - amount: (float) the amount of the expense
    - date: (date) date
    - payment_type: (cash|credit|debit)
    - type: (income|expense)
    - description: (string) description
- response: 404
  - body: expenses id does not exists

---

- description: retrieve the expenses from page\*limit to page\*limit +1
- request: `GET /api/expense/multiple/:username`
  - request parameters:
  - content-type: `application/json
  - query parameters:
    - page_number: (int) page number (starts with 1)
    - page limit: (int) page limit
    - categories: An array. input [] if you want all categories.
    - payment_types: An array. input [] if you want all payment_types.
    - types: An array. input [] if you want all types.
    - start: mm/dd/yyyy
    - end: mm/dd/yyyy
- response: 200
  - content-type: `application/json`
  - body: list

    - username: (string) the username of the user

    - \_id: (string) the expenses id
    - category: (string) the category of expense
    - amount: (float) the amount of the expense
    - date: (date) date
    - payment_type: (cash|credit|debit)
    - description: (string) description
    
    ```
    $ curl -b cookie.txt -X GET
        localhost:5000/api/expense/multiple/ram11/3?page_number=1&page_limit=10&payment_types=["cash", "debit"]&types=["expense"]&categories=[]&start=01/01/2020&end=03/18/2020
    ```
---

- description: retrieve the expenses from page\*limit to page\*limit +1 in the month, month
- request: `GET /api/expenses/:username/:month`
  - content-type: `application/json
  - query parameters:
    - page_number: (int) page number (starts with 1)
    - page_limit: (int) page limit
    - categories: An array. input [] if you want all categories.
    - payment_types: An array. input [] if you want all payment_types.
    - types: An array. input [] if you want all types.
- response: 200
  - content-type: `application/json`
  - body: list
    - username: (string) the username of the user
    - \_id: (string) the expenses id
    - category: (string) the category of expense
    - amount: (float) the amount of the expense
    - date: (date) date
    - payment_type: (cash|credit|debit)
    - description: (string) description

```
$ curl -b cookie.txt -X GET
       localhost:5000/api/expense/multiple/ram11/3?page_number=1&page_limit=10&payment_types=["cash", "debit"]&types=["expense"]&categories=[]
```

- description: retrieve the expenses from page\*limit to page\*limit +1 in the month, month
- request: `GET /api/expenses/:username/:month/overview`
  - content-type: `application/json
- response: 200
  - content-type: `application/json`
  - body: object
    - total_expenses: (float) sum of all expenses for month
    - total_income: (float) sum of all income for month

### Delete

- description: delete the expenses id and all assosiated comments
- request: `DELETE /api/expenses/:id/`
- response: 200
  - content-type: `application/json`
  - body: object
    - success: (string) => expense with id: <\_id> has been deleted!
- response: 404
  - body: object
    - error: (string) => expense with id: <\_id> not found!


```
$ curl -b cookie.txt -X DELETE
       http://localhost:3003/api/expenses/jed5672jd90xg4awo789/
```
