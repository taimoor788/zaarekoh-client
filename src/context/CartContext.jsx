import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage on init
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        const qtyToAdd = product.qty || 1;
        setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => x._id === product._id);
            if (existItem) {
                return prevItems.map((x) =>
                    x._id === product._id ? { ...x, qty: x.qty + qtyToAdd } : x
                );
            } else {
                return [...prevItems, { ...product, qty: qtyToAdd }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((x) => x._id !== id));
    };

    const updateQty = (id, qty) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === id ? { ...item, qty: Number(qty) } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartCount = () => {
        return cartItems.reduce((acc, item) => acc + item.qty, 0);
    };

    const getCartTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQty,
            clearCart,
            getCartCount,
            getCartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};
