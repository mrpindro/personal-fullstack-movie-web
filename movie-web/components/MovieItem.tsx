"use client";
import useLoadImage from '@/hooks/useLoadImage';
import { Movie } from '@/types';
import Image from 'next/image';
import React from 'react';
import PlayButton from './PlayButton';

interface MovieItemProps {
    data: Movie;
    onClick: (id: string) => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ data, onClick }) => {
    const imagePath = useLoadImage(data);

    return (
        <div
            onClick={() => onClick(data.id)}
            className='relative group flex flex-col items-center justify-center 
                rounded-md overflow-hidden gap-x-4 bg-neutral-400/5
                cursor-pointer hover:bg-neutral-400/10 transition p-3
            '
        >
            <div
                className='relative aspect-square w-full h-full rounded-md overflow-hidden'
            >
                <Image 
                    src={imagePath || "/images/liked.png"}
                    alt="Image"
                    fill
                    className="object-cover"
                /> 
            </div>
            <div
                className='flex flex-col items-start w-full pt-4 gap-y-1'
            >
                <p
                    className='font-semibold truncate w-full'
                >
                    {data.title}
                </p>
                <p
                    className='text-neutral-400 text-sm pb-4 w-full truncate'
                >
                    Director: {data.director}
                </p>
            </div>
            <div
                className='absolute h-full w-full bg-transparent left-0 top-0'
            >
                <PlayButton />
            </div>
        </div>
    );
}

export default MovieItem;