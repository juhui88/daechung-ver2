
import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import NoteBar from '@/components/NoteBar';

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
    text-sm
    sm:text-lg
`

const NoteSpan = tw.span`
    text-sm
    sm:text-lg
`
const 임시 = {
    title:"대충이 만들기",
    content:"오늘은 아이와 be 동사의 의문문과 부정문 진도를 나갔습니다. 아이가 의문문 만드는 것을 조금 어려워하여 보충 자료로 다시 연습해보았습니다.",
    날짜 : "2023-05-22",

}
const NoteDetail = () => {
    const {register, handleSubmit, reset} = useForm()
    const router = useRouter()

    const onValid = (data) => {
        if(data.content === "") return
        console.log(data)
    }
    
    return (
    <Layout>
        <div className='flex flex-col h-full'>
            <div className='bg-mainColor px-3 flex-grow'>
                <NoteBar title={임시.title} id = {router.query.id}/>
                <div className='space-y-7'>
                    <NoteWrap className='text-[#545454] text-lg '>
                        <NoteSpan>
                            {임시.content}
                        </NoteSpan>
                        <div className='flex justify-between items-center'>
                            <NoteSpan className='text-pointColor'>{임시.날짜}</NoteSpan>
                            <div className='space-x-3'>
                                <EditBtn>수정</EditBtn>
                                <EditBtn>삭제</EditBtn>
                            </div>
                        </div>
                    </NoteWrap>
                    <NoteWrap className='text-[#545454] text-lg '>
                        <NoteSpan className=''>
                            {임시.content}
                        </NoteSpan>
                        <div className='flex justify-between items-center'>
                            <NoteSpan className='text-pointColor'>{임시.날짜}</NoteSpan>
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
                    <textarea placeholder='내용을 입력하세요' {...register("content")} className='textarea h-44 w-full focus:outline-none p-2 placeholder:text-sm'/>
                    <button className='bg-gray-500 text-white font-bold px-5 py-1 absolute right-1 rounded-t-xl -top-8'>입력</button>
                </form>
            </div>
        </div>
        
    </Layout>
    );
};


export default NoteDetail;