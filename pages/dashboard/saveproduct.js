import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Sidebar from '../../components/Sidebar';

const Addproduct = () => {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [imgurl, setImgurl] = useState('')
    const [category, setCategory] = useState('')
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [price, setPrice] = useState('')
    const [availableQty, setAvailableQty] = useState('')
    const router = useRouter()
    const id = router.query.id

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

        if (id) {
            getProduct()
        }
        else {
            setTitle('');
            setSlug('');
            setDescription('');
            setImgurl('');
            setCategory('');
            setSize('');
            setColor('');
            setPrice('');
            setAvailableQty('');
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query])

    const handelChange = (e) => {
        if (e.target.name == 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name == 'slug') {
            setSlug(e.target.value);
        }
        else if (e.target.name == 'description') {
            setDescription(e.target.value);
        }
        else if (e.target.name == 'imgurl') {
            setImgurl(e.target.value);
        }
        else if (e.target.name == 'category') {
            setCategory(e.target.value);
        }
        else if (e.target.name == 'size') {
            setSize(e.target.value);
        }
        else if (e.target.name == 'color') {
            setColor(e.target.value);
        }
        else if (e.target.name == 'price') {
            setPrice(e.target.value);
        }
        else if (e.target.name == 'availableQty') {
            setAvailableQty(e.target.value);
        }
    }
    const add = async (e) => {
        e.preventDefault()
        const data = { title, slug, description, imgurl, category, size, color, price, availableQty }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            toast.success('Product created Sucessfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
    const update = async (e) => {
        e.preventDefault()
        let data = { updatebyid: true, id, title, slug, description, imgurl, category, size, color, price, availableQty }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            toast.success('Product updated Sucessfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
    const getProduct = async () => {
        let data = { id, getproduct: true }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            setTitle(response.product.title);
            setSlug(response.product.slug);
            setDescription(response.product.desc);
            setImgurl(response.product.img);
            setCategory(response.product.category);
            setSize(response.product.size);
            setColor(response.product.color);
            setPrice(response.product.price);
            setAvailableQty(response.product.availableQty);
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
            setTimeout(() => {
                router.push('/dashboard/allproduct')
            }, 1000);
        }
    }

    return (
        <>
            <div className='flex mt-8 md:mt-0 mb-8'>
                <Head>
                    <title>{id ? 'Update' : 'Add'} Product | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
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
                    <form method='POST' onSubmit={id ? update : add}>
                        <h1 className='text-2xl font-bold -mt-3 mb-6 md:my-8 mx-4 md:mx-24'>{id ? 'Update' : 'Add'}  Product</h1>
                        <div className='px-8 md:px-28'>
                            <div className="flex flex-col md:flex-row">
                                <div className="mb-4 md:mr-4 w-full md:w-1/2">
                                    <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                                    <input onChange={handelChange} value={title} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                                </div>
                                <div className="mb-4 w-full md:w-1/2">
                                    <label htmlFor="slug" className="leading-7 text-sm text-gray-600">Slug</label>
                                    <input type="text" required id="slug" name="slug" onChange={handelChange} value={slug} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="pb-4">
                                <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                                <textarea id="description" required name="description" onChange={handelChange} value={description} rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                            <div className="flex flex-col md:flex-row">
                                <div className="mb-4 md:mr-4 w-full md:w-1/2">
                                    <label htmlFor="imgurl" className="leading-7 text-sm text-gray-600">Image URL</label>
                                    <input type="text" required id="imgurl" name="imgurl" onChange={handelChange} value={imgurl} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div className="mb-4 w-full md:w-1/2">
                                    <label htmlFor="category" className="leading-7 text-sm text-gray-600">Category</label>
                                    <input type="text" required id="category" name="category" onChange={handelChange} value={category} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row">
                                <div className="mb-4 md:mr-4 w-full md:w-1/2">
                                    <label htmlFor="size" className="leading-7 text-sm text-gray-600">Size</label>
                                    <input type="text" required id="size" name="size" onChange={handelChange} value={size} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div className="mb-4 w-full md:w-1/2">
                                    <label htmlFor="color" className="leading-7 text-sm text-gray-600">Colour</label>
                                    <input type="text" required id="color" name="color" onChange={handelChange} value={color} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row">
                                <div className="mb-4 md:mr-4 w-full md:w-1/2">
                                    <label htmlFor="price" className="leading-7 text-sm text-gray-600">Price</label>
                                    <input type="number" required id="price" name="price" onChange={handelChange} value={price} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div className="mb-4 w-full md:w-1/2">
                                    <label htmlFor="availableQty" className="leading-7 text-sm text-gray-600">Available Quantity</label>
                                    <input type="number" required id="availableQty" name="availableQty" onChange={handelChange} value={availableQty} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <button type='submit' className="flex mr-auto disabled:bg-indigo-400 text-white items-center bg-indigo-500 border-0 py-2 px-2  md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">{id ? 'Update' : 'Add'} Product</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Addproduct