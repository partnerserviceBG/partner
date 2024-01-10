import { RouterProvider } from 'react-router-dom';
import router from '@routes/index.router.tsx';
import './styles/app.scss';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
