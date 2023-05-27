import Layout from '@/components/Layout';
import Image from 'next/image';
import React from 'react';
import kakao from "../public/카카오톡.png"
import {AiOutlineInfoCircle} from "react-icons/ai"
import 잔디 from "../public/잔디.png"
const Login = () => {
    return (
        <Layout>
            <div className='px-10 mt-20'>
                <div className=' flex items-center space-x-2'>
                    <Image src = {kakao} art="login"/>
                    <div className='border-2 border-textColor text-textColor text-lg rounded-2xl py-4 flex-grow text-center'>
                        카카오톡 으로 시작하기
                    </div>
                </div>
                <div className='flex bg-[#F0F0F0] p-5 py-3 items-center space-x-3 mt-16 mx-10'>
                    <AiOutlineInfoCircle size="40"/>
                    <div className=''>
                        알고 계셨나요?<br/>
                        노트를 작성한 날에는 홈 달력에서 잔디가 자라요 :&#41;
                        <Image src={잔디} alt="잔디"/>
                    </div>
                </div>
            </div>
            
        </Layout>
    );
};

export default Login;