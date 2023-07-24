import React from 'react';
import '@testing-library/jest-dom';
import CollectionList from '../pages/collectionList';
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';

test('renders collection list to match snapshot', () => {
  const tree = render(
    <BrowserRouter>
      <CollectionList />
    </BrowserRouter>);
  
  expect(tree).toMatchSnapshot();
});

test('show collection list and add collection successfully', () => {
  render(
    <BrowserRouter>
      <CollectionList />
    </BrowserRouter>);

  const btnAddCollection = screen.getByTestId('btnAddCollection');
  const modalAddEditCollection = screen.getByTestId('modalAddEditCollection');
  expect(screen.getByText('My Collection')).toBeInTheDocument();
  expect(btnAddCollection).toBeInTheDocument();
  fireEvent.click(btnAddCollection);
  expect(modalAddEditCollection).toBeInTheDocument();
});