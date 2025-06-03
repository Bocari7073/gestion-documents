import './globals.css';
import SocketInit from '@/components/SocketInit';
import { ReactNode } from 'react';
import AuthForm from '@/components/AuthForm';
import LoginForm from './login/LoginForm';
import { Toaster } from 'react-hot-toast';


export const metadata = {
  title: 'Plat-forme de gestion de document en ligne',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body>
         <Toaster position="top-right" reverseOrder={false} />
        <SocketInit/>
        {/* <LoginForm/> */}
        {/* <AuthForm/> */}
        {/* <SocketInit /> */}
        {children}
      </body>
    </html>
  );
}
