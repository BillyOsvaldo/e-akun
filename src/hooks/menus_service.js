const menusHook = {}

menusHook.generateOrder = async context => {
  const Menus = context.app.service('menus').Model
  context.data.order = (await Menus.count()) + 1
}

/*
  Decide wheter this request use pagination
*/
menusHook.setPaginationBefore = async context => {
  const fromServiceMenus = !context.params.fromServiceMenuManagement
  if(fromServiceMenus) {
    context.params.paginate = false
  }
}

menusHook.setPaginationAfter = async context => {
  const fromServiceMenus = !context.params.fromServiceMenuManagement
  if(fromServiceMenus) {
    context.result = {
      total: context.result.length,
      limit: context.result.length,
      skip: 0,
      data: context.result
    } 
  }
}

module.exports = menusHook
