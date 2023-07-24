import React from 'react';
import '@testing-library/jest-dom';
import AnimeDetail from '../pages/animeDetail';
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ANIME_DETAIL } from '../graphql/getAnimeDetail';
import AnimeDetailMock from './mocks/AnimeDetailMock.json';

const mocks = [
  {
    request: {
      query: GET_ANIME_DETAIL,
      variables: {
        id: '1'
      }
    },
    result: {
      data: AnimeDetailMock
    }
  }
];

test('renders anime detail to match snapshot', async () => {
  const tree = render(
    <MockedProvider mocks={mocks}>
      <MemoryRouter initialEntries={['?id=1']}>
        <AnimeDetail />
      </MemoryRouter>
    </MockedProvider>);
  
  await waitFor(() => {
    expect(tree).toMatchSnapshot();
  })
});

test('show anime detail and add to collection successfully', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <MemoryRouter initialEntries={['?id=1']}>
        <AnimeDetail />
      </MemoryRouter>
    </MockedProvider>);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Cowboy Bebop')).toBeInTheDocument();

    const addToColl = screen.getByTestId('btnAddToCollection');
    expect(addToColl).toBeInTheDocument();
    fireEvent.click(addToColl);
    expect(screen.getByTestId('modalAddCollection')).toBeInTheDocument();
  })
});