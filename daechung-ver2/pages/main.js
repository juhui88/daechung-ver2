import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Bar from "@/components/Bar";
import tw from "tailwind-styled-components";
import Calendar from "@/components/Calendar";
import profile from "../public/대충이 프로필 사진.png";
import pin from "../public/핀.png";
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const Profile = tw.div`
  flex
  items-center
  my-4
  space-x-2
  cursor-pointer
  ml-9
  sm:ml-16
`;
const CateItem = tw.div`
  bg-[#F0F0F0]
  py-2
  px-6
  rounded-bl-2xl
  rounded-se-2xl 
`;
export default function Main() {
  const [name, setName] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`)
      .then((res) => {
        setName(res.data.user.name);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout>
      <div className="p-5 sm:py-10 ">
        <Profile>
          <Image
            src={profile}
            alt="profileImage"
            className="w-16 rounded-full border-[1px]"
          />
          <span className="font-bold">{name}</span>
        </Profile>
        <div className="relative flex flex-col items-center mt-3 mb-5 ">
          <Image
            src={pin}
            alt="pin"
            className="w-5 absolute -top-3 rotate-[30deg]"
          />
          <span className="bg-mainColor p-1 px-6 rounded-xl">Calendar</span>
          <div className="w-full">
            <Calendar />
          </div>
        </div>
        <div className="space-y-2 mb-12">
          <CateItem>국민은행 서포터즈</CateItem>
          <CateItem>브랜드 전략</CateItem>
          <CateItem>디지털전환과 비즈니스 모델링</CateItem>
        </div>
      </div>
    </Layout>
  );
}
