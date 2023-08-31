import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)

  const saveCart=(myCart)=>{
    localStorage.setItem("cart", myCart)
  }

  const addtoCard =(itemCode, qty, price, name, size, varient)=>{
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else{
      newCart[itemCode] = {qty: 1, price, name, size, varient}
    }
    setCart(newCart)
    saveCart(newCart)
  }
  
  return (
    <>
      <Navbar /> 
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
