import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Layout from "@/components/Layout";
import 대충 from "../public/작업하는대충.png";
import 사용예시 from "../public/사용예시.png";
import kakaoLogo from "../public/kakaoLogo.png";
import tw from "tailwind-styled-components";
import styled from "styled-components";
import Point from "@/components/mainCompo/Point";
import ForWhom from "@/components/mainCompo/ForWhom";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const PointText = tw.div`
  text-3xl
  sm:text-5xl
  flex
  relative
`;
const PointCircle = tw.div`
left-1/3 -top-3 absolute w-2 h-2 bg-pointColor rounded-full
`;
const Bubble = styled.div`
  position: relative;
  background: white;
  border-radius: 0.4em;
  ::after {
    content: "";
    position: absolute;
    bottom: 1;
    left: 20%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    border-left: 0;
    margin-left: -8.5px;
    margin-bottom: -17px;
  }
`;

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`)
      .then((res) => {
        console.log(res);
        router.push("/main");
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-screen h-screen">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <div>
          <div className="mx-10">
            <div className="flex items-end ">
              <div className=" sm:text-4xl font-semibold flex-grow sm:space-y-7">
                <div className="flex items-center">
                  <PointText>대충</PointText>쓰면서
                </div>
                <div className="flex items-end ">
                  <PointText>
                    대
                    <PointCircle />
                  </PointText>
                  학 생활을&nbsp;
                  <PointText>
                    충
                    <PointCircle />
                  </PointText>
                  실히
                </div>
              </div>
              <Bubble className=" shadow-2xl w-32 sm:w-48 sm:-bottom-11 sm:-left-14">
                <Image className="bg-white p-2" src={사용예시} alt="사용예시" />
              </Bubble>
            </div>

            <div className="space-y-4">
              <Image src={대충} alt="작업하는 대충" />
              <div className="flex flex-col text-sm sm:text-base sm:ml-10">
                <span>
                  바쁜 대학생활을 간단히 기록하고 문서와 자료를 정리하여
                </span>
                <span>시간을 아껴주는 디지털 노트 플랫폼</span>
              </div>
            </div>
          </div>
          <div className="my-20 mx-5">
            <Point />
          </div>
          <div className="mx-5 my-20">
            <ForWhom />
          </div>
        </div>
      </Layout>
      <div className="hidden lg:block lg:fixed top-10 right-10 xl:right-20 w-72 space-y-10">
        <div className="bg-bgColor p-5 rounded-xl space-y-3 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-lg text-pointColor ">
              카카오톡으로 <br />
              베타버전 시작하기!
            </span>
            <Image src={kakaoLogo} />
          </div>
          <div>
            베타버전으로 회원가입 시 정식 버전 출시 후 무료로 프리미엄 구독을
            하실 수 있습니다!
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center shadow-lg p-5 rounded-xl justify-center bg-white text-xl hover:font-bold"
        >
          바로 시작하기
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
