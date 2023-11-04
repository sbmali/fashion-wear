import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { FaEdit, FaSearchPlus } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import Product from "../../models/product"
import mongoose from "mongoose";

const Allproduct = ({ products }) => {
    const router = useRouter()
    const [productId, setProductId] = useState('')
    const [productName, setProductName] = useState('')
    const [search, setSearch] = useState('')
    const [product, setProduct] = useState()
    const [modelOpen, setModelOpen] = useState(false)

    const closeModal = () => {
        setModelOpen(false)
    }
    const modalSucess = () => {
        deleteProduct(productId)
        setModelOpen(false)
    }

    const handelChange = (e) => {
        if (e.target.name == 'search') {
            setSearch(e.target.value)
        }
    }
    const searchProduct = async () => {
        let data = { id: search, searchbyid: true, search }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            setProduct(response.product)
            if (response.product.length == 0) {
                toast.error('Product not found!', {
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
    const deleteProduct = async (productId) => {
        let data = { id: productId, deletebyid: true }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            toast.success('Product deleted Sucessfully!!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            router.push("/dashboard/allproduct")
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
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className='flex mt-8 md:mt-0 mb-16'>
                <Head>
                    <title>All Products | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
                </Head>
                <Sidebar />
                {modelOpen && <Modal closeModal={closeModal} message={`Confirm Delete Product: ${productName}`} sucessButton="Delete" modalSucess={modalSucess} />}

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
                        <h1 className='text-xl md:text-2xl font-bold'>All Products</h1>
                        <div className='flex space-x-1'>
                            <input type="search" id="search" name="search" onChange={handelChange} value={search} placeholder='search...' className="w-2/3 md:w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            <button onClick={searchProduct} className="text-white bg-indigo-500 border-0 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm"><FaSearchPlus /> </button>
                        </div>
                    </div>
                    <section className="mx-auto text-gray-600 body-font">
                        <div className="container px-5 -my-8 md:py-4 mx-auto">
                            <div className="flex flex-wrap md:mx-4 -m-4 justify-center">
                                {Object.keys(products).length === 0 && <p className='my-32'>Sorry all the products are currently out of stock. New Stock comming soon. Stay tunned!!</p>}
                                <div className="flex flex-wrap justify-evenly md:justify-center my-8 -m-4">
                                    {(!product || product.length == 0) && Object.keys(products).map((item) => {
                                        return <div key={products[item]._id} className="w-11/12 md:w-1/2 mx-6 md:mx-0 py-2 md:p-4">
                                            <div className="border-2 shadow-lg p-2 md:p-4  flex flex-row items-center text-left text-xs md:text-base">
                                                <div className="w-20 md:w-44 flex-shrink-0 rounded-lg object-cover object-center">
                                                    <Image height={150} width={150} src={products[item].img} alt="product" />
                                                </div>
                                                <div className="flex-grow ml-2 md:m-0">
                                                    <h2 className="title-font font-medium text-xs md:text-lg text-gray-900">ID : {products[item]._id}</h2>
                                                    <h3 className="text-gray-500 my-1 space-x-2 md:space-x-4">
                                                        <span>{products[item].category}</span>
                                                        <span>{products[item].title}</span>
                                                        <span>({products[item].size}, {products[item].color})</span>
                                                    </h3>
                                                    <div className='flex mb-1 space-x-4 justify-start'>
                                                        <h3 className="text-gray-500">Price : {products[item].price}</h3>
                                                        <h3 className="text-gray-500">Quantity : {products[item].availableQty}</h3>
                                                    </div>
                                                    <h3 className="text-gray-500">Slug : {products[item].slug}</h3>
                                                </div>
                                                <div className='ml-2 md:ml-4 space-y-2 transform -translate-y-6 md:-translate-y-12 text-xs md:text-xl font-bold'>
                                                    <Link href={`/dashboard/saveproduct?id=${products[item]._id}`} ><a><FaEdit /></a></Link>
                                                    <MdDeleteForever onClick={() => { setProductId(products[item]._id); setProductName(products[item].title); setModelOpen(true); }} className='text-sm md:text-2xl cursor-pointer -m-0.5 md:-m-1' />
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                    {product && Object.keys(product).reverse().map((item) => {
                                        return <div key={product[item]._id} className={`w-11/12 md:w-${product.length > 1 ? '1/2' : 'full'} mx-6 md:mx-0 py-2 md:p-4`}>
                                            <div className="border-2 shadow-lg p-2 md:p-4  flex flex-row items-center text-left text-xs md:text-base">
                                                <div className="w-20 md:w-44 flex-shrink-0 rounded-lg object-cover object-center">
                                                    <Image height={150} width={150} src={product[item].img} alt="product" />
                                                </div>
                                                <div className="flex-grow ml-2 md:m-0">
                                                    <h2 className="title-font font-medium text-xs md:text-lg text-gray-900">ID : {product[item]._id}</h2>
                                                    <h3 className="text-gray-500 my-1 space-x-2 md:space-x-4">
                                                        <span>{product[item].category}</span>
                                                        <span>{product[item].title}</span>
                                                        <span>({product[item].size}, {product[item].color})</span>
                                                    </h3>
                                                    <div className='flex mb-1 space-x-4 justify-start'>
                                                        <h3 className="text-gray-500">Price : {product[item].price}</h3>
                                                        <h3 className="text-gray-500">Quantity : {product[item].availableQty}</h3>
                                                    </div>
                                                    <h3 className="text-gray-500">Slug : {product[item].slug}</h3>
                                                </div>
                                                <div className='ml-2 md:ml-4 space-y-2 transform -translate-y-6 md:-translate-y-12 text-xs md:text-xl font-bold'>
                                                    <Link href={`/dashboard/saveproduct?id=${product[item]._id}`} ><a><FaEdit /></a></Link>
                                                    <MdDeleteForever onClick={() => { setProductId(product[item]._id); setProductName(products[item].title); setModelOpen(true) }} className='text-sm md:text-2xl cursor-pointer -m-0.5 md:-m-1' />
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let products = await Product.find()
    return {
        props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to
    }
}

export default Allproduct