/*
  Before hook
  Method find

  Description: To order data by field order in ascending order
  note: Generic hook, can be used for whatever services.
*/

const orderByOrderAsc = async function(context) {
  var sort = context.params.query.$sort

  if(sort === undefined) {
    context.params.query.$sort = { order: 1 }
  }
}

module.exports = orderByOrderAsc