# e-akun

## API Resources

### Show Userdata

Get user data (username and name), search by email or username

* URL

  /checkuser

* METHOD

  GET

* URL Params

  username=[username|email]

* Success Response:

    Code: 200 

    Content:
    ```
    {
        "total": 1,
        "limit": 10,
        "skip": 0,
        {
            data: [
                {
                    username: {username},
                    name: {name}
                }
            ]
        }
    }
    ```

* Error Response:
    Code: 404 NOT FOUND 

    Content:
    ```
    {
        "name": "BadRequest",
        "message": "ID Akun/NIP tidak ditemukan.",
        "code": 400,
        "className": "bad-request",
        "data": {
            "username": "21893213821a"
        },
        "errors": {}
    }```

------------------------

### Check Is Email Available

Return 200 if email is available, return 404 if email is not valid or email is already registered

* URL

    /checkuser

* METHOD

    GET

* URL Params

    email=[email]

* Success Response:

    Code: 200 

    Content:
    ```{
        "total": 1,
        "limit": 10,
        "skip": 0,
        "data": [
            {
                "status": "success"
            }
        ]
    }
    ```

* Error Response:
    Code: 404 NOT FOUND 
    Content:
    ```{
        "name": "BadRequest",
        "message": "Email sudah digunakan",
        "code": 400,
        "className": "bad-request",
        "errors": {}
    }
    ```
------------------------

### Create Code Reg

Code reg is used for creating user, code reg can be used only once.

* URL

    /coderegs

* METHOD

    POST

* Body

    required:
        email=[String email]
        opd=[ObjectID]

    optional:
        status=[boolean], default:false

* Success Response:

    Code: 200 

    Content:
    ```
    {
        "_id": ObjectID,
        "email": String,
        "status": Boolean,
        "code": String,
        "opd": ObjectID
    }
    ```

------------------------

### Resend Email

To resend email `codereg` and `resetpassword`.

 * URL
 
    Format:
    /resend-email/{email}
  
    Contoh:
    /resend-email/testtest@gmail.com

 * METHOD
 
    PATCH

 * Body
 
    required:
        type=[String 'codereg'|'resetpassword']

 * Success Response:
 
    Code: 200 

    Content:
    ```
    {
      "code": "MR2LOP",
      "email": "example@gmail.com",
      "status": "success"
    }
    ```

 * Error Response:
 
    Code: 400 Bad Request 
     * Format email tidak valid
     * Tipe tidak diketahui
     * Email tidak ditemukan

------------------------

### Create User


 * URL
 
    Format:
    /userapp

 * METHOD
 
    POST

 * Body
 
    ```
        {
          "email": String email,
          "username": String,
          "password": String,
          "codereg": String,
          "gender": Number,
          "name": {
              "last_title": String,
              "first_title": String,
              "last_name": String,
              "first_name": String
          },
          "phone": {
              "lists": [String]
          },
          "isPns": Boolean,
          "nip": String
      }
  ```
  *Note: If isPns is true, then nip is required.


 * Error Response:
 
    Code: 400 Bad Request 
     * Kode salah
     * Email telah digunakan
     * Username telah digunakan
