/*
  Before hook
  Method find

  Description: To order data by createdAt in descending order
  note: Generic hook, can be used for whatever services.
*/

const orderByCreatedAtDesc = async function(context) {
  var sort = context.params.query.$sort

  if(sort === undefined) {
    context.params.query.$sort = { createdAt: -1 }
  }
}

module.exports = orderByCreatedAtDesc