import Bar from '@/components/Bar';
import React from 'react';
import { Wrap } from '../main';
import Layout from '@/components/Layout';
import { useForm } from 'react-hook-form';
import {BsSearch} from "react-icons/bs"
import tw from 'tailwind-styled-components';
import Link from 'next/link';

const 임시 = {
    title:"대충이 만들기",
    content:"오늘은 대충이 버전2를 만들었다 css를 한꺼번에 다시 만들어야 해서 좀 힘들었지만 그래도 공부하느니 이거 하는게 재밌다 허허 아닌가? 공부시러 제발 으ㅡㅡ으우ㅜㅜ"
}
const EditBtn = tw.button`
    border-[1.5px]
    border-pointColor
    rounded-lg
    px-2

`

const Notes = () => {
    const {register, handleSubmit, reset} = useForm()

    const onValid= (data)=>{
        console.log(data.search)
        if(data.search==="") alert("검색어를 입력해주세요")
        reset()
    }
    return (
        <Layout>
            <div className='mb-12'>
                <div className='border-b px-6 py-10'>
                    <form onSubmit={handleSubmit(onValid)} className=' relative flex items-center w-11/12'>
                        <input {...register("search")} placeholder='검색' className='border border-black w-full rounded-full py-1 pl-3'/>
                        <button className='absolute right-2'><BsSearch/></button>
                    </form>     
                </div>
                {[1,2,3,4].map(i=>
                <Link href={`/notes/${String(i)}`}>
                    <div key = {i} className='p-6 border-b bg-bgColor cursor-pointer'> {/* 노트들 묶음 */}
                    
                        <div className='flex justify-between pb-5'>
                            <span className='font-bold'>{임시.title}</span>
                            <div className='text-pointColor space-x-3 font-bold'>
                                <EditBtn>수정</EditBtn>
                                <EditBtn>삭제</EditBtn>
                            </div>
                        </div>
                        <div className='overflow-hidden whitespace-normal text-ellipsis break-keep  content'>
                            {임시.content}
                        </div>
                    </div>  
                </Link>
                      
                )}
                
            </div>
            
        </Layout>
    );
};

export default Notes;