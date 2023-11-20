import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa';
import { useRouter } from 'next/router'

const Sidebar = () => {
    const router = useRouter();
    const refSidebar = useRef();
    const [flag, setFlag] = useState(false)
    const toggleFlag = () =>{
        if(flag){
            setFlag(false)
        }
        else{
            setFlag(true)
        }
    }
    let toggleSidebar = () => {
        if (refSidebar.current.classList.contains("w-60")) {
            refSidebar.current.classList.remove("w-60");
            refSidebar.current.classList.add("w-16");
            toggleFlag()
        }
        else if (refSidebar.current.classList.contains("w-16")) {
            refSidebar.current.classList.remove("w-16");
            refSidebar.current.classList.add("w-60");
            toggleFlag()
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
    }, [router.query])

    return (
        <div ref={refSidebar} className="hidden md:block w-60 p-4 h-[100vh] bg-white shadow-xl sticky">
            <FaBars onClick={toggleSidebar} className='mx-2 mb-4 cursor-pointer' />
            <ul className=''>
                <Link href={'/dashboard'}><a><li className={`${router.pathname == '/dashboard' ?'bg-indigo-400':''} w-full pl-4 py-2 hover:bg-indigo-400 flex items-center space-x-2`}><FaBars className={`cursor-pointer ${flag?'-mx-2':'mx-0'}`} /><span className={`${flag?'hidden':'block'}`}>Dashboard</span></li></a></Link>
                <Link href={'/dashboard/allproduct'}><a><li className={`${router.pathname == '/dashboard/allproduct' ?'bg-indigo-400':''} w-full pl-4 py-2 hover:bg-indigo-400 flex items-center space-x-2`}><FaBars className={`cursor-pointer ${flag?'-mx-2':'mx-0'}`} /><span className={`${flag?'hidden':'block'}`}>All Products</span></li></a></Link>
                <Link href={'/dashboard/saveproduct'}><a><li className={`${router.pathname == '/dashboard/saveproduct' ?'bg-indigo-400':''} w-full pl-4 py-2 hover:bg-indigo-400 flex items-center space-x-2`}><FaBars className={`cursor-pointer ${flag?'-mx-2':'mx-0'}`} /><span className={`${flag?'hidden':'block'}`}>Add Products</span></li></a></Link>
                <Link href={'/dashboard/allusers'}><a><li className={`${router.pathname == '/dashboard/allusers' ?'bg-indigo-400':''} w-full pl-4 py-2 hover:bg-indigo-400 flex items-center space-x-2`}><FaBars className={`cursor-pointer ${flag?'-mx-2':'mx-0'}`} /><span className={`${flag?'hidden':'block'}`}>All Users</span></li></a></Link>
                <Link href={'/dashboard/saveuser'}><a><li className={`${router.pathname == '/dashboard/saveuser' ?'bg-indigo-400':''} w-full pl-4 py-2 hover:bg-indigo-400 flex items-center space-x-2`}><FaBars className={`cursor-pointer ${flag?'-mx-2':'mx-0'}`} /><span className={`${flag?'hidden':'block'}`}>Add User</span></li></a></Link>
                <Link href={'/dashboard/alladmin'}><a><li className={`${router.pathname == '/dashboard/alladmin' ?'bg-indigo-400':''} w-full pl-4 py-2 hover:bg-indigo-400 flex items-center space-x-2`}><FaBars className={`cursor-pointer ${flag?'-mx-2':'mx-0'}`} /><span className={`${flag?'hidden':'block'}`}>All Admins</span></li></a></Link>
                <Link href={'/dashboard/saveadmin'}><a><li className={`${router.pathname == '/dashboard/saveadmin' ?'bg-indigo-400':''} w-full pl-4 py-2 hover:bg-indigo-400 flex items-center space-x-2`}><FaBars className={`cursor-pointer ${flag?'-mx-2':'mx-0'}`} /><span className={`${flag?'hidden':'block'}`}>Add Admin</span></li></a></Link>
                <Link href={'/dashboard/allorders'}><a><li className={`${router.pathname == '/dashboard/allorders' ?'bg-indigo-400':''} w-full pl-4 py-2 hover:bg-indigo-400 flex items-center space-x-2`}><FaBars className={`cursor-pointer ${flag?'-mx-2':'mx-0'}`} /><span className={`${flag?'hidden':'block'}`}>All Orders</span></li></a></Link>
                <Link href={'/dashboard/productAnalysis'}><a><li className={`${router.pathname == '/dashboard/productAnalysis' ?'bg-indigo-400':''} w-full pl-4 py-2 hover:bg-indigo-400 flex items-center space-x-2`}><FaBars className={`cursor-pointer ${flag?'-mx-2':'mx-0'}`} /><span className={`${flag?'hidden':'block'}`}>Product Analysis</span></li></a></Link>
            </ul>
        </div>
    )
}

export default Sidebar