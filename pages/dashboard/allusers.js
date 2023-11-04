import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import User from "../../models/user"
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

const Allusers = ({ users }) => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [userName, setUserName] = useState('')
    const [userid, setUserid] = useState('')
    const [user, setUser] = useState()
    const allorders = useRef();const [modelOpen, setModelOpen] = useState(false)

    const closeModal = () => {
        setModelOpen(false)
    }
    const modalSucess = () => {
        deleteUser(userid)
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
    const searchUser = async () => {
        let data = { id: search, search, searchbyid: true }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            setUser(response.user)
            if(response.user.length == 0){
                toast.error('User not found!', {
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
    const deleteUser = async (userId) => {
        let data = { id: userId, deletebyid: true }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            toast.success('User deleted Sucessfully!!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            router.push("/dashboard/allusers")
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
                    <title>All Users | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
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
                    {modelOpen && <Modal closeModal={closeModal} message={`Confirm Delete User: ${userName}`} sucessButton="Delete" modalSucess={modalSucess} />}
    
                    <div className='flex flex-col md:flex-row -mt-3 mb-6 md:my-8 mx-4 md:mx-24 justify-between space-y-4 md:space-y-0'>
                        <h1 className='text-xl md:text-2xl font-bold'>All Users</h1>
                        <div className='flex md:space-x-8'>
                            <div className="flex space-x-1">
                                <input type="search" id="search" name="search" onChange={handelChange} value={search} placeholder='search...' className="w-2/3 md:w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                <button onClick={searchUser} className="text-white bg-indigo-500 border-0 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm"><FaSearchPlus /> </button>
                            </div>
                            <button onClick={handlePrint} className='flex items-center text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm'><FiDownload className='text-l cursor-pointer mr-1' /> Download</button>
                        </div>
                    </div>

                    <div className="flex flex-col py-4">
                        <div className="overflow-x-auto sm:-mx-6 lg:mx-0">
                            <div className="py-2 inline-block min-w-full sm:px-3 lg:px-8">
                                <table className="min-w-full mx-4 md:mx-0" ref={allorders}>
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                                                Sr. no.
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                                                Action
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                                                User ID
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                                                Name
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                                                E-mail
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                                                Phone
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                                                Address
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                                                Pincode
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                                                City
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                                                State
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(users).length === 0 && <tr><td className='text-center font-semibold' height={100} colSpan={3}>No Users!!</td></tr>}
                                        {(!user || user.length == 0) && Object.keys(users).reverse().map((item) => {
                                            return <tr key={users[item]._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap text-center">
                                                    {parseInt(item) + 1}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    <Link href={`/dashboard/saveuser?id=${users[item]._id}`} ><a><FaEdit /></a></Link>
                                                    <MdDeleteForever onClick={() => { setUserid(users[item]._id); setUserName(users[item].name); setModelOpen(true) }} className='text-xl cursor-pointer -m-1 mt-2' />
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {users[item]._id}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {users[item].name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {users[item].email}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {users[item].phone}
                                                </td>
                                                <td className="text-sm md:text-xs text-gray-900 font-light px-3 py-4 whitespace-nowrap md:whitespace-normal">
                                                    {users[item].address}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {users[item].pincode}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {users[item].city}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {users[item].state}
                                                </td>

                                            </tr>
                                        })}
                                        {user && Object.keys(user).map((item) => {
                                            return <tr key={user[item]._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap text-center">
                                                    {parseInt(item) + 1}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    <Link href={`/dashboard/saveuser?id=${user[item]._id}`} ><a><FaEdit /></a></Link>
                                                    <MdDeleteForever onClick={() => { setUserid(user[item]._id); setUserName(users[item].name); setModelOpen(true) }} className='text-xl cursor-pointer -m-1 mt-2' />
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {user[item]._id}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {user[item].name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {user[item].email}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {user[item].phone}
                                                </td>
                                                <td className="text-sm md:text-xs text-gray-900 font-light px-3 py-4 whitespace-nowrap md:whitespace-normal">
                                                    {user[item].address}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {user[item].pincode}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {user[item].city}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                                                    {user[item].state}
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
    let users = await User.find()
    return {
        props: { users: JSON.parse(JSON.stringify(users)) }, // will be passed to
    }
}

export default Allusers