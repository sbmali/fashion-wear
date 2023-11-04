import React, { useRef } from 'react'
import Head from 'next/head'
import Order from '../models/Order';
import mongoose from "mongoose";
import Link from 'next/link'
import { AiFillPrinter } from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import Invoice from '../components/Invoice';

const Orderr = ({ order }) => {
    const printInvoice = useRef();
    const handlePrint = useReactToPrint({
        content: () => printInvoice.current,
    });
    return (
        <div>
            <Head>
                <title>Order | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
            </Head>
            <section className="text-gray-600 body-font mt-8 md:mt-0">
                <div className="container px-6 md:px-12 -pt-4 md:py-8 mx-auto">
                    <div className="lg:w-11/12 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-xs md:text-sm title-font text-gray-500 tracking-widest">{process.env.NEXT_PUBLIC_WEBSITE_NAME}.com</h2>
                            <h1 className="text-gray-900 md:text-2xl title-font font-medium mb-4">Order Id : {order.oid}</h1>
                            <p className="leading-relaxed">Your order has been sucessfully placed</p>
                            <p className="leading-relaxed">Transaction ID : {order.status}</p>
                            <p className="leading-relaxed">Order placed on : {new Date(order.createdAt).toUTCString()}</p>
                            <p className="leading-relaxed mb-4">Order status is {order.status} on {new Date(order.updatedAt).toUTCString()}</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 px-6 py-4 text-left">
                                                Item Discription
                                            </th>
                                            <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 px-6 py-4 text-left">
                                                Price
                                            </th>
                                            <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 px-6 py-4 text-left">
                                                Quantity
                                            </th>
                                            <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 px-6 py-4 text-left">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(order.products).map((item) => {
                                            return <tr key={item} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td className="text-sm md:text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <Link key={item} href={`/product/${item}`} >{order.products[item].name}</Link>
                                                </td>
                                                <td className="text-sm md:text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {order.products[item].price}
                                                </td>
                                                <td className="text-sm md:text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {order.products[item].qty}
                                                </td>
                                                <td className="text-sm md:text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    ₹{(order.products[item].price) * (order.products[item].qty)}
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex flex-col mt-4 space-y-6">
                                <span className="title-font font-medium text-xl text-gray-900">Total Amount : ₹{order.amount}</span>
                                <div className='flex space-x-8'>
                                    <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track</button>
                                    <button onClick={handlePrint} className='flex items-center text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm'><AiFillPrinter className='text-xl cursor-pointer mr-1' /> Print Invoice</button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h1 className='text-black font-semibold text-xl my-4'>Personal Details</h1>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 md:px-6 py-2 text-left">
                                                Name :
                                            </th>
                                            <th scope="col" className="text-sm md:text-lg text-gray-900 text-left font-light px-6 py-2 whitespace-nowrap">
                                                {order.name}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 md:px-6 py-2 text-left">
                                                E-mail :
                                            </th>
                                            <th scope="col" className="text-sm md:text-lg text-gray-900 text-left font-light px-6 py-2 whitespace-nowrap">
                                                {order.email}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 md:px-6 py-2 text-left">
                                                Phone :
                                            </th>
                                            <th scope="col" className="text-sm md:text-lg text-gray-900 text-left font-light px-6 py-2 whitespace-nowrap">
                                                {order.phone}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 md:px-6 py-2 text-left">
                                                Pincode:
                                            </th>
                                            <th scope="col" className="text-sm md:text-lg text-gray-900 text-left font-light px-6 py-2 whitespace-nowrap">
                                                {order.pincode}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 md:px-6 py-2 text-left">
                                                City :
                                            </th>
                                            <th scope="col" className="text-sm md:text-lg text-gray-900 text-left font-light px-6 py-2 whitespace-nowrap">
                                                {order.city}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 md:px-6 py-2 text-left">
                                                State :
                                            </th>
                                            <th scope="col" className="text-sm md:text-lg text-gray-900 text-left font-light px-6 py-2 whitespace-nowrap">
                                                {order.state}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-sm md:text-lg font-medium text-gray-900 md:px-6 py-2 text-left">
                                                Address:
                                            </th>
                                            <th scope="col" className="text-sm md:text-lg text-gray-900 text-left font-light px-6 py-2">
                                                {order.address}
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="hidden">
                <div  ref={printInvoice}>
                    <Invoice order={order} />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let orders = await Order.find({})
    let order = await Order.findOne({ oid: context.query.id })

    return {
        props: {
            order: JSON.parse(JSON.stringify(order)),
            orders: JSON.parse(JSON.stringify(orders))
        }, // will be passed to
    }
}

export default Order