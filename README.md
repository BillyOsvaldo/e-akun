# e-akun

## List Services

- addresses
- administratorpermissionsmanagement
- administrators
- administratorsmanagement
- administratorsorganizationsmanagement
- administratorsselect
- apps
- appsmanagement
- appsselect
- checkcode
- checkemail
- checkuser
- checkusername
- coderegs
- coderegsmanagement
- menuapp
- menus
- menusmanagement
- organizations
- organizationsmanagement
- organizationsselect
- organizationstructures
- organizationstructuresmanagement
- organizationstructuresselect
- organizationstructuresusers
- organizationstructuresusersbyuser
- organizationstructuresusersdraft
- organizationstructuresusersdraftmanagement
- organizationstructuresusersmanagement
- organizationusers
- organizationusersbyuser
- organizationusersdraft
- organizationusersdraftmanagement
- organizationusersexpand
- organizationusersmanagement
- permissions
- permissionsadminorganizationsselect
- permissionsmanagement
- permissionsselect
- positions
- positionsmanagement
- postcodes
- profiles
- resend_email
- roles
- rolesmanagement
- rolesselect
- structureparentselect
- structures
- structuresmanagement
- structuresselect
- userRegistration
- users
- usersmanagement
- usersselect


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

Method: **Find**

Desc: To get users.

 * URL
 
    Format:
    /usersmanagement
    /usersselect

* URL Params

  $first_name_or_last_name=string
  profile.name.first_name=string
  profile.name.last_name=string
  username=string


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

Method: **Patch**

Desc: To edit self, all users and all profile data.

 * URL
 
    Format:
    /usersmanagement

 * METHOD
 
    PATCH

* Body

  **required**:
        update=[self|account|profile]
  **note**:
      if update is `self` then you have to provide `comparepassword`.

### Service Appsselect

Method **Find**:

Desc: Find apps search by substring of `name` or `desc`. E.g params q=e-presensi will return e-presensi.

* URL

  /appsselect

* METHOD

  GET

* URL Params

  q=[name|desc]
  
  contoh: q=e-presensi

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
                "name": String,
                "desc": String,
                "service": String,
                "url": String,
                "status": Boolean
                },
            ]
        }
    }
    ```

------------------------


### Service Administratorsselect

Method **Find**:

Desc: Find administrators search by substring of `name` or `tag`. E.g params q=admin_organization will return admin_organization.

* URL

  /administratorsselect

* METHOD

  GET

* URL Params

  q=[name|tag]
  
  contoh: q=admin_organization

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
                  "_id": ObjectId,
                  "name": "Super Admin",
                  "tag": "super_admin"
              },
            ]
        }
    }
    ```

------------------------

### Service Administratorsmanagement

Method: **Create**

Desc: To create new administrator user.

 * URL
 
    Format:
    /administratorsmanagement

 * METHOD
 
    POST

 * Body
 
    ```
      {
          "username": String,
          "email": String,
          "password": String,
          "permissions": Array of permission id,
      }
    ```

Method: **Find**

Desc: To return administrators users.

 * URL
 
    Format:
    /administratorsmanagement

 * METHOD
 
    GET

 * Body
 
    ```
      [
        {
            "_id": ObjectId,
            "permissions": Array of permissions ObjectId,
            "username": String,
            "email": String,
        }
      ]
    ```


------------------------

### Service Structures

Note: Service **structuresmanagement** is same as service **structures**

Method: **Create**

Desc: To create structure.

 * URL
 
    Format:
    /structures

 * METHOD
 
    POST

 * Body
 
    ```
      {
          "name": String,
          "desc": String
      }
    ```
 * Contoh:
    ```
      {
          "name": "Kepala",
          "desc": "Kepala Organisasi"
      }
    ```

Method: **Find**

Desc: To return structure document.

 * URL
 
    Format:
    /structures

 * METHOD
 
    GET

 * Body
 
    ```
      [
        {
            "_id": ObjectId,
            "name": String
        }
      ]
    ```

------------------------

### Service OrganizationStructures 

Note:

 - Service **organizationstructuresmanagement** is same as service **organizationstructures**. 
 - Service **organizationstructuresselect** is same as service **organizationstructures** with no pagination.


Method: **Create**

Desc: To create organizations structure.

 * URL
 
    Format:
    /organizationstructures

 * METHOD
 
    POST

 * Body
 
    ```
      {
          "structure": ObjectId (reference of structures),
          "organization": ObjectId (reference of organizations),
          "name": String,
          "structureposition": ObjectId,
          "role": ObjectId
      }
    ```
 * Contoh:
    ```
      {
          "structure": 5aa7285f044c393f4afd6e51,
          "organization": 5aa7285f044c393f4afd6e52,
          "name": "Informatika",
          "structureposition": 5aa7285f044c393f4afd6e52,
          "role": 5aa7285f044c393f4afd6e52
      }
    ```

Method: **Find**

Desc: To return organization structure document.

 * URL
 
    Format:
    /organizationstructures

 * METHOD
 
    GET

 * Body
 
    ```
      [
        {
            "structure": 5aa7285f044c393f4afd6e51,
            "organization": 5aa7285f044c393f4afd6e52,
            "name": "Informatika",
            "structureposition": 5aa7285f044c393f4afd6e52,
            "role": 5aa7285f044c393f4afd6e52
        }
      ]
    ```

------------------------

### Service Positions 

Note:

 - Service **positionsmanagement** is same as service **positions**. 

Method: **Create**

Desc: To create position document.

 * URL
 
    Format:
    /positions

 * METHOD
 
    POST

 * Body
 
    ```
      {
          "name": ObjectId (reference of organizationstructure),
          "parent": ObjectId (reference of organizationstructure),
          "alt_parent": ObjectId (reference of organizationstructure) (optional)
      }
    ```

Method: **Find**

Desc: To return position document.

 * URL
 
    Format:
    /positions

 * METHOD
 
    GET

 * Body
 
    ```
      [
        {
            "name": 5aa7285f044c393f4afd6e51,
            "parent": 5aa7285f044c393f4afd6e52
        }
      ]
    ```

------------------------

### Service Structurepositions 

Note:

 - Service **structurepositionsmanagement** is same as service **structurepositions**. 

Method: **Create**

Desc: To create structure positions document.

 * URL
 
    Format:
    /structurepositions

 * METHOD
 
    POST

 * Body
 
    ```
      {
          "name": String,
          "desc": String
      }
    ```

Method: **Find**

Desc: To return structure positions document.

 * URL
 
    Format:
    /structurepositions

 * METHOD
 
    GET

 * Body
 
    ```
      [
        {
            "name": "Sekertaris",
            "desc": "Sekertaris Daerah"
        }
      ]
    ```


------------------------

### Service Checkusername, Checkemail

Method **find**:

Desc: To check wheter username or email is already registered. Return success (200) if no user found in database, return error (400) if user is found

* URL

  /checkusername
  /checkemail

* METHOD

  GET

* URL Params

  username=[username]
  OR
  email=[email]

* Success Response:

    Code: 200 

    Content:
    ```
    {
        "status": "success"
    }
    ```


* Error Response:

    Code: 200 

    Content:
    ```
    {
      "name": "BadRequest",
      "message": "Email sudah digunakan",
      "code": 400,
      "className": "bad-request",
      "errors": {}
    }

    ```



------------------------

### Service StructureParentSelect

Method **find**:

Desc: To Find all ancestors of current organzationstructures

* URL

  /structureparentselect

* METHOD

  FIND

* URL Params

  id=[id]

* Success Response:

    Code: 200 

    Content:
    ```
    {
      "total": 15,
      "limit": 15,
      "skip": 0,
      "data": [
        {
          "_id": ObjectId,
          "order": Number,
          "children": [ObjectId],
          "parent": ObjectId,
          "alt_parent": ObjectId|null,
          "name": String,
          "organization": ObjectId,
          "structure": ObjectId
        },
      ]
    }
    ```

------------------------

### Service organizationusers

Method **find**:

Desc: -

Note: On create `organizationusers.endDate` will be filled automatically

* URL

  /organizationusers
  /organizationusersmanagement

* METHOD

  POST

* Body

    required:
        user = ObjectId (reference of users)
        organization = ObjectId (reference of organizations)
        startDate = Date

* Success Response:

    Code: 200 

    Content:
    ```
    {
      "total": 15,
      "limit": 15,
      "skip": 0,
      "data": [
        {
          "user": ObjectId,
          "organization": ObjectId,
          "startDate": Date,
          "endDate": Date,
        },
      ]
    }
    ```

------------------------

### Service organizationstructuresusers

Method **find**:

Desc: -

Note: On create `organizationstructuresusers.endDate` will be filled automatically

* URL

  /organizationstructuresusers
  /organizationstructuresusersmanagement

* METHOD

  POST

* Body

    required:
        user = ObjectId (reference of users)
        organizationstructure = ObjectId (reference of organizationstructures)
        startDate = Date

* Success Response:

    Code: 200 

    Content:
    ```
    {
      "total": 15,
      "limit": 15,
      "skip": 0,
      "data": [
        {
          "user": ObjectId,
          "organizationstructure": ObjectId,
          "startDate": Date,
          "endDate": Date,
        },
      ]
    }
    ```

------------------------

### Service organizationusersdraft

Note: all method (create, find, get, patch) is same as service `organizationusers`, except hooks `organizationUsersHooks.updateOrganization` and `organizationUsersHooks.updateOrganizationUsers` are disabled because users.organization and users.organizationusers no need to modified currently.

To publish draft:
  Method: DELETE
  URL: /organizationusersdraftmanagement/publish_{ObjectId}

------------------------

### Service organizationstructuresusersdraft

Note: all method (create, find, get, patch) is same as service `organizationstructuresusers`, except hooks `organizationstructuresUsersHooks.updateOrganization` and `organizationstructuresUsersHooks.updateOrganizationstructuresUsers` are disabled because users.organization and users.organizationstructuresusers no need to modified currently.

To publish draft:
  Method: DELETE
  URL: /organizationstructuresusersdraftmanagement/publish_{ObjectId}

---------------------------------------------------------------------

## Related Services

- addresses
  all:
    - postcodes

- administratorpermissionsmanagement
  all:
    - administrators

- administrators

- administratorsmanagement
  all:
    - users

- administratorsorganizationsmanagement
  all:
    - users  

- administratorsselect
  all:
    - administrators


- apps

- appsmanagement
  all:
    - apps

- appsselect
  all:
    - apps

- checkcode
  find:
    - coderegs

- checkemail
  find:
    - users

- checkuser
  find:
    - users
    - permissions

- checkusername
  find:
    - users

- coderegs
  no dep

- coderegsmanagement
  - organizationusersdraftmanagement
  - organizationstructuresusersdraftmanagement
  - coderegs
  - organizationusersdraft
  - organizationstructuresusersdraft












- menuapp
- menus
- menusmanagement
- organizations
- organizationsmanagement
- organizationsselect
- organizationstructures
- organizationstructuresmanagement
- organizationstructuresselect
- organizationstructuresusers
- organizationstructuresusersbyuser
- organizationstructuresusersdraft
- organizationstructuresusersdraftmanagement
- organizationstructuresusersmanagement
- organizationusers
- organizationusersbyuser
- organizationusersdraft
- organizationusersdraftmanagement
- organizationusersexpand
- organizationusersmanagement
- permissions
- permissionsadminorganizationsselect
- permissionsmanagement
- permissionsselect
- positions
- positionsmanagement
- postcodes
- profiles
- resend_email
- roles
- rolesmanagement
- rolesselect
- structureparentselect
- structures
- structuresmanagement
- structuresselect
- userRegistration
- users
- usersmanagement
- usersselect