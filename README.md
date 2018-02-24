

# e-akun

## API Resources

### Service Addresses

Method **Find**:

Desc: Find addresses search by substring of kecamatan or kelurahan. E.g params q=ali will return Bali, Kalimantan etc.

* URL

  /addresses

* METHOD

  GET

* URL Params

  q=[kecamatan|kelurahan]
  
  contoh: q=Bali

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
                "_id": ObjectID,
                "provinsi": "Bali",
                "kotakab": "Jembrana",
                "kecamatan": "Negara",
                "kelurahan": "Kaliakah",
                "kodepos": "82218"
            },
            ]
        }
    }
    ```

------------------------

### Service Checkcode

Method **Find**:

Desc: Find unused code search by code.
Return status 200 when found unused code, otherwise return status 400.

* URL

  /checkcode

* METHOD

  GET

* URL Params

  code=[code]
  
  contoh: code=A82F21

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
                "code": String,
                "email": String Email
            },
            ]
        }
    }
    ```
    
* Error Response:
    Code: 400
    Content:
    ```{
        "name": "BadRequest",
        "message": "Kode tidak ditemukan",
        "code": 400,
        "className": "bad-request",
        "errors": {}
    }
    ```
    
------------------------

### Service Checkuser

Method **find**:

Desc: To show user data (username and name), search by email or username

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


Desc: **To check if email is available**. Return 200 if email is available, return 404 if email is not valid or email is already registered

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

### Service Coderegs

Method: **Create**
Desc: Code reg is used for creating user, code reg can be used only once.

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

### Service Resend Email

Desc: To resend email `codereg` and `resetpassword`.

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

### Service Usersmanagement

Method: **Create**

Desc: To create new user.

 * URL
 
    Format:
    /usersmanagement

 * METHOD
 
    POST

 * Body
 
    ```
        {
          "password": String,
          "codereg": ObjectID Required,
          "gender": Number Required, value: 1|2,
          "name": {
              "last_title": String Optional,
              "first_title": String Optional,
              "last_name": String Required,
              "first_name": String Required
          },
          "birth": {
            "day": Date Required,
            "place": String
          },
          "phone": {
              "lists": [String] Optional,
              "primary": Number, default: 0
          },
          "isPns": Boolean Optional,
          "nip": String Optional
      }
    ```

> Note: If isPns is true, then nip is required Note: gender 1 =
> laki-laki, gender 2 = perempuan


* Error Response:
 
    Code: 400 Bad Request 
     * Kode salah
     * Email telah digunakan
     * Username telah digunakan
