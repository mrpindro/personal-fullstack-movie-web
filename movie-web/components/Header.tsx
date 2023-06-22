"use client";

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai"
import { toast } from 'react-hot-toast';
import useUploadModal from '@/hooks/useUploadModal';

interface HeaderProps {
    className: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }
  
  const supabaseClient = useSupabaseClient();
  const onClick = () => {
    return uploadModal.onOpen();
  }
  const { user } = useUser();

  const handleLogout = async () => {
    const { error} = await supabaseClient.auth.signOut();
    
    // TODO: Reset any playing video
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged Out');
    }
  }

  return (
    <header
        className={twMerge(`
            h-[70px] w-full bg-black text-white flex items-center justify-between
        `,
            className
        )}
    >
      <div
        className="flex items-center justify-between gap-10 cursor-pointer w-full
        "
      >
        <div
          className='flex items-center justify-between gap-10'
        >
          <div className='hover:opacity-70'
            onClick={() => router.push('/')}
          >
            Home
          </div>
          <div className='hover:opacity-70'>
            Films
          </div>
          <div className='hover:opacity-70'>
            Series
          </div>
          <div
            onClick={() => router.push('/preferences')} 
            className='hover:opacity-70'
          >
            Preferences
          </div>
        </div>
        <div
          onClick={() => router.push('/search')}
          className='flex items-center justify-center gap-2 cursor-pointer
            px-4 py-2 bg-neutral-900 rounded-md hover:opacity-70 transition 
          '
        >
          <p
            className='font-semibold text-xl'
          >
            Search
          </p>
          <AiOutlineSearch size={25} />
        </div>
        {user ? (
          <div
            className='flex gap-x-4 items-center relative'
          >
            <div
              className='flex items-center justify-between gap-2 relative'
            >
              <div
                style={{ display: isOpen ? 'unset' : 'none'}}
                className='flex absolute items-center justify-center gap-2
                  flex-col top-[40px] right-[-50px] w-[150px] h-[125px] 
                  bg-neutral-900 p-2 border rounded-md
                '
              >
                <button
                  onClick={onClick}
                  className='hover:opacity-50 p-2'
                >
                  Upload video
                </button>
                <hr />
                <button
                  onClick={() => router.push('/myUploads')}
                  className='hover:opacity-50 p-2'
                >
                  My uploads
                </button>
                <hr />
                <button
                  onClick={handleLogout}
                  className='hover:opacity-70 p-2'
                >
                  Logout
                </button>
              </div>
            </div>
            <button
              onClick={handleClick}
              className='bg-neutral-900 py-2 px-2'
            >
              <AiOutlineMenu />
            </button>
            <button
              onClick={() => router.push('/account')}
              className='bg-neutral-900 py-2 px-2 rounded-full hover:opacity-70 
                hover:bg-neutral-600 transition
              '
            >
              <FaUserAlt />
            </button>
          </div>
        ): (
          <div
            className='flex items-center justify-center gap-10'
          >
            <button
              onClick={authModal.onOpen}
              className='rounded-full bg-neutral-400 hover:opacity-70 px-5 py-2'
            >
              Log in
            </button>
            <button
              onClick={authModal.onOpen}
              className='rounded-full bg-neutral-400 hover:opacity-70 px-5 py-2'
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;