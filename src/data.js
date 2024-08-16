import data from './data.json' assert { type: 'json' };

let items = data.map(item => ({...item, "quantity": 0}))

const getNewArrayAndExistingItem = (prevItems, name) => {
    let newSelectedCartItems = prevItems.map(it => ({...it}))
    let existingItem = newSelectedCartItems.find(it => it.name === name)
    return [newSelectedCartItems, existingItem]
}

const getNewItemsWithModifiedExistingItem = (allItems, existingItem) => {
    return allItems.map(it => {
        if (it.name === existingItem.name) {
        return existingItem
        } else {
        return it
        }
    }) 
}

export const handleAddCart = (prevItems, name) => {
    let [newAllItem, existingItem] = getNewArrayAndExistingItem(prevItems, name)
    if (existingItem) {
        existingItem.quantity++
        newAllItem = getNewItemsWithModifiedExistingItem(newAllItem, existingItem)
    }

    return newAllItem
}

export const handleDecreaseQuantity = (prevItems, name) => {
    let [newAllItem, existingItem] = getNewArrayAndExistingItem(prevItems, name)
    if (existingItem) {
        if (existingItem.quantity > 0) {
        existingItem.quantity--
        }
        newAllItem = getNewItemsWithModifiedExistingItem(newAllItem, existingItem)
    }

    return newAllItem
}

export const handleDeleteItem = (prevItems, name) => {
    let [newAllItem, existingItem] = getNewArrayAndExistingItem(prevItems, name)
    if (existingItem) {
        existingItem.quantity = 0
        newAllItem = getNewItemsWithModifiedExistingItem(newAllItem, existingItem)
    }

    return newAllItem
}

export const getNewSelectedItemsAndTotalPrice = (allItems) => {
    let newSelectedItems = allItems.filter(item => item.quantity > 0)
    let totalPrice = newSelectedItems.reduce((acc, currentItem) => acc + currentItem.price * currentItem.quantity, 0) 

    return [newSelectedItems, totalPrice]
}

export default items