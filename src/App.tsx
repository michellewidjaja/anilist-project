
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './pages/globalStyles';
import Header from './components/Header';

interface Props {
}

class App extends React.Component<Props> {
  render() {
    const AnimeList = lazy(() => import(/* webpackChunkName: "animeList" */ './pages/animeList'));
    const AnimeDetail = lazy(() => import(/* webpackChunkName: "animeDetail" */ './pages/animeDetail'));
    const CollectionList = lazy(() => import(/* webpackChunkName: "collectionList" */ './pages/collectionList'));
    const CollectionDetail = lazy(() => import(/* webpackChunkName: "collectionDetail" */ './pages/collectionDetail'));

    return (
      <>
        <Header />
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path='/' element={<AnimeList />}></Route>
              <Route path='/detail' element={<AnimeDetail />}></Route>
              <Route path='/collection' element={<CollectionList />}></Route>
              <Route path='/collectionDetail' element={<CollectionDetail />}></Route>
            </Routes>
          </Suspense>
        </Layout>
      </>
    );
  }
}

export default App;