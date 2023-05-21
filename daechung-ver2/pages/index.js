import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Bar from '@/components/Bar'
import tw from 'tailwind-styled-components'
import Calendar from '@/components/Calendar'

const Profile = tw.div`

`

export default function Home() {
  return(
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap" rel="stylesheet"></link>
         {/* font-light:300 font-normal:400 font-bold:700 */}
      </Head>
      <div className='md:w-[600px] mx-auto h-screen border-l border-r'>
        <Profile className=''>
          <Image/>
          <span>대충이</span>
        </Profile>
        <div>
          <img/> {/* 캘린더 집게 이미지 */}
          <span className='bg-mainColor p-1 px-4 rounded-xl'>Calendar</span>
          <div>
            <Calendar/>
          </div>

        </div>
      </div>
      <Bar/>
    </div>

  )
}
