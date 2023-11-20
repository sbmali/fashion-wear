import React, { Component } from 'react'

export class Invoice extends Component {
    render() {
        let {order} = this.props;
        let date = new Date().toDateString();
        let d = new Date()
        return (
            <>
                <div className='mx-auto px-12 py-4'>

                    <div className="flex justify-between items-center pb-4 mb-4 border-b-4">
                        <div className='flex flex-col'>
                            <span>Invoice no. : 001</span>
                            <span>Date : {date}</span>
                        </div>
                        <h1 className="text-3xl font-bold">Invoice</h1>
                        <div className="">
                            <h1 className="text-2xl font-semibold">{process.env.NEXT_PUBLIC_WEBSITE_NAME}</h1>
                            <p>from Nashik, Maharashtra</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-16 mb-12">
                        <div className='w-48'>
                            <h2 className='font-bold'>Bill to,</h2>
                            <p>{order.address}</p>
                        </div>
                        <div className='w-48'>
                            <h2 className='font-bold'>Ship to,</h2>
                            <p>{order.address}</p>
                        </div>
                        <div className='w-48'>
                            <h2 className='font-bold'>Ship from,</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi provident minus suscipit!</p>
                        </div>
                    </div>

                    <div className="md:px-32 py-8">
                        <div className="shadow overflow-hidden rounded border-b border-gray-200">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Item</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                {Object.keys(order.products).map((item) => {
                                            return <tr key={item} className=''>
                                        <td className="text-left py-3 px-4">{order.products[item].name} ({order.products[item].size}/{order.products[item].variant})</td>
                                        <td className="text-left py-3 px-4">{order.products[item].qty}</td>
                                        <td className="text-left py-3 px-4">₹{order.products[item].price}</td>
                                        <td className="text-left py-3 px-4">₹{(order.products[item].price) * (order.products[item].qty)}</td>
                                    </tr>
                                })}
                                    <tr>
                                        <td></td><td></td><td></td>
                                        <td className='font-bold py-3 px-4' colSpan={4}>SubTotal : ₹{order.amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-between absolute bottom-24">
                        <h1 className="text-xl font-bold">Thank you for purchase!</h1>
                        <div className="ml-40">
                            <div className="w-72 border-b-4 border-black"></div>
                            <div className="text-center mt-2">Administrator</div>
                        </div>
                    </div>

                    <div className="text-center absolute bottom-5 left-64">This is an computer generated invoice.</div>

                </div>
            </>
        )
    }
}

export default Invoice