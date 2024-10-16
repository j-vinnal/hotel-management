import BootstrapActivation from '@/components/BootstrapActivation';
import Footer from '@/components/nav/Footer';
import Header from '@/components/nav/Header';
import Context from '@/states/contexts/Contexts';
import 'bootstrap/dist/css/bootstrap.min.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Hotel X Booking',
  description: 'Hotel Booking',
  keywords: 'hotel, booking, room, reservation',
};

/**
 * RootLayout component that provides the main structure for the application.
 * It includes global context, header, footer, and other necessary components.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout of the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Context>
          <Header />

          <div className='container'>
            <main role='main' className='container-row'>
              {children}
            </main>
          </div>

          <ToastContainer />
          <Footer />
          <BootstrapActivation />
        </Context>
      </body>
    </html>
  );
}
