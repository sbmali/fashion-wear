import React from 'react'
import Head from 'next/head'

const Aboutus = () => {
  return (
    <div>
      <Head>
        <title>About Us | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
      </Head>
      About us
    </div>
  )
}

export default Aboutus