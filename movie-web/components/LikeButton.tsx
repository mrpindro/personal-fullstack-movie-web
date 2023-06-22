"use client";
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface LikeButtonProps {
    movieId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ movieId }) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient.from('liked_videos')
                .select('*')
                .eq('user_id', user.id)
                .eq('video_id', movieId)
                .single();

            if (!error && data) {
                setIsLiked(true);
            }
        }

        fetchData();
    }, [movieId, supabaseClient, user?.id]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (isLiked) {
            const { error } = await supabaseClient.from('liked_videos')
                .delete()
                .eq('user_id', user.id)
                .eq('video_id', movieId);

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
            }
        } else {
            const { error } = await supabaseClient.from('liked_videos')
                .insert({
                    video_id: movieId,
                    user_id: user.id
                });

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success('Liked!');
            }
        }
        router.refresh();
    }

    return (
        <button
            onClick={handleLike}
            className='hover:opacity-75 transition'
        >
            <Icon color={isLiked ? 'red' : 'white'} size={25} />
        </button>
    );
}

export default LikeButton;