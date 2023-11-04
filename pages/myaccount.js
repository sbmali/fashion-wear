import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/Modal';

const Myaccount = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [password, setPassword] = useState('')
  const [npassword, setNpassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [token, setToken] = useState('')
  const [modelOpen, setModelOpen] = useState(false)

  const closeModal = () => {
    setModelOpen(false)
  }
  const modalSucess = () => {
    deleteUser()
    setModelOpen(false)
  }

  const handelChange = async (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value);
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value);
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value);
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value);
    }
    else if (e.target.name == 'city') {
      setCity(e.target.value);
    }
    else if (e.target.name == 'state') {
      setState(e.target.value);
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value);
    }
    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value);
    }
    else if (e.target.name == 'npassword') {
      setNpassword(e.target.value);
    }
  }

  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem('myUser'))
    try {
      if (!myUser) {
        router.push('/')
      }
    } catch (error) {
      if (!myUser.token) {
        router.push('/')
      }
    }
    try {
      setEmail(myUser.email)
      setToken(myUser.token)
      fetchUser(myUser.token)
    } catch (error) {

    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUser = async (token) => {
    const data = { token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await a.json()
    setName(response.name)
    setAddress(response.address)
    setPhone(response.phone)
    setPincode(response.pincode)
    setCity(response.city)
    setState(response.state)
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, address, password, phone, pincode, city, state, token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await a.json()
    if (response.sucess) {
      toast.success('Account updated Sucessfully!', {
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
      toast.error('Something went wrong. Please try again!', {
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

  const handelPasswordSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (npassword == cpassword) {
      const data = { npassword, cpassword, password, token };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      response = await a.json()
    }
    else {
      response = { sucess: false }
    }
    if (response.sucess) {
      toast.success('Password updated Sucessfully!', {
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
      toast.error('Password did not match. Please try again!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setPassword('')
    setNpassword('')
    setCpassword('')
  }

  const deleteUser = async () => {
    let data = { email: email, deletebyemail: true }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': ' application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    if (response.sucess) {
      toast.success('Account deleted Sucessfully!!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/")
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
    <div className='mx-auto mb-12'>
      <Head>
        <title>My Account | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
      </Head>
      {modelOpen && <Modal closeModal={closeModal} message={`Confirm Delete User`} sucessButton="Delete" modalSucess={modalSucess} />}
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

      <div className='mx-4 md:mx-24 mt-8 md:mt-0'>
        <h1 className='text-2xl font-bold text-center -mt-4 mb-4 md:my-8'>My Account</h1>
        <form onSubmit={handelSubmit}>
          <h2 className='font-semibold text-xl'>1. Details</h2>
          <div className='p-4'>
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 md:mr-4 w-full md:w-1/2">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                <input onChange={handelChange} value={name} type="text" id="name" name="name" autoComplete="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              <div className="mb-4 w-full md:w-1/2">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" required id="email" name="email" onChange={handelChange} value={email} autoComplete="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
              </div>
            </div>
            <div className="pb-4">
              <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
              <textarea id="address" name="address" onChange={handelChange} value={address} rows="2" autoComplete="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 md:mr-4 w-full md:w-1/2">
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                <input type="number" id="phone" name="phone" onChange={handelChange} value={phone} autoComplete="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              <div className="mb-4 w-full md:w-1/2">
                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                <input type="number" id="pincode" name="pincode" onChange={handelChange} value={pincode} autoComplete="PIN code" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 md:mr-4 w-full md:w-1/2">
                <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                <input type="text" id="city" name="city" onChange={handelChange} value={city} autoComplete="City" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
              <div className="mb-4 w-full md:w-1/2">
                <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                <input type="text" id="state" name="state" onChange={handelChange} value={state} autoComplete="State" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <button type='submit' className="flex mb-4 text-white items-center bg-indigo-500 border-0 py-2 px-2 md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">Save Changes</button>
          </div>
        </form>
        <form onSubmit={handelPasswordSubmit}>
          <h2 className='font-semibold text-xl'>2. Change Password</h2>
          <div className='p-4'>
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 w-full md:w-1/3">
                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                <input onChange={handelChange} value={password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete="password" />
              </div>
              <div className="mb-4 md:ml-8 w-full md:w-1/3">
                <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
                <input onChange={handelChange} value={npassword} type="password" required id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete="npassword" />
              </div>
              <div className="mb-4 md:ml-8 w-full md:w-1/3">
                <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
                <input onChange={handelChange} value={cpassword} type="password" required id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete="cpassword" />
              </div>
            </div>
            <button type='submit' className="flex text-white items-center bg-indigo-500 border-0 py-2 px-2 md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">Change Password</button>
          </div>
        </form>
        <div className="my-4">
          <h2 className='font-semibold text-xl'>3. Delete Account</h2>
          <button onClick={() => { setModelOpen(true) }} className="flex m-4 text-white items-center bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default Myaccount