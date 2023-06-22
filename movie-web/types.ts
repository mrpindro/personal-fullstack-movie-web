export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    username?: string;
    avatar_url?: string;
  }

export interface Movie {
  id: string;
  user_id: string;
  title: string;
  director: string;
  trailer_path: string;
  video_path: string;
  image_path: string;
  duration: string;
  year: string;
  description: string;
  cast: string;
}