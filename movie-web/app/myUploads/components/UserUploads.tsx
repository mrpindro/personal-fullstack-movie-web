"use client";
import MediaItem from '@/components/MediaItem';
import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { Movie } from '@/types';
import React from 'react';


interface UserUploadsProps {
    movies: Movie[];
}

const UserUploads: React.FC<UserUploadsProps> = ({movies}) => {
    if (movies.length === 0) {
        return (
            <div
                className='mt-4 text-neutral-400'
            >
                No movies available
            </div>
        );
    }

    // const { user } = useUser();
    // const uploadModal = useUploadModal();
    // const authModal = useAuthModal();

    // const onClick = () => {
    //     if (!user) {
    //     return authModal.onOpen();
    //     }

    //     return uploadModal.onOpen();
    // }

    return (
        <div
            className='flex flex-col align-items justify-center gap-x-3 mt-4 px-3
            '
        >
            {movies.map((item) => (
                <MediaItem 
                    key={item.id}
                    onClick={() => {}}
                    data={item}
                />
            ))}
        </div>
    );
}

export default UserUploads;