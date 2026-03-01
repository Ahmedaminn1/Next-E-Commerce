import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const productsAction = createAsyncThunk("products/getAllProducts", async ()=>{
    const response = await fetch ("https://ecommerce.routemisr.com/api/v1/products")
    const data = await response.json()
    return data.data
})

const initialState = {
    products : []
}

const ProductsSLice = createSlice({
    name:"products",
    initialState,
    reducers:{
    },
    extraReducers: (buidler)=> {
        buidler.addCase(productsAction.pending , ()=>{
            console.log("pending");
        })
        buidler.addCase(productsAction.rejected, ()=>{
            console.log("Rejected");
        })
        buidler.addCase(productsAction.fulfilled, (state , action)=>{
            console.log("Success");
            state.products = action.payload
        })
    }
})


export const productsReducer = ProductsSLice.reducer