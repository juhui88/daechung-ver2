import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Bar from '@/components/Bar'
import tw from 'tailwind-styled-components'
import Calendar from '@/components/Calendar'
import profile from "../public/대충이 프로필 사진.png"
import pin from "../public/핀.png"

const Profile = tw.div`
  flex
  items-center
  my-4
  space-x-2
  cursor-pointer
  ml-16
`
const CateItem = tw.div`
  bg-[#F0F0F0]
  py-2
  px-6
  rounded-bl-2xl
  rounded-se-2xl 
`
export default function Home() {
  return(
    <div className='w-screen flex flex-col h-screen'>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap" rel="stylesheet"></link>
         {/* font-light:300 font-normal:400 font-bold:700 */}
      </Head>
      <div className='w-full sm:w-[640px] flex-grow  mx-auto  border-l border-r px-5 py-5 sm:py-10 '>
        <Profile>
          <Image src={profile} className='w-16 rounded-full border-[1px]'/>
          <span>대충이</span>
        </Profile>
        <div className='relative flex flex-col items-center mt-3 mb-5 px-16'>
          <Image src = {pin}  className='w-5 absolute -top-3 rotate-[30deg]'/> 
          <span className='bg-mainColor p-1 px-6 rounded-xl'>Calendar</span>
          <div>
            <Calendar/>
          </div>
        </div>
        <div className='space-y-2 mb-12'>
          <CateItem>
            국민은행 서포터즈
          </CateItem>
          <CateItem>
            브랜드 전략
          </CateItem>
          <CateItem>
            디지털전환과 비즈니스 모델링
          </CateItem>
        </div>
      </div>
      <Bar/>
    </div>

  )
}
