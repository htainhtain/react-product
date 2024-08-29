import { createSlice } from '@reduxjs/toolkit'
import data from '../data.js'

const initialState = {
    allItems: data,
    selectedItems: [],
    totalPrice: 0,
}

const getNewSelectedItemsAndTotalPrice = (allItems) => {
    let newSelectedItems = allItems.filter(item => item.quantity > 0)
    let totalPrice = newSelectedItems.reduce((acc, currentItem) => acc + currentItem.price * currentItem.quantity, 0) 

    return [newSelectedItems, totalPrice]
}

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.allItems.forEach(item => {
                if(item.id === action.payload.id) {
                    item.quantity++
                }
            })
            const [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(state.allItems)
            state.selectedItems = newSelectedItems
            state.totalPrice = totalPrice
        },
        incrementQuantity: (state, action) => {
            state.allItems.forEach(item => {
                if(item.id === action.payload.id) {
                    item.quantity++
                }
            })
            const [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(state.allItems)
            state.selectedItems = newSelectedItems
            state.totalPrice = totalPrice        
        },
        deleteItemFromCart: (state, action) => {
            state.allItems.forEach(item => {
                if(item.id === action.payload.id) {
                        item.quantity = 0
                }
            })
            const [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(state.allItems)
            state.selectedItems = newSelectedItems
            state.totalPrice = totalPrice  
        },
        decrementQuantity: (state, action) => {
            state.allItems.forEach(item => {
                if(item.id === action.payload.id) {
                    if (item.quantity != 0) {
                        item.quantity--
                    }
                }
            })
            const [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(state.allItems)
            state.selectedItems = newSelectedItems
            state.totalPrice = totalPrice        
        },
        resetCart: () => initialState,
        addNewItem: (state, action) => {
            const payload = action.payload
            const newItem = {
                "image": {
                    "thumbnail": payload.thumbnail,
                    "mobile": payload.mobile,
                    "tablet": payload.tablet,
                    "desktop": payload.desktop
                },
               "name": payload.name,
               "category": payload.category,
               "price": payload.price,
               "quantity": 0,
               "id": state.allItems[state.allItems.length - 1] ? state.allItems[state.allItems.length - 1].id++ : 1
            }

            state.allItems.push(newItem)
        },
        deleteItemFromItems: (state, action) => {
            state.allItems = state.allItems.filter(item => item.id !== action.payload.id)
            const [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(state.allItems)
            state.selectedItems = newSelectedItems
            state.totalPrice = totalPrice 
        },
        editItem: (state, action) => {
            state.allItems = state.allItems.map(item => {
                if (item.id === action.payload.item.id) {
                    console.log("action.payload.item: ", action.payload.item)
                    let editedItem = {
                        "image": {
                            "thumbnail": action.payload.item.image.thumbnail,
                            "mobile": action.payload.item.image.mobile,
                            "tablet": action.payload.item.image.tablet,
                            "desktop": action.payload.item.image.desktop
                        },
                        "name": action.payload.item.name,
                        "category": action.payload.item.category,
                        "price": action.payload.item.price,
                        "quantity": item.quantity,
                        "id": item.id,
                    }
                    return editedItem
                } else {
                    return item
                }
            })
            const [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(state.allItems)
            state.selectedItems = newSelectedItems
            state.totalPrice = totalPrice 
        }
    }
})

export const { 
    addToCart, 
    incrementQuantity, 
    decrementQuantity, 
    resetCart,
    deleteItemFromCart,
    addNewItem,
    deleteItemFromItems,
    editItem
} = itemSlice.actions

export default itemSlice.reducer