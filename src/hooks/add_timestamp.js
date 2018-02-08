/*
  After hook
  Method find and get

  Description: To add createdAt_timestamp and updateAt_timestamp for each doc. Deep: 2
  note: Generic hook, can be used for whatever services.
*/

const filterTimestamp = (doc) => {
  if(doc.createdAt) {
    doc.createdAt_timestamp = new Date(doc.createdAt).getTime()
  }
  if(doc.updatedAt) {
    doc.updatedAt_timestamp = new Date(doc.updatedAt).getTime()
  }
  return doc
}

const addTimestampHook = async function(context) {
  // for not populated docs (deep: 1)
  if(Array.isArray(context.result.data)) { // method: find
    context.result.data = context.result.data.map(filterTimestamp)
  } else { // method: get
    context.result = filterTimestamp(context.result)
  }

  // for populated docs (deep: 2)
  // e.g /userapp/{id}
  var populatedDoc
  if(Array.isArray(context.result.data)) { // method: find
    populatedDoc = context.result.data
  } else { // method: get
    populatedDoc = context.result
  }

  for(let key in populatedDoc) {
    let createdAt
    let obj = populatedDoc[key]

    try {
      createdAt = obj.createdAt
    } catch(e) {}

    if(createdAt !== undefined) {
      obj = filterTimestamp(obj)
    }
  }
}

module.exports = addTimestampHook