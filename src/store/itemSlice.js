import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    allItems: [],
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
        getItems: (state, action) => {
            state.allItems = action.payload.items
        }
    }
})

export const fetchItems = () => {
    return async(dispatch) => {
        let res  = await axios.
            get('http://127.0.0.1:3000/api/v1/products')
        const { data } = res
        console.log(res)
        const allItems = data.map(item => {
            return {
                name: item.name,
                category: item.category,
                price: item.price,
                image: item.image,
                id: item._id,
                quantity: 0,
            }
        })
        dispatch(getItems({items: allItems}))
    }
}

export const createItem = (item) => {
    return async(dispatch) => {
        let res  = await axios.
            post('http://127.0.0.1:3000/api/v1/products', item)
        if(res.status == 201) {
            dispatch(fetchItems())
        }
    }
}

export const updateItem = (id, item) => {
    return async(dispatch) => {
        console.log("id: ", id)
        console.log("item: ", item)
        let res  = await axios.
            put(`http://127.0.0.1:3000/api/v1/products/${id}`, item)
        if(res.status == 200) {
            dispatch(fetchItems())
        }
    }
}

export const deleteItem = (id) => {
    return async(dispatch) => {
        let res  = await axios.
            delete(`http://127.0.0.1:3000/api/v1/products/${id}`)
        if(res.status == 200) {
            dispatch(fetchItems())
        }
    }
}

export const { 
    addToCart, 
    incrementQuantity, 
    decrementQuantity, 
    resetCart,
    deleteItemFromCart,
    addNewItem,
    deleteItemFromItems,
    editItem,
    getItems
} = itemSlice.actions

export default itemSlice.reducer