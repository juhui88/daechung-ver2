import React from 'react';
import {AiOutlineHome} from "react-icons/ai";
import {SlNote} from "react-icons/sl";
import {RxPerson} from "react-icons/rx";
import tw from 'tailwind-styled-components';

const IconWrap = tw.div`
    flex
    flex-col
    justify-center
    items-center
    group
`
const Icon = tw.div`
    group-hover:shadow-lg
`
const IconSpan = tw.span`
    group-hover:underline
`
const Bar = () => {
    return (
        <div className='bg-mainColor fixed bottom-0 w-screen'>
            <div className='md:w-[600px] grid grid-cols-3 py-1 mx-auto '>
                <IconWrap>
                    <Icon>
                        <AiOutlineHome size="25"/>
                    </Icon>
                    <IconSpan>Home</IconSpan>
                </IconWrap>
                <IconWrap>
                    <Icon>
                        <SlNote  size="25"/>
                    </Icon>
                    <IconSpan>Note</IconSpan>
                </IconWrap>
                <IconWrap>
                    <Icon>
                        <RxPerson  size="25"/>
                    </Icon>
                    <IconSpan>Profile</IconSpan>
                </IconWrap>
            </div>
        </div>
            
    );
};

export default Bar;