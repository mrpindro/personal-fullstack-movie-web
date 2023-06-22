"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Back = () => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.back()}
            className='cursor-pointer hover:opacity-70'
        >
            <AiOutlineArrowLeft size={30} />
        </div>
    );
}

export default Back;