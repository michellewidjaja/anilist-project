import React from 'react';
import '@testing-library/jest-dom';
import AnimeList from '../pages/animeList';
import {render, waitFor} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ANIME_LIST } from '../graphql/getAnimeList';
import animeListMock from './mocks/animeListMock.json';

const mocks = [
  {
    request: {
      query: GET_ANIME_LIST,
      variables: {
        page: 0,
        perPage: 10
      }
    },
    result: {
      data: animeListMock
    }
  }
];

test('renders anime list successfully', async () => {
  const tree = render(
    <MockedProvider mocks={mocks}>
      <BrowserRouter>
        <AnimeList />
      </BrowserRouter>
    </MockedProvider>);
  
  await waitFor(() => {
    expect(tree).toMatchSnapshot();
  })
});