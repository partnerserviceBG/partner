import { RouterProvider } from 'react-router-dom';
import router from '@routes/index.router.tsx';
import './styles/app.scss';
import { ScrollToButton } from '@components/share/scroll-to-button/ScrollToButton.tsx';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ScrollToButton />
    </>
  );
}

export default App;
