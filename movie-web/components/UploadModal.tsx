"use client";
import React, { useState } from 'react';
import Modal from './Modal';
import useUploadModal from '@/hooks/useUploadModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import uniqid from "uniqid";
import Input from './Input';
import { toast } from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {register, handleSubmit, reset} = useForm<FieldValues>({
        defaultValues: {
            title: '',
            video: null,
            trailer: null,
            image: null,
            duration: '',
            year: '',
            description: '',
            director: '',
            cast: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset(); 
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const videoFile = values.video?.[0];
            const trailerFile = values.trailer?.[0];

            if (!user || !imageFile || !videoFile) {
                toast.error('Missing fields');
                return;
            }

            const uniqueID = uniqid();

            // Upload trailer 
            const {
                data: trailerData,
                error: trailerError
            } = await supabaseClient.storage
                .from('videos')
                .upload(`trailer-${values.title}-${uniqueID}`, trailerFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            
            if (trailerError) {
                setIsLoading(false);
                return toast.error('failed video upload');
            }
            // Upload video 
            const {
                data: videoData,
                error: videoError
            } = await supabaseClient.storage
                .from('videos')
                .upload(`video-${values.title}-${uniqueID}`, videoFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            
            if (videoError) {
                setIsLoading(false);
                return toast.error('failed video upload');
            }

            // upload image 
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient.storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            
            if (imageError) {
                setIsLoading(false);
                return toast.error('failed image upload');
            }

            // insert movie 
            const {error: supabaseError } =  await supabaseClient.from('videos')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    director: values.director,
                    image_path: imageData.path,
                    trailer_path: trailerData.path,
                    video_path: videoData.path,
                    duration: values.duration,
                    year: values.year,
                    description: values.description,
                    cast: values.cast
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Video uploaded');
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title='Add a movie'
            description='Upload a video file'
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-y-1'
            >
                <Input 
                    id='title'
                    disabled={isLoading}
                    {...register('title', {required: true })}
                    placeholder='Movie title'
                />
                <Input 
                    id='director'
                    disabled={isLoading}
                    {...register('director', {required: true })}
                    placeholder='Movie director'
                />
                <Input 
                    id='duration'
                    disabled={isLoading}
                    {...register('duration', {required: true })}
                    placeholder='Video duration'
                />
                <Input 
                    id='year'
                    disabled={isLoading}
                    {...register('year', {required: true })}
                    placeholder='Movie production year'
                />
                <Input 
                    id='description'
                    disabled={isLoading}
                    {...register('description', {required: true })}
                    placeholder='Movie description'
                />
                <Input 
                    id='cast'
                    disabled={isLoading}
                    {...register('cast', {required: true })}
                    placeholder='Movie cast'
                />
                <div>
                    <div className='pb-1'>
                        Select a video file for a trailer
                    </div>
                    <Input 
                        id='trailer'
                        type='file'
                        disabled={isLoading}
                        accept='.mp4'
                        {...register('trailer', {required: true })}
                    />
                </div>
                <div>
                    <div className='pb-1'>
                        Select a video file
                    </div>
                    <Input 
                        id='video'
                        type='file'
                        disabled={isLoading}
                        accept='.mp4'
                        {...register('video', {required: true })}
                    />
                </div>
                <div>
                    <div className='pb-1'>
                        Select an image
                    </div>
                    <Input 
                        id='image'
                        type='file'
                        disabled={isLoading}
                        accept='image/*'
                        {...register('image', {required: true })}
                    />
                </div>
                <button
                    disabled={isLoading}
                    type='submit'
                    className='bg-green-400 py-2 px-4 rounded-full hover:opacity-80'
                >
                    Create
                </button>
            </form>
        </Modal>
    );
}

export default UploadModal;