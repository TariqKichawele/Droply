'use client';

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ImageKitProvider } from "imagekitio-next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { createContext, useContext } from "react";
import { ToastProvider } from "@heroui/toast";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps
}

declare module "@react-types/shared" {
    interface RouterConfig {
      routerOptions: NonNullable<
        Parameters<ReturnType<typeof useRouter>["push"]>[1]
      >;
    }
}

export const ImageKitAuthContext = createContext<{ authenticate: () => Promise<{ 
    signature: string;
    token: string;
    expire: number;}> 
}>({
    authenticate: async () => ({ signature: "", token: "", expire: 0 }),
});

export const useImageKitAuth = () => useContext(ImageKitAuthContext);

const authenticator = async () => {
    try {
        const response = await fetch("/api/imagekit-auth");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error authenticating with ImageKit:", error);
        throw error;
    }
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();
    return (
        <HeroUIProvider navigate={router.push}>
            <ImageKitProvider
                authenticator={authenticator}
                publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""}
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""}
            >
                <ImageKitAuthContext.Provider value={{ authenticate: authenticator }}>
                    <ToastProvider placement="top-right" />
                    <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
                </ImageKitAuthContext.Provider>
            </ImageKitProvider>
        </HeroUIProvider>
    )
}