const SHOPPING_KEY = 'shoppingList'

function getShoppingList() {
  return uni.getStorageSync(SHOPPING_KEY) || []
}

function saveShoppingList(list) {
  uni.setStorageSync(SHOPPING_KEY, Array.isArray(list) ? list : [])
}

function addShoppingItem(name) {
  const value = String(name || '').trim()
  if (!value) {
    return getShoppingList()
  }

  const list = getShoppingList()
  const existed = list.some((item) => item.name === value)

  if (!existed) {
    list.unshift({
      id: Date.now(),
      name: value,
      checked: false,
      createdAt: new Date().toLocaleString()
    })
    saveShoppingList(list)
  }

  return list
}

function toggleShoppingItem(id) {
  const list = getShoppingList().map((item) => {
    if (String(item.id) === String(id)) {
      return {
        ...item,
        checked: !item.checked
      }
    }
    return item
  })
  saveShoppingList(list)
  return list
}

function removeShoppingItem(id) {
  const list = getShoppingList().filter((item) => String(item.id) !== String(id))
  saveShoppingList(list)
  return list
}

function clearCheckedItems() {
  const list = getShoppingList().filter((item) => !item.checked)
  saveShoppingList(list)
  return list
}

export {
  getShoppingList,
  saveShoppingList,
  addShoppingItem,
  toggleShoppingItem,
  removeShoppingItem,
  clearCheckedItems
}

export default {
  getShoppingList,
  saveShoppingList,
  addShoppingItem,
  toggleShoppingItem,
  removeShoppingItem,
  clearCheckedItems
}
