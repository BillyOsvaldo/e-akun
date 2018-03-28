const menusHook = {}

menusHook.generateOrder = async context => {
  const Menus = context.app.service('menus').Model
  context.data.order = (await Menus.count()) + 1
}

module.exports = menusHook
