import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='overflow-x-hidden'>
      <Head />
      <body className='pt-16'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}