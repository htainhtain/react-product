import { createContext, useReducer } from "react"
import data from '../data.js'

export const itemsContext = createContext({
    allItems: data,
    selectedItems: [],
    totalPrice: 0,
    addToCart: () => {},
    incrementQuantity: () => {},
    decrementQuantity: () => {},
    deleteItemFromCart: () => {},
    resetCart: () => {}
})

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

export const handleDecrementItem = (prevItems, name) => {
    let [newAllItem, existingItem] = getNewArrayAndExistingItem(prevItems, name)
    if (existingItem) {
        if (existingItem.quantity > 0) {
        existingItem.quantity--
        }
        newAllItem = getNewItemsWithModifiedExistingItem(newAllItem, existingItem)
    }

    return newAllItem
}

const handleDeleteItem = (prevItems, name) => {
    let [newAllItem, existingItem] = getNewArrayAndExistingItem(prevItems, name)
    if (existingItem) {
        existingItem.quantity = 0
        newAllItem = getNewItemsWithModifiedExistingItem(newAllItem, existingItem)
    }

    return newAllItem
}

const getNewSelectedItemsAndTotalPrice = (allItems) => {
    let newSelectedItems = allItems.filter(item => item.quantity > 0)
    let totalPrice = newSelectedItems.reduce((acc, currentItem) => acc + currentItem.price * currentItem.quantity, 0) 

    return [newSelectedItems, totalPrice]
}

const itemReducer = (state, action) => {
    let nextState = {...state}
    switch(action.type) {
    case 'ADD_ITEM_TO_CART': 
        nextState.allItems = handleAddCart(nextState.allItems, action.payload.name)
        break
    case 'DECREMENT_QUANTITY_IN_CART': 
        nextState.allItems = handleDecrementItem(nextState.allItems, action.payload.name)
        break
    case 'DELETE_ITEM_FROM_CART': 
        nextState.allItems = handleDeleteItem(nextState.allItems, action.payload.name)
        break
    case 'RESET_CART': 
        nextState.allItems =  data
        break
    }

    const [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(nextState.allItems)
    nextState.selectedItems = newSelectedItems
    nextState.totalPrice = totalPrice

    return nextState
}

const initialItemState = {
    allItems: data,
    selectedItems: [],
    totalPrice: 0,
}

const ItemContextProvider = ({children}) => {
    const [itemsState, itemDispatch] = useReducer(itemReducer, initialItemState)

    const addToCart = ({name}) => {
        itemDispatch({
            type: 'ADD_ITEM_TO_CART',
            payload: {
                name
            }
        })
    }

    const incrementQuantity = ({name}) => {
        itemDispatch({
            type: 'ADD_ITEM_TO_CART',
            payload: {
                name
            }
        })
    }

    const decrementQuantity = ({name}) => {
        itemDispatch({
            type: 'DECREMENT_QUANTITY_IN_CART',
            payload: {
                name
            }
        })
    }

    const deleteItemFromCart = ({name}) => {
        itemDispatch({
            type: 'DELETE_ITEM_FROM_CART',
            payload: {
                name
            }
        })
    }

    const resetCart = () => {
        itemDispatch({
            type: 'RESET_CART',
        })
    }
 
    const itemsCtx = {
        allItems: itemsState.allItems,
        selectedItems: itemsState.selectedItems,
        totalPrice: itemsState.totalPrice,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        deleteItemFromCart,
        resetCart
    }

    return (
        <itemsContext.Provider value={itemsCtx}>
            {children}
        </itemsContext.Provider>
    )
}

export default ItemContextProvider