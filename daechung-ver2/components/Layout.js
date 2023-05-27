import React, { useEffect, useState } from 'react';
import Bar from './Bar';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

const Layout = ({children}) => {
    const router = useRouter()
    const [width, setWidth] = useState(false)


    return (
        <div className='w-screen flex flex-col h-screen'>
            <div className='w-full sm:w-[640px] flex-grow mx-auto  border-l border-r mb-[52px] '>
                {children}
            </div>
            
            <div>
                {isMobile ? router.pathname === "/main" || router.pathname === "/notes" || router.pathname === "/porfolio" ? <Bar/> :null : router.pathname==="/login" ? null: <Bar/> }
            </div>   

            
            
        </div>
    );
};

export default Layout;