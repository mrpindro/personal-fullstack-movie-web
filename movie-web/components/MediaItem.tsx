"use client";
import useLoadImage from '@/hooks/useLoadImage';
import { Movie } from '@/types';
import Image from 'next/image';
import React from 'react';

interface MediaItemProps {
    data: Movie;
    onClick: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps>= ({ data, onClick }) => {
    const imageUrl = useLoadImage(data);

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }

        // TODO: Default turn on player
    }

    return (
        <div
            onClick={handleClick}
            className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-700/50 
                w-full p-2 rounded-md my-8 md:my-4 bg-neutral-800/50
            '
        >
            <div
                className='flex flex-col gap-y-1 overflow-hidden'
            >
                <div
                    className='relative rounded-md min-h-[180px] min-w-[180px] overflow-hidden'
                >
                    <Image 
                        src={imageUrl || '/images/liked.png'}
                        alt='Media Item'
                        fill
                        className='object-cover'
                    />
                </div>
                <div>
                    <p
                        className='text-white truncate'
                    >
                        {data.title}
                    </p>
                    <p
                        className='text-neutral-400 truncate'
                    >
                        {data.year}
                    </p>
                    <p
                        className='text-neutral-400 text-sm truncate'
                    >
                        Duration: {data.duration}
                    </p>
                    <p
                        className='text-neutral-400 text-sm truncate'
                    >
                        Director: {data.director}
                    </p>
                    <p
                        className='text-neutral-400 text-sm truncate'
                    >
                        Cast: {data.cast}
                    </p>
                </div>
            </div>
            <div
                className='h-full w-[50%]'
            >
                <p>
                    {data.description}
                </p>
            </div>
        </div>
    );
}

export default MediaItem;