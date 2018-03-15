const { populate } = require('feathers-hooks-common');
const errors = require('@feathersjs/errors')

const userappHook = {}

// if new user is pns, then nip is required
userappHook.checkPns = async (context) => {
  if(context.data.isPns && !context.data.nip) {
    throw new errors.BadRequest('PNS wajib mengisi NIP')
  }

  return context
}

userappHook.populate = async (context) => {
  var populateSchema = {
    include: [
      {
        service: 'organizations',
        nameAs: 'organization',
        parentField: 'organization',
        childField: '_id'
      },
      {
        service: 'roles',
        nameAs: 'role',
        parentField: 'role',
        childField: '_id'
      },
      {
        service: 'permissions',
        nameAs: 'permissions',
        parentField: 'permissions',
        childField: '_id',
        select: (hook) => ({ app: hook.app.get('appid') }),
        include: [
          {
            service: 'apps',
            nameAs: 'app',
            parentField: 'app',
            childField: '_id'
          },
          {
            service: 'administrators',
            nameAs: 'administrator',
            parentField: 'administrator',
            childField: '_id',
          }
        ]
      },
      {
        service: 'positions',
        nameAs: 'position',
        parentField: 'position',
        childField: '_id',
        include: [
          {
            service: 'organizationstructures',
            nameAs: 'name',
            parentField: 'name',
            childField: '_id',
            include: [
              {
                service: 'structures',
                nameAs: 'structure',
                parentField: 'structure',
                childField: '_id'
              },
              {
                service: 'organizations',
                nameAs: 'organization',
                parentField: 'organization',
                childField: '_id',
                include: [
                  {
                    service: 'postcodes',
                    nameAs: 'address.postcode',
                    parentField: 'address.postcode',
                    childField: '_id'
                  }
                ]
              },
              {
                service: 'structurepositions',
                nameAs: 'structureposition',
                parentField: 'structureposition',
                childField: '_id'
              },
              {
                service: 'roles',
                nameAs: 'role',
                parentField: 'role',
                childField: '_id'
              }
            ]
          },
          {
            service: 'organizationstructures',
            nameAs: 'parent',
            parentField: 'parent',
            childField: '_id',
            include: [
              {
                service: 'structures',
                nameAs: 'structure',
                parentField: 'structure',
                childField: '_id'
              },
              {
                service: 'organizations',
                nameAs: 'organization',
                parentField: 'organization',
                childField: '_id',
                include: [
                  {
                    service: 'postcodes',
                    nameAs: 'address.postcode',
                    parentField: 'address.postcode',
                    childField: '_id'
                  }
                ]
              },
              {
                service: 'structurepositions',
                nameAs: 'structureposition',
                parentField: 'structureposition',
                childField: '_id'
              },
              {
                service: 'roles',
                nameAs: 'role',
                parentField: 'role',
                childField: '_id'
              }
            ]
          }
        ]
      }
    ]
  }

  populateSchema.include.push({
    service: 'profiles',
    nameAs: 'profile',
    parentField: 'profile',
    childField: '_id',
    include: [
      {
        service: 'postcodes',
        nameAs: 'address.postcode',
        parentField: 'address.postcode',
        childField: '_id'
      }
    ]
  })

  await populate({ schema: populateSchema })(context)
}

userappHook.sortByProfile = async (context) => {
  const querySort = context.params.query.$sort
  const sortByProfilesFields = [
    'profile.name.first_name',
    'profile.name.last_name',
    'profile.birth.day',
    'profile.age'
  ]

  const isSortByProfile = () => {
    if(!querySort) return false
    for(let key in querySort) {
      if(!sortByProfilesFields.includes(key)) continue
      return true
    }
    return false
  }

  const sortByProfile = (data) => {
    // collect all sort-by-profile
    const sortBy = {}
    for(let key in querySort) {
      if(!sortByProfilesFields.includes(key)) continue

      sortBy[key] = parseInt(querySort[key])
    }

    const getProfilePropVal = (docUser, profileProp) => {
      if(profileProp === 'profile.name.first_name') {
        return docUser.profile.name.first_name
      } else if(profileProp === 'profile.name.last_name') {
        return docUser.profile.name.last_name
      } else if(profileProp === 'profile.birth.day') {
        return docUser.profile.name.last_name
      } else if(profileProp === 'profile.age') {
        return docUser.profile.name.last_name
      } else {
        return 0
      }
    }

    for(let sortName in sortBy) {
      let sortVal = sortBy[sortName]

      if(sortVal == 1) {
        data = data.sort(function(a, b) {
          if(getProfilePropVal(a, sortName) == getProfilePropVal(b, sortName))
            return 0
          else if(getProfilePropVal(a, sortName) > getProfilePropVal(b, sortName))
            return 1
          else
            return -1
        })
      } else {
        data = data.sort(function(a, b) {
          if(getProfilePropVal(a, sortName) == getProfilePropVal(b, sortName))
            return 0
          else if(getProfilePropVal(a, sortName) < getProfilePropVal(b, sortName))
            return 1
          else
            return -1
        })
      }
    }

    return data
  }

  // exec
  if(!isSortByProfile()) return
  context.result.data = sortByProfile(context.result.data)
}

module.exports = userappHook
