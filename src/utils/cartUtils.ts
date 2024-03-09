const addDecimals = (num: any) => {
    return (Math.round(num *100) /100);
};

export const updateCart = (state:any) => {
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc: any, item: any) => acc + item.price * item.qty, 0)
    )
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    state.taxPrice = addDecimals((+state.itemsPrice * 0.15).toFixed(2))
    state.totalPrice = Number((
        +state.itemsPrice + 
        +state.shippingPrice +
        +state.taxPrice
    ).toFixed(2))

    localStorage.setItem("cart", JSON.stringify(state))

    return state;
}