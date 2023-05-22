import React from 'react';
import {AiOutlineHome} from "react-icons/ai";
import {SlNote} from "react-icons/sl";
import {RxPerson} from "react-icons/rx";
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import { cls } from '@/libs/utils';
import Link from 'next/link';

const IconWrap = tw.div`
    flex
    flex-col
    justify-center
    items-center
    group
`
const Icon = tw.div`
`
const IconSpan = tw.span`
    group-hover:underline
    
`
const Bar = () => {
    const router = useRouter();
    return (
        <div className='bg-mainColor fixed bottom-0 w-screen'>
            <div className='md:w-[600px] grid grid-cols-3 py-1 mx-auto '>
                <Link href="/main">
                    <IconWrap>
                        <div>
                            <AiOutlineHome size="25"/>
                        </div>
                        <span className={cls("group-hover:underline", router.pathname === "/main" ? "underline" :null )}>Home</span>
                    </IconWrap>
                </Link>
                <Link href="/notes">
                    <IconWrap>
                        <div>
                            <SlNote  size="25"/>
                        </div>
                        <span className={cls("group-hover:underline", router.pathname === "/notes" ? "underline" :null )}>Note</span>
                    </IconWrap>    
                </Link>
                <Link href="profile">
                    <IconWrap>
                        <div>
                            <RxPerson  size="25"/>
                        </div>
                        <span className={cls("group-hover:underline", router.pathname === "/profile" ? "underline" :null )}>Profile</span>
                    </IconWrap>
                </Link>
                
            </div>
        </div>
            
    );
};

export default Bar;