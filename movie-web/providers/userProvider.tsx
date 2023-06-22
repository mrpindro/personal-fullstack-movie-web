"use client";

import { MyuserContextProvider } from "@/hooks/useUser";

interface UserProviderProps {
    children: React.ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    return (
        <MyuserContextProvider>
            {children}
        </MyuserContextProvider>
    );
}

export default UserProvider;