"use client"; // Error components must be Client Components

import { useEffect } from "react";

type ErrorProps = Readonly<{
    error: Error & { digest?: string };
    reset: () => void;
}>;

export default function ErrorPage({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
