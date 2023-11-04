import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { useRouter } from 'next/router'
import Product from "../models/Product"
import mongoose from "mongoose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/Modal';

const Checkout = ({ products, clearCart, cart, addToCart, removeFromCart, subtotal }) => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [pincode, setPincode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [modelOpen, setModelOpen] = useState(false)
    const [oid, setOid] = useState('')
    const closeModal = () => {
        setModelOpen(false)
    }
    const modalSucess = () => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}/order?id=${oid}`)
    }

    useEffect(() => {
        let myUser = JSON.parse(localStorage.getItem('myUser'))
        try {
            if (myUser) {
                fetchUser(myUser.token)
            }
        } catch (error) {

        }
    }, [])

    const fetchUser = async (token) => {
        const data = { token };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await a.json()
        setName(response.name)
        setEmail(response.email)
        setAddress(response.address)
        setPhone(response.phone)
        setPincode(response.pincode)
        setCity(response.city)
        setState(response.state)
    }
    const handelChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value)
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name == 'address') {
            setAddress(e.target.value);
        }
        else if (e.target.name == 'phone') {
            setPhone(e.target.value);
        }
        else if (e.target.name == 'pincode') {
            setPincode(e.target.value);
        }
        else if (e.target.name == 'city') {
            setCity(e.target.value);
        }
        else if (e.target.name == 'state') {
            setState(e.target.value);
        }
    }
    const submitForm = async (e) => {
        e.preventDefault()
        const data = { cart, subtotal, name, email, address, phone, pincode, city, state };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let b = await a.json()
        if (b.sucess) {
            setOid(b.oid)
            clearCart()
            setModelOpen(true)
        }
        else{
            toast.error('The price of some items in your cart have changed. Please try again', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setName('');
        setEmail('');
        setAddress('');
        setPhone('');
        setPincode('');
        setCity('');
        setState('');
    }
    return (
        <div className='container m-auto mt-8 md:mt-0 px-6 md:px-24'>
            <Head>
                <title>Checkout | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
            </Head>
            {modelOpen && <Modal closeModal={closeModal} message="Order Plased Sucessfully!!" sucessButton="Okay" modalSucess={modalSucess} singleButton={true} />}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <form onSubmit={submitForm}>
                <h1 className='text-2xl font-bold text-center -mt-4 mb-6 md:my-8'>Checkout</h1>
                <h2 className='font-semibold text-xl'>1. Details</h2>
                <div className='p-4'>
                    <div className="flex flex-col md:flex-row">
                        <div className="mb-4 md:mr-4 w-full md:w-1/2">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                            <input onChange={handelChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                        </div>
                        <div className="mb-4 w-full md:w-1/2">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" required id="email" name="email" onChange={handelChange} value={email} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className="pb-4">
                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                        <textarea id="address" required name="address" onChange={handelChange} value={address} rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="mb-4 md:mr-4 w-full md:w-1/2">
                            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                            <input type="text" required id="phone" name="phone" onChange={handelChange} value={phone} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4 w-full md:w-1/2">
                            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                            <input type="text" required id="pincode" name="pincode" onChange={handelChange} value={pincode} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="mb-4 md:mr-4 w-full md:w-1/2">
                            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                            <input type="text" required id="city" name="city" onChange={handelChange} value={city} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4 w-full md:w-1/2">
                            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                            <input type="text" required id="state" name="state" onChange={handelChange} value={state} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>
                <h2 className='font-semibold text-xl'>2. Checkout</h2>
                <div className="shopCart md:px-8 py-4 mt-2 mb-16">
                    {Object.keys(cart).length == 0 && <div>Your Cart is Empty!</div>}
                    <div className="overflow-x-auto border-2 border-[#dad9d9]">
                        {Object.keys(cart).length != 0 && <table className="min-w-full">
                            <thead className="bg-[#dad9d9] border-b">
                                <tr>
                                    <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 px-6 py-2 md:py-4 text-left">
                                        Name
                                    </th>
                                    <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 px-6 py-2 md:py-4 text-left">
                                        Quntity
                                    </th>
                                    <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 px-6 py-2 md:py-4 text-left">
                                        Price
                                    </th>
                                    <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 px-6 py-2 md:py-4 text-left">
                                        Total Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(cart).map((k) => {
                                    return <tr key={k} className="bg-transparent transition duration-300 ease-in-out hover:bg-[#e8e7e7]">
                                        <td className="text-sm md:text-lg px-6 py-2 whitespace-nowrap">
                                            {cart[k].name} ({cart[k].size},{cart[k].variant})
                                        </td>
                                        <td className="text-sm md:text-lg px-6 py-2 whitespace-nowrap">
                                            <div className="flex items-center"><AiFillMinusCircle className='cursor-pointer' onClick={() => { removeFromCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} /><span className='mx-2'>{cart[k].qty}</span><AiFillPlusCircle className='cursor-pointer' onClick={() => { addToCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} /></div>
                                        </td>
                                        <td className="text-sm md:text-lg px-6 py-2 whitespace-nowrap">
                                            ₹{cart[k].price}
                                        </td>
                                        <td className="text-sm md:text-lg px-6 py-2 whitespace-nowrap">
                                            {cart[k].price + '*' + cart[k].qty + ' = ' + ((cart[k].price) * (cart[k].qty))}
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                    </div>
                    <div className="my-2 mt-6 font-bold">Subtotal : ₹{subtotal}</div>
                    <div className='flex'>
                        <button type='submit' disabled={(subtotal == 0) ? true : false} className="flex mr-auto disabled:bg-indigo-400 text-white items-center bg-indigo-500 border-0 py-2 px-2  md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"> Pay ₹{subtotal}  </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)

    }
    let products = await Product.find({ category: "T-Shirt" })

    return {
        props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to
    }
}

export default Checkout