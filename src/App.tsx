
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import AnimeList from './pages/animeList';
import AnimeDetail from './pages/animeDetail';
import CollectionList from './pages/collectionList';
import CollectionDetail from './pages/collectionDetail';
import { Layout } from './pages/globalStyles';

interface Props {
}

class App extends React.Component<Props> {
  render() {
    return (
      <>
        <Header />
        <Layout>
          <Routes>
            <Route path='/' element={<AnimeList />}></Route>
            <Route path='/detail' element={<AnimeDetail />}></Route>
            <Route path='/collection' element={<CollectionList />}></Route>
            <Route path='/collectionDetail' element={<CollectionDetail />}></Route>
          </Routes>
        </Layout>
      </>
    );
  }
}

export default App;