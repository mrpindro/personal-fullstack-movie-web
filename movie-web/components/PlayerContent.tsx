"use client";
import { Movie } from '@/types';
import React from 'react';
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';

interface PlayerContentProps {
    movie: Movie;
    movieUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ movie, movieUrl }) => {
    return (
        <div
            className=''
        >
            <div
                className='fixed top-10 left-[85px]'
            >
                <div
                    className='flex items-center gap-x-4 text-2xl'
                >
                    {movie.title}
                </div>
            </div>
            <div
                className='w-full h-full'
            >
                <video src={movieUrl}
                    autoPlay
                    controls
                    className='fixed bottom-1 h-[90%] w-full' 
                ></video>
            </div>
        </div>
    );
}

export default PlayerContent;