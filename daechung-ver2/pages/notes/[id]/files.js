import Layout from '@/components/Layout';
import NoteBar from '@/components/NoteBar';
import React from 'react';

const Files = () => {

    return (
        <Layout>
            <div className='px-3 bg-mainColor h-full'>
                <NoteBar title={"대충이 만들기 > 서랍장"}  id={null}/>
            </div>
            
        </Layout>
    );
};

export default Files;