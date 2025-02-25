import * as React from "react";

// 1. import `HeroUIProvider` component
import { HeroUIProvider } from "@heroui/react";

interface ProviderProps {
    children: React.ReactNode;
}

export default function HeroUiProvider({ children }: Readonly<ProviderProps>) {
    // 2. Wrap HeroUIProvider at the root of your app
    return <HeroUIProvider>{children}</HeroUIProvider>;
}
