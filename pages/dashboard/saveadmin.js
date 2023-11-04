import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Sidebar from '../../components/Sidebar';

const Saveadmin = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [npassword, setNpassword] = useState('')
    const [cpassword, setCpassword] = useState('')
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
            getAdmin()
        }
        else {
            setName('');
            setEmail('');
            setNpassword('');
            setCpassword('');
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query])

    const handelChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value)
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name == 'npassword') {
            setNpassword(e.target.value);
        }
        else if (e.target.name == 'cpassword') {
            setCpassword(e.target.value);
        }
    }
    const add = async (e) => {
        e.preventDefault()
        let response;
        if (npassword == cpassword) {
            const data = { name, email, cpassword, npassword }
            let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addadmin`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': ' application/json',
                },
                body: JSON.stringify(data),
            })
            response = await res.json()
        }
        else {
            response = { sucess: false, error: 'Password not matched!' }
        }
        if (response.sucess) {
            toast.success('Admin created Sucessfully!', {
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
        let data = { updatebyid: true, id, name, email }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            toast.success('Admin updated Sucessfully!', {
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
    const getAdmin = async () => {
        let data = { id, getadmin: true }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            setName(response.admin.name);
            setEmail(response.admin.email);
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
                router.push('/dashboard/alladmin')
            }, 1000);
        }
    }

    return (
        <>
            <div className='flex mt-8 md:mt-0 mb-8'>
                <Head>
                    <title>{id ? 'Update' : 'Add'} Admin | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
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
                        <h1 className='text-2xl font-bold -mt-3 mb-6 md:my-8 mx-4 md:mx-24'>{id ? 'Update' : 'Add'}  Admin</h1>
                        <div className='px-8 md:px-28'>
                            <div className="flex flex-col md:flex-row">
                                <div className="mb-4 md:mr-4 w-full md:w-1/2">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                    <input onChange={handelChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-states duration-200 ease-in-out" required />
                                </div>
                                <div className="mb-4 w-full md:w-1/2">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">E-mail</label>
                                    <input type="email" required id="email" name="email" onChange={handelChange} value={email} autoComplete='email' readOnly={id ? true : false} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-states duration-200 ease-in-out" />
                                </div>
                            </div>
                            {!id && <div className="flex flex-col md:flex-row -mb-4">
                                <div className="mb-4 md:mr-4 w-full md:w-1/2">
                                    <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
                                    <input type="password" id="npassword" name="npassword" onChange={handelChange} value={npassword} autoComplete='new-password' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-states duration-200 ease-in-out" />
                                </div>
                                <div className="mb-4 md:mr-4 w-full md:w-1/2">
                                    <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                                    <input type="password" id="cpassword" name="cpassword" onChange={handelChange} value={cpassword} autoComplete='conform-password' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-states duration-200 ease-in-out" />
                                </div>
                            </div>}
                            {(npassword != cpassword) &&
                                <span className="text-red-500">password not match</span>}
                            <button type='submit' className="flex mt-6 mr-auto disabled:bg-indigo-400 text-white items-center bg-indigo-500 border-0 py-2 px-2  md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">{id ? 'Update' : 'Add'} Admin</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default Saveadmin