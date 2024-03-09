import Product from '../components/Product'
import Spinner from '../components/Spinner';
import { useGetProductsQuery } from "../state/product/productApiSlice";
import { Toaster, toast } from 'react-hot-toast';

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

const HomeScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    return (
        <>
        <Toaster
        position="top-right"
        reverseOrder={false}
        />
        {isLoading ? (<Spinner />) : error ? (toast.error(error?.data?.message || error?.error)) : (
                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                    {
                        products?.map((product: ProductType, i: any) => (
                            <Product key={i} product={product} />
                        ))
                    }
                </div>
            )
        }
        </>
    )
}

export default HomeScreen