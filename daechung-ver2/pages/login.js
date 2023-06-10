import Layout from "@/components/Layout";
import Image from "next/image";
import React from "react";
import kakao from "../public/카카오톡.png";
import { AiOutlineInfoCircle } from "react-icons/ai";
import 잔디 from "../public/잔디.png";
import Link from "next/link";
const Login = () => {
  return (
    <Layout>
      <div className="px-10 mt-20">
        <div className=" flex items-center space-x-2">
          <Image src={kakao} art="login" />
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/callback`}
            className="border-[1px] border-textColor text-textColor text-xl rounded-2xl py-4 flex-grow text-center"
          >
            카카오톡으로 시작하기
          </Link>
        </div>
        <div className="flex bg-[#F0F0F0] p-5 py-3 items-center space-x-3 mt-16 mx-8">
          <AiOutlineInfoCircle size="40" />
          <div className="">
            알고 계셨나요?
            <div className="flex items-center">
              노트를 작성한 날에는 홈 달력에서 잔디가 자라요 :&#41;
              <Image src={잔디} alt="잔디" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
