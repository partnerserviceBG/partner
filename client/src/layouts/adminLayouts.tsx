import { Footer, Header } from '@components/common';
import { Outlet } from 'react-router-dom';

export const AdminLayouts = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
