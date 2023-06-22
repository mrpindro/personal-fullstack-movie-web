import Back from '@/components/Back';
import Player from '@/components/Player';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/userProvider';

export const revalidate = 0;

const VideoPlayer = () => {

    return (
        <div
            className='relative bg-neutral-900 text-white w-full overflow-hidden
                overflow-y-auto min-h-[100vh]'
        >   
            <div
                className='fixed top-1 left-1'
            >
                <Back />
            </div>
            <div>
                <SupabaseProvider>
                    <UserProvider>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </div>
        </div>
    );
}

export default VideoPlayer;