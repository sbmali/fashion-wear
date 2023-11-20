import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
    return (
        <div className='border-t-2'>
            <footer className="mt-8 md:mt-12 text-gray-600 body-font">
                <div className="flex justify-center p-4 text-sm md:text-base">
                    <div className="flex flex-col md:flex-row justify-center md:justify-evenly space-y-8 md:space-y-0 md:py-4">
                        <div className="w-full md:w-1/4 flex flex-col justify-center transform md:-translate-y-6 space-y-2">
                            <div className="flex space-x-1 md:space-x-2 justify-center">
                                <div className='w-5 h-5 md:w-7 md:h-7 mt-1 md:mt-0.5'><Image src="/favicon.ico" height={30} width={30} alt="logo" /></div>
                                <span className='text-xl md:text-2xl font-semibold'>{process.env.NEXT_PUBLIC_WEBSITE_NAME}</span>
                            </div>
                            <div className="text-center">
                                {process.env.NEXT_PUBLIC_WEBSITE_NAME} is an E-Commerce website. 
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 text-center">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-lg md:text-lg mb-3">About Us</h2>
                            <p>
                                We are students from Gokhale Education Society RH Sapat College of Engineering.
                                We are currently pursuing degree in Computer Engineering.
                            </p>
                        </div>
                        <div className="w-full md:w-1/4 text-center">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-lg md:text-lg mb-3">Quick Links</h2>
                            <nav className="list-none space-y-2">
                                <li>
                                    <Link href='/' ><a className="text-gray-600 hover:text-gray-800">Home</a></Link>
                                </li>
                                <li>
                                    <Link href='/' ><a className="text-gray-600 hover:text-gray-800">About</a></Link>
                                </li>
                                <li>
                                    <Link href='/tshirts' ><a className="text-gray-600 hover:text-gray-800">T-Shirt</a></Link>
                                </li>
                                <li>
                                    <Link href='/contactus' ><a className="text-gray-600 hover:text-gray-800">Contact Us</a></Link>
                                </li>
                            </nav>
                        </div>
                        <div className="w-full md:w-1/4 text-center">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-lg md:text-lg mb-3">Contact Info</h2>
                            <p>
                                Singli, Maharashtra, India <br />
                                Pincode - 416407 <br />
                                Email - <Link href='mailto:sanketmali5585@gmail.com' ><a>sanketmali5585@gmail.com</a></Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 mt-4">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-gray-500 text-sm text-center sm:text-left">© 2022 {process.env.NEXT_PUBLIC_WEBSITE_NAME} — 
                            <Link href='https://www.linkedin.com/in/sanketmali'>@Sanket Mali</Link>
                        </p>
                        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                            <a className="text-gray-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer