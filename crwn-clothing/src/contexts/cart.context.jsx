import { createContext, useState, useEffect } from "react";







const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}


const removeCartItem = (cartItems, productToRemove) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id)
    }


    return cartItems.map((cartItem) => cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem)

}

const clearCartItem = (cartItems, productToClear) => {

    return cartItems.filter(cartItem => cartItem.id !== productToClear.id)
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartTotal: 0,
    cartCount: 0,
})


export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [cartCount, setCartCount] = useState(0)


    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0)
        setCartTotal(newCartTotal)

    }, [cartItems])

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0)
        setCartCount(newCartCount)

    }, [cartItems])

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const clearItemFromCart = (productToClear) => setCartItems(clearCartItem(cartItems, productToClear))



    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal,
        cartCount
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}