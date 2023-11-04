import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Admin from "../../models/admin"
import mongoose from "mongoose";
import { FaEdit, FaSearchPlus } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Sidebar from '../../components/Sidebar';
import { FiDownload } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';
import Modal from '../../components/Modal';

const Alladmin = ({ admins }) => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [admin, setAdmin] = useState()
    const [adminId, setAdminId] = useState('')
    const [adminName, setAdminName] = useState('')
    const allorders = useRef();
    const [modelOpen, setModelOpen] = useState(false)

    const closeModal = () => {
        setModelOpen(false)
    }
    const modalSucess = () => {
        deleteadmin(adminId)
        setModelOpen(false)
    }
    const handlePrint = useReactToPrint({
        content: () => allorders.current,
    });
    const handelChange = (e) => {
        if (e.target.name == 'search') {
            setSearch(e.target.value)
        }
    }
    const searchadmin = async () => {
        let data = { id: search, search, searchbyid: true }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            setAdmin(response.admin)
            if (response.admin.length == 0) {
                toast.error('Admin not found!', {
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
    const deleteadmin = async (adminId) => {
        let data = { id: adminId, deletebyid: true }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            toast.success('Admin deleted Sucessfully!!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            router.push("/dashboard/alladmin")
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
            <div className='flex mt-8 md:mt-0 mb-8'>
                <Head>
                    <title>All Admins | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
                </Head>
                <Sidebar />
                {modelOpen && <Modal closeModal={closeModal} message={`Confirm Delete Admin: ${adminName}`} sucessButton="Delete" modalSucess={modalSucess} />}

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
                        <h1 className='text-xl md:text-2xl font-bold'>All Admins</h1>
                        <div className='flex md:space-x-8'>
                            <div className="flex space-x-1">
                                <input type="search" id="search" name="search" onChange={handelChange} value={search} placeholder='search...' className="w-2/3 md:w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                <button onClick={searchadmin} className="text-white bg-indigo-500 border-0 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm"><FaSearchPlus /> </button>
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
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                Sr. no.
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Action
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Admin ID
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Name
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                E-mail
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(admins).length === 0 && <tr><td className='text-center font-semibold' height={100} colSpan={3}>No admins!!</td></tr>}
                                        {(!admin || admin.length == 0) && Object.keys(admins).reverse().map((item) => {
                                            return <tr key={admins[item]._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td align='center' className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {parseInt(item) + 1}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <Link href={`/dashboard/saveadmin?id=${admins[item]._id}`} ><a><FaEdit /></a></Link>
                                                    <MdDeleteForever onClick={() => { setAdminId(admins[item]._id); setAdminName(admins[item].name); setModelOpen(true) }} className='text-xl cursor-pointer -m-1 mt-2' />
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {admins[item]._id}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {admins[item].name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {admins[item].email}
                                                </td>
                                            </tr>
                                        })}
                                        {admin && Object.keys(admin).reverse().map((item) => {
                                            return <tr key={admin[item]._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td align='center' className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {parseInt(item) + 1}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <Link href={`/dashboard/saveadmin?id=${admin[item]._id}`} ><a><FaEdit /></a></Link>
                                                    <MdDeleteForever onClick={() => { setAdminId(admin[item]._id); setAdminName(admin[item].name); setModelOpen(true) }} className='text-xl cursor-pointer -m-1 mt-2' />
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {admin[item]._id}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {admin[item].name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {admin[item].email}
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
    }
    let admins = await Admin.find()
    return {
        props: { admins: JSON.parse(JSON.stringify(admins)) }, // will be passed to
    }
}

export default Alladmin