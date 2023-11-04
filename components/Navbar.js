import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/Fa";
import { BsFillBagCheckFill } from "react-icons/Bs";
import { MdAccountCircle } from "react-icons/md";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/Ai";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center my-2 shadow-md sticky top-0 bg-white z-10">
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image width={100} height={40} src="/logo1.png" alt="" />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/tshirt"}>
            <li>Tshirt</li>
          </Link>
          <Link href={"/hoodies"}>
            <li>hoodies</li>
          </Link>
          <Link href={"/stickars"}>
            <li>Stickars</li>
          </Link>
          <Link href={"/mugs"}>
            <li>Mugs</li>
          </Link>
          {/* <li></li>
          <li></li> */}
        </ul>
      </div>
      <div className=" cart absolute right-0 mx-5 top-4 cursor-pointer flex ">
        <Link href={"/login"}>
          <MdAccountCircle className="text-xl md:text-3xl" />
        </Link>
        <FaShoppingCart onClick={toggleCart} className="text-xl md:text-3xl" />
      </div>
      <div
        ref={ref}
        className="w-72 h-[100vh] sideCart absolute top-0 right-0 bg-cyan-100 
        px-8 py-10 transform transition-transform translate-x-full"
      >
        <h2 className="font-bold text-xl text-center">Shopping cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer text-xl text-cyan-500 "
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-normal"> Your cart is Empty </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">{cart[k].name}</div>
                  <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                    <AiFillMinusCircle className="cursor-pointer text-cyan-500" />
                    <span className=" mx-2 text-sm"> {cart[k].qty} </span>
                    <AiFillPlusCircle className="cursor-pointer text-cyan-500" />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="flex">
          <Link href={"/checkout"}>
            <button className="flex mx-2 text-white bg-cyan-500 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" /> Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mx-2 text-white bg-cyan-500 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-600 rounded text-sm"
          >
            clearcart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
