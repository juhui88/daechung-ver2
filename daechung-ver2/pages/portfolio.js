import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import profile from "../public/대충이 프로필 사진.png";
import Image from "next/image";
import bronze from "../public/메달/동메달.png";
import silber from "../public/메달/은메달.png";
import gold from "../public/메달/금메달.png";
import tw from "tailwind-styled-components";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { nameState } from "@/components/atom";
import axios from "axios";
import Link from "next/link";

const most = [
  {
    id: 0,
    title: "블로그에 올라가는 사진 모음",
    notesNum: 100,
  },
  {
    id: 1,
    title: "**은행 서포터즈 활동",
    notesNum: 91,
  },
  {
    id: 2,
    title: "과외 방문록",
    notesNum: 56,
  },
];

const recent = [
  {
    id: 0,
    title: "과외 방문록",
    date: "22.05.06",
  },
  {
    id: 1,
    title: "블로그에 올라가는 사진 모음",
    date: "22.05.03",
  },
  {
    id: 2,
    title: "과외 방문록",
    date: "22.03.23",
  },
  {
    id: 3,
    title: "**은행 서포터즈 활동",
    date: "22.03.16",
  },
];
const PortfolioWrap = tw.div`
    flex
    items-center
    justify-between 
    hover:underline
    cursor-pointer
    group
    relative
    mb-4
`;
const PortfolioItem = tw.div`
    flex
    items-center
    space-x-2
`;
const PortfolioTitle = tw.span`
    font-bold
`;
const PortfolioNum = tw.div`
    text-sm
`;
const Item = tw.div`
    bg-bgColor
    py-5
    px-3
    space-y-4
    
`;
const PortfolioOrder = tw.span`
    text-sm
    text-[#919191]
`;
const Bubble = tw.div`
    absolute
    hidden
    text-xs
    group-hover:block
    bg-[#565656]
    text-white
    py-2
    px-3
    rounded-full
    left-14
    -top-7
`;
const BubbleTriangle = styled.div`
  content: "";
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 0;
  height: 0;
  border: 19px solid transparent;
  border-top-color: #565656;
  border-bottom: 0;
  margin-left: ${(props) => (props.recent ? "-10px" : "-19px")};
  margin-bottom: -10px;
`;
const Portfolio = () => {
  const [userName, setUserName] = useState();
  const [mostNotes, setMostNotes] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`)
      .then((res) => setUserName(res.data.user.name))
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/cates/portfolio`)
      .then((res) => {
        console.log(res);
        setMostNotes(res.data.cates.rank);
        setRecentNotes(res.data.cates.latest);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout>
      <div className="min-h-screen p-5">
        <div className=" flex items-center justify-center space-x-2 font-bold">
          <Image
            src={profile}
            alt="portFolioImage"
            className="w-16 rounded-full border-[1px]"
          />
          <span>{userName}</span>
          <span>의 포토폴리오</span>
        </div>
        <div className="my-3">
          <div>
            <PortfolioOrder>최다 작성 순</PortfolioOrder>
            <Item>
              {mostNotes.map((m, i) => (
                <Link href={`/notes/${m.id}`} key={m.id}>
                  <PortfolioWrap>
                    <PortfolioItem>
                      <Image
                        src={i === 0 ? gold : i === 1 ? silber : bronze}
                        alt="medal"
                      />
                      <PortfolioTitle>{m.name}</PortfolioTitle>
                    </PortfolioItem>
                    <PortfolioNum>총 노트 {m.count}개</PortfolioNum>
                    <Bubble>
                      총 노트 {m.count}개 작성, 생성 날짜:
                      {" " + m.createdAt.slice(0, 10)}
                      <BubbleTriangle />
                    </Bubble>
                  </PortfolioWrap>
                </Link>
              ))}
            </Item>
          </div>
          <div className="mt-10">
            <PortfolioOrder>최근 생성 순</PortfolioOrder>
            <Item className="px-6 space-y-6">
              {recentNotes.map((r, i) => (
                <Link href={`/notes/${r.id}`} key={i}>
                  <PortfolioWrap>
                    <PortfolioItem>
                      <PortfolioTitle>{r.name}</PortfolioTitle>
                    </PortfolioItem>
                    <PortfolioNum>{r.createdAt.slice(0, 10)} ~</PortfolioNum>
                    <Bubble className="left-5 -top-10">
                      총 노트 {r.count}개 작성
                      <BubbleTriangle recent={true} />
                    </Bubble>
                  </PortfolioWrap>
                </Link>
              ))}
            </Item>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
