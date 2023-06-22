import getLikedMovies from '@/actions/getLikedMovies';
import Header from '@/components/Header';
import Image from 'next/image';
import React from 'react';
import LikedContent from './components/LikedContent';

export const revalidate = 0;

const Preference = async () => {
    const movies = await getLikedMovies();
    return (
        <div
            className='bg-neutral-900 w-full min-h-[100vh] overflow-hidden 
                text-white overflow-y-auto
            '
        >
            <Header 
                className='p-10'
            />
            <div
                className='m-10'
            >
                <div
                    className='flex flex-col md:flex-row items-center gap-x-5'
                >
                    <div
                        className='relative h-32 w-32 lg:h-44 lg:w-44'
                    >
                        <Image 
                            src="/images/liked.png"
                            fill
                            alt='Preference'
                            className='object-cover'
                        />
                    </div>
                    <div
                        className='flex flex-col gap-y-2 mt-4 md:mt-0'
                    >
                        <p
                            className='hidden md:block font-semibold text-sm'
                        >
                            Watchlist
                        </p>
                        <h1
                            className='text-4xl sm:text-5xl lg:text-7xl font-bold'
                        >
                            Favorite Movies
                        </h1>
                    </div>
                </div>
            </div>
            <LikedContent movies={movies} />
        </div>
    );
}

export default Preference;