import Layout from '@/components/Layout';
import React from 'react';
import profile from "../public/대충이 프로필 사진.png"
import Image from 'next/image';
import bronze from "../public/메달/동메달.png"
import silber from "../public/메달/은메달.png"
import gold from "../public/메달/금메달.png"
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const most = [
    {
        id:0,
        title: "블로그에 올라가는 사진 모음",
        notesNum: 100
    },
    {
        id:1,
        title: "**은행 서포터즈 활동",
        notesNum: 91
    },
    {
        id:2,
        title: "과외 방문록",
        notesNum: 56
    },
]

const recent = [
    {
        id:0,
        title:"과외 방문록",
        date: "22.05.06"
    },
    {
        id:1,
        title:"블로그에 올라가는 사진 모음",
        date: "22.05.03"
    },
    {
        id:2,
        title:"과외 방문록",
        date: "22.03.23"
    },
    {
        id:3,
        title:"**은행 서포터즈 활동",
        date: "22.03.16"
    },
]
const PortfolioWrap = tw.div`
    flex
    items-center
    justify-between 
    hover:underline
    cursor-pointer
    group
    relative
`
const PortfolioItem = tw.div`
    flex
    items-center
    space-x-2
`
const PortfolioTitle = tw.span`
    font-bold
`
const PortfolioNum = tw.div`
    text-sm
`
const Item = tw.div`
    bg-bgColor
    py-5
    px-3
    space-y-4
    
`
const PortfolioOrder = tw.span`
    text-sm
    text-[#919191]
`
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
`
const BubbleTriangle = styled.div`
    content: '';
	position: absolute;
	bottom: 0;
	left: 10%;
	width: 0;
	height: 0;
	border: 19px solid transparent;
	border-top-color: #565656;
	border-bottom: 0;
	margin-left: -19px;
	margin-bottom: -10px;
`
const Portfolio = () => {
    return (
        <Layout>
            <div className='p-5'>
                <div className=' flex items-center justify-center space-x-2 font-bold'>
                    <Image src={profile} alt='portFolioImage' className='w-16 rounded-full border-[1px]'/>
                    <span>대충이</span>
                    <span>의 포토폴리오</span>
                </div>
                <div className='my-3'>
                    <div>
                        <PortfolioOrder>최다 작성 순</PortfolioOrder>
                        <Item>
                            {most.map(m=>
                            <PortfolioWrap>
                                <PortfolioItem>
                                    <Image src={m.id === 0 ? gold : m.id===1 ? silber : bronze} alt = "medal"/>   
                                    <PortfolioTitle>{m.title}</PortfolioTitle>
                                </PortfolioItem>
                                <PortfolioNum>
                                    총 노트 {m.notesNum}개
                                </PortfolioNum>
                                <Bubble>
                                    총 노트 15개 작성, 최근 작성일:22.0.25
                                    <BubbleTriangle/>
                                </Bubble>
                            </PortfolioWrap>
                            )}
                        </Item>
                    </div>
                    <div className='mt-10'>
                        <PortfolioOrder>최근 생성 순</PortfolioOrder>
                        <Item className='px-6 space-y-6'>
                            {recent.map(m=>
                            <PortfolioWrap >
                                <PortfolioItem> 
                                    <PortfolioTitle>{m.title}</PortfolioTitle>
                                </PortfolioItem>
                                <PortfolioNum>
                                    {m.date} ~
                                </PortfolioNum>
                                <Bubble className='left-5 -top-10'>
                                    총 노트 15개 작성, 최근 작성일:22.0.25
                                    <BubbleTriangle/>
                                </Bubble>
                            </PortfolioWrap>
                            )}
                        </Item>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Portfolio;