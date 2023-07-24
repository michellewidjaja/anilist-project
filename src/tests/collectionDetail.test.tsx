import React from 'react';
import '@testing-library/jest-dom';
import CollectionDetail from '../pages/collectionDetail';
import {render, screen, waitFor} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';

test('renders collection detail to match snapshot', () => {
  const tree = render(
    <MemoryRouter initialEntries={['?collection=coll-1']}>
      <CollectionDetail />
    </MemoryRouter>);
  
  expect(tree).toMatchSnapshot();
});

test('show collection detail successfully', () => {
  const tree = render(
    <MemoryRouter initialEntries={['?collection=coll-1']}>
      <CollectionDetail />
    </MemoryRouter>);
  
  expect(screen.getByText('Collection coll-1')).toBeInTheDocument();
});