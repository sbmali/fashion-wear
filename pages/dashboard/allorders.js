import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Order from '../../models/order';
import mongoose from "mongoose";
import Link from 'next/link'
import Sidebar from '../../components/Sidebar';
import { FiDownload } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';
import { FaSearchPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Allorders = ({ orders }) => {
  const [search, setSearch] = useState('')
  const [myOrder, setMyOrder] = useState('')
  const allorders = useRef();
  const handlePrint = useReactToPrint({
    content: () => allorders.current,
  });
  const handelChange = (e) => {
    if (e.target.name == 'search') {
      setSearch(e.target.value)
    }
  }
  const searchOrder = async () => {
    let data = { id: search, searchbyid: true, search }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': ' application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    if (response.sucess) {
      setMyOrder(response.order)
      if (response.order.length == 0) {
        toast.error("Order not found!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    else {
      toast.error(response.error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  useEffect(() => {
    let myAdmin = JSON.parse(localStorage.getItem('myAdmin'))
    try {
      if (!myAdmin) {
        router.push('/')
      }
    } catch (error) {
      if (!myAdmin.token) {
        router.push('/')
      }
    }
  }, [])

  return (
    <>
      <div className='flex mt-8 md:mt-0 mb-8'>
        <Head>
          <title>All Orders | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
        </Head>
        <Sidebar />

        <div className='w-full min-h-screen'>
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
          <div className='flex flex-col md:flex-row -mt-3 mb-6 md:my-8 mx-4 md:mx-24 justify-between space-y-4 md:space-y-0'>
            <h1 className='text-xl md:text-2xl font-bold'>All Orders</h1>
            <div className='flex md:space-x-8'>
              <div className="flex space-x-1">
                <input type="search" id="search" name="search" onChange={handelChange} value={search} placeholder='search...' className="w-2/3 md:w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                <button onClick={searchOrder} className="text-white bg-indigo-500 border-0 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm"><FaSearchPlus /> </button>
              </div>
              <button onClick={handlePrint} className='flex items-center text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm'><FiDownload className='text-l cursor-pointer mr-1' /> Download</button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <table className="min-w-full" ref={allorders}>
                  <thead className="bg-white border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-center">
                        Sr.no.
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-center">
                        Name
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-center">
                        Email
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Order ID
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Status
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Date
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Amount
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(orders).length === 0 && <tr><td className='text-center font-semibold' height={100} colSpan={3}>No Orders</td></tr>}
                    {(!myOrder || myOrder.length == 0) && Object.keys(orders).reverse().map((item) => {
                      return <tr key={orders[item].oid} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td align='center' className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {parseInt(item) + 1}
                        </td>
                        <td align='center' className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {orders[item].name}
                        </td>
                        <td align='center' className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {orders[item].email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {orders[item].oid}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {orders[item].status}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {new Date(orders[item].createdAt).toUTCString()}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {orders[item].amount}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          <Link href={`/order?id=${orders[item].oid}`}><a>details</a></Link>
                        </td>
                      </tr>
                    })}
                    {myOrder && Object.keys(myOrder).reverse().map((item) => {
                      return <tr key={myOrder[item].oid} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td align='center' className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {parseInt(item) + 1}
                        </td>
                        <td align='center' className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {myOrder[item].name}
                        </td>
                        <td align='center' className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {myOrder[item].email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {myOrder[item].oid}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {myOrder[item].status}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {new Date(myOrder[item].createdAt).toUTCString()}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {myOrder[item].amount}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          <Link href={`/order?id=${myOrder[item].oid}`}><a>details</a></Link>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
    return;
  }
  let orders = await Order.find()

  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) }, // will be passed to
  }
}

export default Allorders