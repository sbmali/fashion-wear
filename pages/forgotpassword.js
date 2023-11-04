import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const Forgetpassword = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [token, setToken] = useState('')
    const [host, setHost] = useState(process.env.NEXT_PUBLIC_HOST)
    const router = useRouter()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handelChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
        else if (e.target.name == 'cpassword') {
            setCpassword(e.target.value);
        }
    }
    const sendRestEmail = async (e) => {
        e.preventDefault()
        let data = { email, sendMail: true }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgetpasswordapi`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await a.json()
        if (response.sucess) {
            setToken(response.token)
            setTimeout(() => {
                emailjs.sendForm('service_uchyy8e', 'template_k5exhfc', e.target, 'B3FiuvQc4AkxpalNW')
                    .then((result) => {
                        console.log(result.text);
                        toast.success('Password reset instructions have been sent to your email', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setTimeout(() => {
                            router.push("/login")
                        }, 1000);
                    }, (error) => {
                        console.log(error.text);
                        toast.error(error.text, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    });
            }, 1000);
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
    const resetPassword = async (e) => {
        e.preventDefault()
        let response;
        let token = router.query.token;
        if (password == cpassword) {
            let data = { token, password, sendMail: false }
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgetpasswordapi`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': ' application/json',
                },
                body: JSON.stringify(data),
            })
            response = await a.json()
        }
        else {
            response = { sucess: false, error: 'Password not matched!' }
        }

        if (response.sucess) {
            toast.success('Password has been changed Sucessfully!', {
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
    return (
        <div>
            <Head>
                <title>Forget Password | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
            </Head>
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
            <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 mt-8 md:mt-0">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <center><Image src="/favicon.ico" height={50} width={50} alt="logo" /></center>                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forget Password</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            <Link href={'/login'}><a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Login </a></Link>
                            Or
                            <Link href={'/signup'}><a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Signup to create new Account </a></Link>
                        </p>
                    </div>
                    {router.query.token && <form className="mt-8 space-y-6" onSubmit={resetPassword} method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="password" className="sr-only">New Password</label>
                                <input onChange={handelChange} value={password} id="password" name="password" type="password" autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="New Password" />
                            </div>
                            <div>
                                <label htmlFor="cpassword" className="sr-only">Confirm New Password</label>
                                <input onChange={handelChange} value={cpassword} id="cpassword" name="cpassword" type="password" autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm New Password" />
                            </div>
                        </div>
                        {(password != cpassword) &&
                            <span className="text-red-500 py2">password not match</span>}
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Reset Password
                            </button>
                        </div>
                    </form>}
                    {!router.query.token && <form className="mt-8 space-y-6" onSubmit={sendRestEmail} method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input onChange={handelChange} value={email} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            </div>
                            <div>
                                <input onChange={handelChange} value={token} id="token" name="token" type="token" autoComplete="token" className="hidden appearance-none rounded-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="token" />
                                <input onChange={handelChange} value={host} id="host" name="host" type="host" autoComplete="host" className="hidden appearance-none rounded-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="host" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Continue
                            </button>
                        </div>
                    </form>}
                </div>
            </div>
        </div>
    )
}

export default Forgetpassword