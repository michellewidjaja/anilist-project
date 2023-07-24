import React from 'react';
import '@testing-library/jest-dom';
import AnimeList from '../pages/animeList';
import {render, screen, waitFor} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ANIME_LIST } from '../graphql/getAnimeList';
import animeListMock from './mocks/animeListMock';

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

test('renders anime list to match snapshot', async () => {
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

test('show anime list successfully', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <BrowserRouter>
        <AnimeList />
      </BrowserRouter>
    </MockedProvider>);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Cowboy Bebop')).toBeInTheDocument();
    expect(screen.getByText('Cowboy Bebop: Tengoku no Tobira')).toBeInTheDocument();
    expect(screen.getByText('TRIGUN')).toBeInTheDocument();
  })
});