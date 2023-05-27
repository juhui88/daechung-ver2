import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Bar from '@/components/Bar'
import tw from 'tailwind-styled-components'
import Calendar from '@/components/Calendar'
import profile from "../public/대충이 프로필 사진.png"
import pin from "../public/핀.png"



export default function Home() {
  return(
    <div className='w-screen flex flex-col h-screen'>
      <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet"/>    
      </Head>
    </div>

  )
}
