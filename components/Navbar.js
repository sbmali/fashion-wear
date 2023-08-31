import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/Fa";
import { BsFillBagCheckFill } from "react-icons/Bs";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/Ai";

const Navbar = () => {
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
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center my-2 shadow-md">
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image width={100} height={40} src="/logo.jpg" alt="" />
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
      <div
        onClick={toggleCart}
        className="cart absolute right-0 mx-5 top-4 cursor-pointer"
      >
        <FaShoppingCart className="text-xl md:text-3xl" />
      </div>
      <div
        ref={ref}
        className="w-72 h-full sideCart absolute top-0 right-0 bg-cyan-100 
        px-8 py-10 transform transition-transform translate-x-full"
      >
        <h2 className="font-bold text-xl text-center">Shopping cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer text-xl text-cyan-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">
                {" "}
                T-shart - Wear the code
              </div>
              <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                <AiFillMinusCircle className="cursor-pointer text-cyan-500" />{" "}
                <span className=" mx-2 text-sm"> 1 </span>
                <AiFillPlusCircle className="cursor-pointer text-cyan-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">
                {" "}
                T-shart - Wear the code
              </div>
              <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                <AiFillMinusCircle className="cursor-pointer text-cyan-500" />{" "}
                <span className=" mx-2 text-sm"> 1 </span>
                <AiFillPlusCircle className="cursor-pointer text-cyan-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">
                {" "}
                T-shart - Wear the code
              </div>
              <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                <AiFillMinusCircle className="cursor-pointer text-cyan-500" />{" "}
                <span className=" mx-2 text-sm"> 1 </span>
                <AiFillPlusCircle className="cursor-pointer text-cyan-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">
                {" "}
                T-shart - Wear the code
              </div>
              <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                <AiFillMinusCircle className="cursor-pointer text-cyan-500" />{" "}
                <span className=" mx-2 text-sm"> 1 </span>
                <AiFillPlusCircle className="cursor-pointer text-cyan-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">
                {" "}
                T-shart - Wear the code
              </div>
              <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                <AiFillMinusCircle className="cursor-pointer text-cyan-500" />{" "}
                <span className=" mx-2 text-sm"> 1 </span>
                <AiFillPlusCircle className="cursor-pointer text-cyan-500" />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">
                {" "}
                T-shart - Wear the code
              </div>
              <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                <AiFillMinusCircle className="cursor-pointer text-cyan-500" />{" "}
                <span className=" mx-2 text-sm"> 1 </span>
                <AiFillPlusCircle className="cursor-pointer text-cyan-500" />
              </div>
            </div>
          </li>
        </ol>
        <div className="flex">
          <button className="flex mx-2 text-white bg-cyan-500 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-600 rounded text-sm">
            <BsFillBagCheckFill className="m-1" /> Checkout
          </button>
          <button className="flex mx-2 text-white bg-cyan-500 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-600 rounded text-sm">
            clearcart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
