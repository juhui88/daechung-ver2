import React from "react";
import check from "../../public/home/check.png";
import Image from "next/image";
import { PointText } from "./Point";
import WHOM0 from "../../public/home/forWhom/0.png";
import WHOM1 from "../../public/home/forWhom/1.png";
import WHOM2 from "../../public/home/forWhom/2.png";
import WHOM3 from "../../public/home/forWhom/3.png";
import WHOM4 from "../../public/home/forWhom/4.png";
import WHOM5 from "../../public/home/forWhom/5.png";
import WHOM6 from "../../public/home/forWhom/6.png";
import tw from "tailwind-styled-components";

const ImgWrap = tw.div`
relative flex justify-center items-center 
`;

const Span = tw.span`
  hidden peer-hover:block absolute text-3xl font-bold
`;

const ForWhom = () => {
  return (
    <div className="pb-10">
      <div className="flex items-center space-x-2">
        <Image src={check} alt="" className="w-10" />
        <PointText>For WHOM?</PointText>
      </div>
      <div className="relative  h-[400px] flex w-full justify-center items-center">
        <ImgWrap>
          <Image
            src={WHOM0}
            alt=""
            className="w-32 sm:w-40 peer hover:opacity-20 transition-all"
          />
          <Span>동아리</Span>
        </ImgWrap>

        <ImgWrap className="w-28 sm:w-36 absolute top-12 right-14 sm:top-0 sm:right-[152px]">
          <Image
            src={WHOM1}
            alt=""
            className="peer  hover:opacity-20 transition-all"
          />
          <Span>여행일지</Span>
        </ImgWrap>

        <ImgWrap className="w-28 sm:w-36 absolute  right-0 sm:right-20">
          <Image
            src={WHOM2}
            alt=""
            className=" peer  hover:opacity-20 transition-all "
          />
          <Span>프로젝트</Span>
        </ImgWrap>

        <ImgWrap className="w-28 sm:w-36 absolute bottom-12 right-14 sm:bottom-0 sm:right-[152px]">
          <Image
            src={WHOM3}
            alt=""
            className="peer  hover:opacity-20 transition-all "
          />
          <Span>운동일지</Span>
        </ImgWrap>

        <ImgWrap className="w-28 sm:w-36 absolute bottom-12 left-14 sm:bottom-0 sm:left-[152px]">
          <Image
            src={WHOM4}
            alt=""
            className="peer  hover:opacity-20 transition-all "
          />
          <Span>과제</Span>
        </ImgWrap>

        <ImgWrap className="w-28 sm:w-36 absolute left-0 sm:left-20">
          <Image
            src={WHOM5}
            alt=""
            className="peer  hover:opacity-20 transition-all "
          />
          <Span>일기</Span>
        </ImgWrap>

        <ImgWrap className="w-28 sm:w-36 absolute top-12 left-14 sm:top-0 sm:left-[152px]">
          <Image
            src={WHOM6}
            alt=""
            className="peer  hover:opacity-20 transition-all "
          />
          <Span>강의</Span>
        </ImgWrap>
      </div>
    </div>
  );
};

export default ForWhom;
