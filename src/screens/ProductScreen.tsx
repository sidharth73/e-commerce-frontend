import { useParams, Link, useNavigate } from 'react-router-dom'
import Spinner from "../components/Spinner";
import { useGetProductDetailsQuery } from '../state/product/productApiSlice';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart } from "../state/cart/cartSlice";
import { useState } from 'react';

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
const ProductScreen = () => {
  const {id:productId} = useParams();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1)

  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}))
  }
  
  return (
    <>
    <Toaster
    position="top-right"
    reverseOrder={false}
    />
    <div className="container mx-auto mt-8 p-4">
        <Link to={'/'}>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md mb-4">Go Back</button>
        </Link>
            {isLoading ? (<Spinner />) : error ? (toast.error(error?.data?.message || error?.error)) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-1">
                    <img src={product?.image} alt={product?.name} className="w-full h-auto" />
                </div>
                <div className="md:col-span-1">
                    <h1 className="text-2xl font-semibold">{product?.name}</h1>
                    <p className="text-gray-700 mt-2">{product?.description}</p>
                    <div className="flex items-center mt-2">
                        <span className="text-yellow-500 mr-1">{product?.rating}</span>
                        <span className="text-gray-500">({product?.numReviews} reviews)</span>
                    </div>
                    <p className="text-gray-700 mt-2">${product?.price.toFixed(2)}</p>
                    <p className="text-gray-700 mt-2">In Stock: {product?.countInStock}</p>
                    <div className="mt-4">
                        <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
                        <select
                            id="quantity"
                            className="
                            bg-white border 
                            border-gray-300 
                            p-2 
                            rounded-md mt-2"
                            onChange={e => setQty(Number(e.target.value))}
                        >
                            {[...Array(product?.countInStock).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                    className="
                    bg-yellow-500 
                    text-white 
                    px-4 
                    py-2 
                    rounded-md 
                    mt-4 
                    hover:bg-yellow-600"
                    onClick={addToCartHandler}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            )}
        </div>
        </>
  )
}

export default ProductScreen