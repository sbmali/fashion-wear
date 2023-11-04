import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Product from '../../models/Product';
import mongoose from "mongoose";
import Error from 'next/error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = ({ error, addToCart, buyNow, product, variant }) => {
    const router = useRouter();
    const { slug } = router.query
    if (error == 404) {
        return <Error statusCode={404} />
    }
    return (
        <div>
            <Head>
                <title>{product.title}  |  {product.category}  |  {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
            </Head>
            <section className="text-gray-600 body-font overflow-hidden mb-12 md:mb-32 mt-8 md:mt-0">
                <div className="container px-5 md:mt-16 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
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
                        <Image alt="ecommerce" className="lg:w-1/3 w-full rounded" height={300} width={350} src={product.img} />
                        <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{process.env.NEXT_PUBLIC_WEBSITE_NAME}</h2>
                            <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-1">{product.title}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed">{product.desc}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    <div className="mt-0.5">
                                        {(product.color == 'red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                                        {(product.color == 'blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                                        {(product.color == 'black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                                        {(product.color == 'yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                                        {(product.color == 'green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                                        {(product.color == 'purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                                    </div>
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="">
                                        <span className='border border-gray-300 text-sm md:text-base px-1 mx-1'>{product.size}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-start">
                                {(product.availableQty > 0) && <span className="title-font font-medium text-xl md:text-2xl text-gray-900">₹{product.price}</span>}
                                {(product.availableQty <= 0) && <span className="title-font font-medium text-xl md:text-2xl text-gray-900">Out of Stock</span>}
                                <button disabled={product.availableQty <= 0} onClick={() => { addToCart(product.slug, product.availableQty, product.price, product.title, product.size, product.color) }} className="flex ml-4 md:ml-16 text-white bg-indigo-500 border-0 py-1 px-2 md:px-3 md:py-2 focus:outline-none hover:bg-indigo-600 disabled:bg-indigo-300 rounded text-sm md:text-lg">Add to Cart</button>
                                <button disabled={product.availableQty <= 0} onClick={() => { buyNow(product.slug, product.availableQty, product.price, product.title, product.size, product.color) }} className="flex ml-4 text-white bg-indigo-500 border-0 py-1 px-2 md:px-3 md:py-2 focus:outline-none hover:bg-indigo-600 disabled:bg-indigo-300 rounded text-sm md:text-lg">Buy Now</button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    let error;
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let product = await Product.findOne({ slug: context.query.slug })
    if (product == null) {
        return {
            props: { error: 404 },
        }
    }
    let variant = await Product.find({ title: product.title })

    return {
        props: { product: JSON.parse(JSON.stringify(product)), variant: JSON.parse(JSON.stringify(variant)) }, // will be passed to
    }
}

export default Slug