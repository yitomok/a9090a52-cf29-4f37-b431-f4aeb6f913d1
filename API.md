**API Specification**
----

* **[Register User](#register-user)**
* **[Login User](#login-user)**
* **[Add Contact](#add-contact)**

**Register User**
----
  Register an user.

* **URL**

  `/user`

* **Method:**

  `POST`

*  **URL Params**

   * None

* **Data Params**

   * **Mandatory:**
     * `email=[string]`, for login
     * `password=[string]`, for login

   * **Optional:**
     * `name=[string]`, user full name

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "message": "ok" }`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message" : "duplicate" }` <br />
    **Reason:** Duplicate email found.

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message" : "invalid" }` <br />
    **Reason:** Mandatory fields missing.

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Login User**
----
  Login an user.

* **URL**

  `/user/login`

* **Method:**

  `POST`

*  **URL Params**

   * None

* **Data Params**

   * **Mandatory:**
     * `email=[string]`, for validate login
     * `password=[string]`, for validate login

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "token": "<JSON web token>" }`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message" : "invalid" }` <br />
    **Reason:** Mandatory fields missing.

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "invalid credential" }` <br />
    **Reason:** Incorrect email and/or password.


**Add Contact**
----
  Add a contact.

* **URL**

  `/contact`

* **Method:**

  `POST`

* **Headers:**

  `Authorization`, Bearer token in JSON web token format, see [RFC 6750](https://tools.ietf.org/html/rfc6750)

*  **URL Params**

   * None

* **Data Params**

   * **Mandatory:**
     * `name=[string]`, contact full name
     * `number=[string]`, contact number

   * **Optional:**
     * `email=[string]`, contact email

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "message": "ok" }`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message" : "invalid" }` <br />
    **Reason:** Mandatory fields missing.

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "message": "invalid credential" }` <br />
    **Reason:** Incorrect email and/or password.

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.
