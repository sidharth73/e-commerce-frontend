import { apiSlice } from "../apiSlice";
import { PRODUCTS_URL } from "../../constants";

interface ProductType {
    id: number
    name: string,
    image: string,
    description: string,
    brand: string,
    category: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number,
    created_at: string,
    updated_at: string
}
const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query<[ProductType], void>({
            query: () => ({
                url: PRODUCTS_URL,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "*/*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                }
            }),
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query<ProductType, string | undefined>({
            query: productId => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { 
    useGetProductsQuery, 
    useGetProductDetailsQuery 
} = productsApiSlice