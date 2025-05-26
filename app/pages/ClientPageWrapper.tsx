import { SessionProvider } from "next-auth/react";
import {  ReactNode } from "react";

export const ClientWrapper = ({children}:{children:ReactNode})=>{
     return (
        <SessionProvider>
            {children}
        </SessionProvider>
     )
}
