import { Route, Routes } from 'react-router-dom';
import { BaseLayout } from '@layouts/baseLayout.tsx';
import { Login } from '@pages/login/login.tsx';
import { Home } from '@pages/home/home.tsx';
import { About } from '@pages/about/about.tsx';
import { HousesList } from '@pages/houses/housesList.tsx';
import { NewsList } from '@pages/news/newsList.tsx';
import { Vacancy } from '@pages/vacancy/vacancy.tsx';
import { Disclosure } from '@pages/disclosure/disclosure.tsx';
import { Contacts } from '@pages/contacts/contacts.tsx';
import { House } from '@pages/houses/house/house.tsx';
import { PrivateRoutes } from '@routes/utils/privateRoutes.tsx';
import { News } from '@pages/news/news/news.tsx';
import { AdminLayouts } from '@layouts/adminLayouts.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />}></Route>
        <Route path='/' element={<BaseLayout />}>
          <Route index element={<Home />}></Route>
          <Route path='about' element={<About />}></Route>
          <Route path='houses'>
            <Route index element={<HousesList />}></Route>
            <Route path=':id' element={<House />}></Route>
          </Route>
          <Route path='news'>
            <Route index element={<NewsList />}></Route>
            <Route path=':id' element={<News />}></Route>
          </Route>
          <Route path='vacancy' element={<Vacancy />}></Route>
          <Route path='disclosure' element={<Disclosure />}></Route>
          <Route path='contacts' element={<Contacts />}></Route>
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/admin' element={<AdminLayouts />}>
            <Route path='' element={<NewsList />}></Route>
            <Route path=':id' element={<News />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
