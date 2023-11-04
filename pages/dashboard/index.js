import React, { useEffect } from 'react'
import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const router = useRouter();
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
    <>
      <div className='flex'>
        <Head>
          <title>Dashboard | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
        </Head>
        <Sidebar />
        <div className="min-h-screen">

        </div>
      </div>
    </>
  )
}

export default Dashboard