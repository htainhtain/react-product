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
                if(item.name === action.payload.name) {
                    item.quantity++
                }
            })
            const [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(state.allItems)
            state.selectedItems = newSelectedItems
            state.totalPrice = totalPrice
        },
        incrementQuantity: (state, action) => {
            state.allItems.forEach(item => {
                if(item.name === action.payload.name) {
                    item.quantity++
                }
            })
            const [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(state.allItems)
            state.selectedItems = newSelectedItems
            state.totalPrice = totalPrice        
        },
        deleteItemFromCart: (state, action) => {
            state.allItems.forEach(item => {
                if(item.name === action.payload.name) {
                        item.quantity = 0
                }
            })
            const [newSelectedItems, totalPrice] = getNewSelectedItemsAndTotalPrice(state.allItems)
            state.selectedItems = newSelectedItems
            state.totalPrice = totalPrice  
        },
        decrementQuantity: (state, action) => {
            state.allItems.forEach(item => {
                if(item.name === action.payload.name) {
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
    }
})

export const { 
    addToCart, 
    incrementQuantity, 
    decrementQuantity, 
    resetCart,
    deleteItemFromCart
} = itemSlice.actions

export default itemSlice.reducer