import Header from '@/components/Header';
import UserUploads from '@/app/myUploads/components/UserUploads';
import React from 'react';
import UserProvider from '@/providers/userProvider';
import SupabaseProvider from '@/providers/SupabaseProvider';
import getMoviesByUserId from '@/actions/getMoviesByUserId';

export const revalidate = 0;

const UploadsPage = async () => {
    const userMovies = await getMoviesByUserId();

    return (
        <div
            className='bg-neutral-900 text-white w-full h-full'
        >
            <Header
            className="flex items-center justify-between p-10"
            />
            <SupabaseProvider>
                <UserProvider>
                    <UserUploads 
                        movies={userMovies}
                    />
                </UserProvider>
            </SupabaseProvider>
        </div>
    );
}

export default UploadsPage;