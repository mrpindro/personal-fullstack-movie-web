import { Movie } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (movies: Movie[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }

        player.setId(id);
        player.setIds(movies.map((movie) => movie.id));
    }

    return onPlay;
}

export default useOnPlay;