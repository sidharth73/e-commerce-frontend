import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state/store"
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../state/cart/cartSlice";

const CartScreen = () => {
    const { 
        cartItems, 
        taxPrice, 
        shippingPrice, 
        totalPrice, 
        itemsPrice 
    } = useSelector((state:RootState) => state.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDeleteItem = (id: any) => {
        dispatch(removeFromCart(id))
    }

    const totalItems = cartItems.reduce((acc: number, item: any) => acc + item.qty, 0)

    return (
        <div className="flex flex-col md:flex-row justify-center items-start">
            <div className="md:w-2/3 p-4">
                <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
                {cartItems.length !== 0 
                ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cartItems.map((item: any) => (
                        <div className='border border-gray-300 p-4 flex items-center' key={item.id}>
                            <div>
                                <img src={item.image} alt={item.name} className='w-16 h-16 object-contain mr-4' />
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className='text-gray-600'>${item.price.toFixed(2)}</p>
                                <p className='text-gray-600'>Quantity: {item.qty}</p>
                                <button 
                                  className='text-red-500 hover:text-red-700'
                                  onClick={() => handleDeleteItem(item.id)}
                                >Remove</button>
                            </div>
                        </div>
                    ))}
                  </div>
                : (
                    <p className='text-gray-400 text-xl'>Your Cart is empty.</p>
                )}
            </div>
            {cartItems.length !== 0 &&
            <div>
                <h2 className="text-xl font-semibold">Subtotal</h2>
                <p className="text-gray-600">Total Items: {totalItems} </p>
                <p className="text-gray-600">Items Items: {itemsPrice} </p>
                <p className="text-gray-600">Tax: ${taxPrice} </p>
                <p className="text-gray-600">ShippingPrice: ${shippingPrice} </p>
                <p className="text-gray-600">Total Price: ${totalPrice} </p>
                <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
                        disabled={cartItems.length === 0}
                    >
                        Proceed to Checkout
                    </button>
            </div>}
        </div>
    )
}

export default CartScreen