import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import AuthProvider from '../components/AuthProvider';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Hydrate from './Hydrate';
import authOptions from './api/auth/[...nextauth]/authOptions';
import './globals.css';
import ToastifyContainer from '../components/ToastifyContainer';
import ReduxProvider from '@/redux/provider';
import ActionContainer from '../components/ActionContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:
    'SnapPal - Organize, Share, and Cherish Memories with Our Photo Album Manager',
  description:
    'Discover the ultimate photo management experience with SnapPal. Effortlessly organize your cherished moments into customizable albums, create stunning slideshows, and share your favorite memories with loved ones. Enjoy seamless navigation, robust privacy controls, and a user-friendly interface that makes managing your photo collection a breeze. Download SnapPal now and keep your precious memories just a click away.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Hydrate>
          <ReduxProvider>
            <AuthProvider>
              {session && <Header user={session?.user} />}
              <div className="flex container">
                {session && <SideMenu />}
                {children}
              </div>
              <ActionContainer />
              <ToastifyContainer />
            </AuthProvider>
          </ReduxProvider>
        </Hydrate>
      </body>
    </html>
  );
}
