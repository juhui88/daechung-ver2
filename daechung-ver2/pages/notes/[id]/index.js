
import React, { useState } from 'react';
import {BsChevronLeft} from "react-icons/bs"
import {BiMenu} from "react-icons/bi"
import tw from 'tailwind-styled-components';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const NoteWrap = tw.div`
    bg-bgColor
    px-10
    py-4
    rounded-l-2xl
    rounded-tr-2xl
`

const EditBtn = tw.button`
    border-[1px]
    border-pointColor
    text-pointColor
    rounded-lg 
    px-2
`
const 임시 = {
    content:"오늘은 아이와 be 동사의 의문문과 부정문 진도를 나갔습니다. 아이가 의문문 만드는 것을 조금 어려워하여 보충 자료로 다시 연습해보았습니다.",
    날짜 : "2023-05-22",

}
const NoteDetail = () => {
    const router = useRouter()
    const {register, handleSubmit, reset} = useForm()
    const [menuClick, setMenuClick] = useState(false)


    const onValid = (data) => {
        console.log(data)
    }
    const onClickBack = () => {
        router.back()
    }
    const onClickMenu = () => {
        setMenuClick(prev=>!prev)
    }
    return (
    <Layout>
        <div className='flex flex-col h-full'>
            <div className='bg-mainColor px-3 flex-grow'>
                <div className='py-5 text-xl flex justify-between w-full items-center relative'>
                    <span onClick={onClickBack} className='cursor-pointer'><BsChevronLeft/></span>
                    <span className='font-bold'>대충이 만들기</span>
                    <span onClick={onClickMenu} className='mr-5'><BiMenu/> </span>
                    {menuClick ? 
                    <div className='px-14 py-1 shadow-lg bg-white absolute top-14 -right-10 text-lg'>
                        서랍장
                    </div>: null}
                </div>
                <div className='space-y-7'>
                    <NoteWrap className='text-[#545454] text-lg '>
                        <span>
                            {임시.content}
                        </span>
                        <div className='flex justify-between'>
                            <span className='text-pointColor'>{임시.날짜}</span>
                            <div className='space-x-3'>
                                <EditBtn>수정</EditBtn>
                                <EditBtn>삭제</EditBtn>
                            </div>
                        </div>
                    </NoteWrap>
                    <NoteWrap className='text-[#545454] text-lg '>
                        <span>
                            {임시.content}
                        </span>
                        <div className='flex justify-between'>
                            <span className='text-pointColor'>{임시.날짜}</span>
                            <div className='space-x-3'>
                                <EditBtn>수정</EditBtn>
                                <EditBtn>삭제</EditBtn>
                            </div>
                        </div>
                        <div className='border-t mt-3 h-20'>

                        </div>
                    </NoteWrap>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit(onValid)} className='relative'>
                    <textarea {...register("content")} className='textarea h-44 w-full focus:outline-none p-2'/>
                    <button className='bg-gray-500 text-white font-bold px-5 py-1 absolute right-1 rounded-t-xl -top-8'>입력</button>
                </form>
            </div>
        </div>
        
    </Layout>
    );
};

export default NoteDetail;