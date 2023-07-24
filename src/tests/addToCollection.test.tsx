import React from 'react';
import '@testing-library/jest-dom';
import AddToCollection from '../components/AddToCollection';
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import AnimeDetailMock from './mocks/animeDetailMock';

test('renders add to collection component to match snapshot', () => {
  const tree = render(
    <MemoryRouter initialEntries={['?id=1']}>
      <AddToCollection detail={AnimeDetailMock.Media} />
    </MemoryRouter>);
  
  expect(tree).toMatchSnapshot();
});

test('show add to collection successfully', () => {
  render(
    <MemoryRouter initialEntries={['?id=1']}>
      <AddToCollection detail={AnimeDetailMock.Media} />
    </MemoryRouter>);

  const addToColl = screen.getByTestId('btnAddToCollection');
  expect(addToColl).toBeInTheDocument();
  fireEvent.click(addToColl);
  expect(screen.getByTestId('modalAddCollection')).toBeInTheDocument();
});

test('save to collection successfully',() => {
  render(
    <MemoryRouter initialEntries={['?id=1']}>
      <AddToCollection detail={AnimeDetailMock.Media} />
    </MemoryRouter>);

  const inputColl = screen.getByTestId('inputCollection');
  const btnColl = screen.getByTestId('btnSaveToCollection');
  expect(inputColl).toBeInTheDocument();
  fireEvent.change(inputColl, { target: { value: 'coll1' } });
  fireEvent.click(btnColl);
  expect(screen.getByText('Succesfully added to coll1 collection')).toBeInTheDocument();
  expect(inputColl).toHaveValue('');

  //save from existing collection list
  const listColl = screen.getByText('coll1');
  fireEvent.click(listColl);
  expect(inputColl).toHaveValue('coll1');
  fireEvent.click(btnColl);
  expect(screen.getByText('Duplicate anime in the collection - coll1')).toBeInTheDocument();
});