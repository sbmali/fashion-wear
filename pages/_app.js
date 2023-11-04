import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [user, setUser] = useState({})
  const [admin, setAdmin] = useState({})
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)
  const router = useRouter();
  const setuser = (user) => {
    setUser(user);
  }
  const setadmin = (admin) => {
    setAdmin(admin);
  }

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear('cart')
    }
    const myUser = JSON.parse(localStorage.getItem('myUser'))
    if (myUser) {
      setUser({ token: myUser.token, email: myUser.email })
    }
    const myAdmin = JSON.parse(localStorage.getItem('myAdmin'))
    if (myAdmin) {
      setAdmin({ token: myAdmin.token, email: myAdmin.email })
    }

    checkUser()
    checkAdmin()

    setKey(Math.random())
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  const logout = () => {
    localStorage.removeItem('myUser')
    setUser({ token: null, email: null })
    setKey(Math.random())
    toast.success('Logged out Sucessfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      router.push('/')
    }, 1000);
  }
  const adminLogout = () => {
    localStorage.removeItem('myAdmin')
    setAdmin({ token: null, user: null })
    setKey(Math.random())
    toast.success('Logged out Sucessfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      router.push('/')
    }, 1000);
  }
  const checkUser = async () => {
    let a = JSON.parse(localStorage.getItem('myUser'))
    if (a) {
      let data = { userExist: true, email: a.email }
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': ' application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json()
      if (!response.sucess) {
        toast.error('User not found. Please signup!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        logout()
      }
    }
  }
  const checkAdmin = async () => {
    let a = JSON.parse(localStorage.getItem('myAdmin'))
    if (a) {
      let data = { adminExist: true, email: a.email }
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': ' application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json()
      if (!response.sucess) {
        toast.error('Admin not found. Please signup!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        adminLogout()
      }
    }
  }
  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubtotal(subt);
  }
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + 1;
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant }
    }
    setCart(newCart);
    saveCart(newCart);
    toast.success('Item Added to cart Sucessfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const clearCart = () => {
    setCart({});
    localStorage.setItem('cart', {});
    toast.success('Cleared cart Sucessfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    saveCart({});
  }
  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant }
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    setSubtotal(price);
    router.push(' /checkout ')
  }
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - 1;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart);
    saveCart(newCart);
    toast.success('Item Removed from cart Sucessfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={`${process.env.NEXT_PUBLIC_WEBSITE_NAME} is an online Store where you can purchase cloths`} />
      <meta name="keyword" content={`${process.env.NEXT_PUBLIC_WEBSITE_NAME} is an online Store where you can purchase cloths`} />
      <meta name="author" content={`${process.env.NEXT_PUBLIC_WEBSITE_NAME}`} />
      <meta property="og:title" content={`${process.env.NEXT_PUBLIC_WEBSITE_NAME}`} />
      <link rel="icon" href="/favicon.ico" />
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
    <LoadingBar
      color='#f11946'
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
    {key && <Navbar admin={admin} user={user} setadmin={setadmin} setuser={setuser} key={key} adminLogout={adminLogout} logout={logout} cart={cart} buyNow={buyNow} addToCart={addToCart} clearCart={clearCart} removeFromCart={removeFromCart} subtotal={subtotal} />}
    <Component admin={admin} user={user} setadmin={setadmin} setuser={setuser} cart={cart} adminLogout={adminLogout} buyNow={buyNow} addToCart={addToCart} clearCart={clearCart} removeFromCart={removeFromCart} subtotal={subtotal}  {...pageProps} />
    <Footer />
  </>
}

export default MyApp