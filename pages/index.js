import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from "../models/Product"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { FaTshirt, FaRupeeSign } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

const responsiveSettings = [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 700,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 100,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
];

export default function Home({ tshirt, jeans }) {
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
      </Head>

      <div className="m-0 mb-12 p-0 w-[100%] h-auto flex flex-wrap float-left">
        <div className="w-full md:w-1/2 cursor-pointer"><Link href="/tshirts" ><Image src="/images/home/2.jpg" height="350%" width="755%" alt="Fashion Sale1" /></Link></div>
        <div className="w-full md:w-1/2 cursor-pointer"><Link href="/jeans" ><Image src="/images/home/1.png" height="350%" width="755%" alt="Fashion Sale2" /></Link></div>
        <div className="w-full md:w-1/2 cursor-pointer"><Link href="/jeans" ><Image src="/images/home/3.png" height="380%" width="755%" alt="Fashion Sale3" /></Link></div>
        <div className="w-full md:w-1/2 cursor-pointer"><Link href="/tshirts" ><Image src="/images/home/4.png" height="380%" width="755%" alt="Fashion Sale4" /></Link></div>
      </div>

      <div className="px-5 md:py-6 mx-auto">
        <div className="flex flex-wrap w-full flex-col items-center text-center">
          <h1 className="text-2xl font-bold title-font text-gray-900"><u>Featured Products</u></h1>
        </div>
      </div>

      <div className="mx-auto p-4 md:px-8 justify-center" >
        <div className="flex justify-between items-center">
          <h1 className='font-medium text-xl p-4'>T-Shirts</h1>
          <Link href={'/tshirts'}><a><button className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm">See All</button></a></Link>
        </div>
        <center>
          <Slide slidesToScroll={1} slidesToShow={6} indicators={true} responsive={responsiveSettings} >
            {Object.keys(tshirt).reverse().map((item) => {
              return <div className="w-48 p-2 border-2 border-black text-left" key={tshirt[item]._id}>
                <Link href={`/product/${tshirt[item].slug}`}><a className="">
                  <Image alt="thsirt" height={150} width={150} src={tshirt[item].img} />
                  <h2 className="text-gray-900 title-font text-sm lg:text-lg font-medium">{tshirt[item].title}</h2>
                </a></Link>
                <div className='flex space-x-2'>
                  <div className="mt-1">
                    {tshirt[item].size.includes('S') && <span className='border border-gray-300 text-sm md:text-base px-1 mx-1'>S</span>}
                    {tshirt[item].size.includes('M') && <span className='border border-gray-300 text-sm md:text-base px-1 mx-1'>M</span>}
                    {tshirt[item].size.includes('L') && <span className='border border-gray-300 text-sm md:text-base px-1 mx-1'>L </span>}
                    {tshirt[item].size.includes('XL') && <span className='border border-gray-300 text-sm md:text-base px-1 mx-1'>XL</span>}
                    {tshirt[item].size.includes('XXL') && <span className='border border-gray-300 text-sm md:text-base px-1 mx-1'>XXL</span>}
                  </div>
                  <div className="mt-1">
                    {tshirt[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                    {tshirt[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                    {tshirt[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                    {tshirt[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                    {tshirt[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                    {tshirt[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                  </div>
                </div>
                <p className="mt-1 text-sm md:text-base">₹{tshirt[item].price}</p>
              </div>
            })}
          </Slide>
        </center>
      </div>

      <div className="mx-auto p-4 md:px-8 justify-center" >
        <div className="flex justify-between items-center">
          <h1 className='font-medium text-xl p-4'>Jeans</h1>
          <Link href={'/jeans'}><a><button className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm">See All</button></a></Link>
        </div>
        <center>
          <Slide slidesToScroll={1} slidesToShow={6} indicators={true} responsive={responsiveSettings} >
            {Object.keys(jeans).reverse().map((item) => {
              return <div className="w-48 p-2 border-2 border-black justify-center text-left" key={jeans[item]._id}>
                <Link href={`/product/${jeans[item].slug}`}><a className="">
                  <Image alt="thsirt" height={150} width={150} src={jeans[item].img} />
                  <h2 className="text-gray-900 title-font text-sm lg:text-lg font-medium">{jeans[item].title}</h2>
                </a></Link>
                <div className='flex space-x-2'>
                  <div className="mt-1">
                    {jeans[item].size.includes('S') && <span className='border border-gray-300 text-sm md:text-base px-1 mx-1'>S</span>}
                    {jeans[item].size.includes('M') && <span className='border border-gray-300 text-sm md:text-base px-1 mx-1'>M</span>}
                    {jeans[item].size.includes('L') && <span className='border border-gray-300 text-sm md:text-base px-1 mx-1'>L </span>}
                    {jeans[item].size.includes('XL') && <span className='border border-gray-300 text-sm md:text-base px-1 mx-1'>XL</span>}
                    {jeans[item].size.includes('XXL') && <span className='border border-gray-300 text-sm md:text-base px-1 mx-1'>XXL</span>}
                  </div>
                  <div className="mt-1">
                    {jeans[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                    {jeans[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                    {jeans[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                    {jeans[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                    {jeans[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                    {jeans[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-5 md:w-6 h-5 md:h-6 focus:outline-none"></button>}
                  </div>
                </div>
                <p className="mt-1 text-sm md:text-base">₹{jeans[item].price}</p>
              </div>
            })}
          </Slide>
        </center>
      </div>

      <section className="text-gray-600 body-font mx-4 md:mx-8 my-16 justify-center">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="w-full xl:w-1/3 md:w-1/2 p-4 ">
            <div className="border border-gray-200 p-6 rounded-lg hover:bg-slate-300 bg-slate-200">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <FaTshirt className='text-2xl md:text-xl' />
              </div>
              <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Premium Tshirts</h2>
              <p className="leading-relaxed text-base">Our T-Shirts are 100% made of cotton.</p>
            </div>
          </div>
          <div className="w-full xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-gray-200 p-6 rounded-lg hover:bg-slate-300 bg-slate-200">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <MdLocalShipping className='text-2xl md:text-xl' />
              </div>
              <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Free Shipping</h2>
              <p className="leading-relaxed text-base">We ship all over India for FREE.</p>
            </div>
          </div>
          <div className="w-full xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-gray-200 p-6 rounded-lg hover:bg-slate-300 bg-slate-200">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <FaRupeeSign className='text-2xl md:text-xl' />
              </div>
              <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Exciting Offers</h2>
              <p className="leading-relaxed text-base">We provide amazing offers & discounts on our products.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)

  }
  let p = await Product.find({ category: "T-Shirt" })
  let tshirt = p.reverse().slice(0, 6)

  let q = await Product.find({ category: "Jeans" })
  let jeans = q.reverse().slice(0, 6)

  return {
    props: {
      tshirt: JSON.parse(JSON.stringify(tshirt)),
      jeans: JSON.parse(JSON.stringify(jeans))
    }, // will be passed to
  }
}