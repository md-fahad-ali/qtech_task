import localFont from 'next/font/local';
import { Epilogue, Geist_Mono } from 'next/font/google';

export const clashDisplay = localFont({
    src: [
        { path: '../public/fonts/ClashDisplay-Extralight.otf', weight: '200', style: 'normal' },
        { path: '../public/fonts/ClashDisplay-Light.otf', weight: '300', style: 'normal' },
        { path: '../public/fonts/ClashDisplay-Regular.otf', weight: '400', style: 'normal' },
        { path: '../public/fonts/ClashDisplay-Medium.otf', weight: '500', style: 'normal' },
        { path: '../public/fonts/ClashDisplay-Semibold.otf', weight: '600', style: 'normal' },
        { path: '../public/fonts/ClashDisplay-Bold.otf', weight: '700', style: 'normal' },
    ],
    variable: '--font-clash-display',
    display: 'swap',
});

export const epilogue = Epilogue({
    variable: '--font-epilogue',
    subsets: ['latin'],
    display: 'swap',
});

export const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
    display: 'swap',
});
