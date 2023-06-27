'use client'

import { useEffect, type ReactNode } from "react";
import toast, { Toaster } from 'react-hot-toast'
import { ActivityIndicator } from "./ui/ActivityIndicator";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const handleOffline = () => {
    toast.error('Network connection lost')
}
const handleOnline = () => {
    toast.success('Network connection restored')
}

const queryClient = new QueryClient()

export default function ClientSideProviders({ children }: { children: ReactNode }) {
    useEffect(() => {
        window.addEventListener('offline', handleOffline)
        window.addEventListener('online', handleOnline)

        return () => {
            window.removeEventListener('offline', handleOffline)
            window.removeEventListener('online', handleOnline)
        }
    }, [])

    return <>
        <Toaster position="bottom-left" toastOptions={{
            className: 'toast',
            loading: {
                icon: <ActivityIndicator className='text-blue-500 text-2xl' />
            }
        }} />
        <QueryClientProvider client={queryClient}>
            { children }
        </QueryClientProvider>
    </>
}