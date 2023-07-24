import React from 'react';
import '@testing-library/jest-dom';
import AddEditCollection from '../components/AddEditCollection';
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import AnimeDetailMock from './mocks/animeDetailMock';

test('renders add edit collection component to match snapshot', () => {
  const tree = render(
    <BrowserRouter>
      <AddEditCollection />
    </BrowserRouter>);
  
  expect(tree).toMatchSnapshot();
});

test('handle add collection successfully', () => {
  render(
    <BrowserRouter>
      <AddEditCollection action="add" />
    </BrowserRouter>);

  const addColl = screen.getByTestId('btnAddCollection');
  const addCollText = screen.getAllByText('Add Collection');
  expect(addColl).toBeInTheDocument();
  fireEvent.click(addColl);
  expect(screen.getByTestId('modalAddEditCollection')).toBeInTheDocument();
  expect(addCollText[1]).toBeInTheDocument();

  const inputColl = screen.getByTestId('inputCollectionName');
  const btnColl = screen.getByTestId('btnSaveCollection');
  expect(inputColl).toBeInTheDocument();
  fireEvent.change(inputColl, { target: { value: 'coll-1' } });
  fireEvent.click(btnColl);
  expect(screen.getByText('Succesfully added to coll-1 collection')).toBeInTheDocument();
  expect(inputColl).toHaveValue('');
});

test('handle edit collection successfully', () => {
  render(
    <BrowserRouter>
      <AddEditCollection action="edit" collectionData="coll-1" />
    </BrowserRouter>);

  const editColl = screen.getByTestId('btnEditCollection');
  expect(editColl).toBeInTheDocument();
  fireEvent.click(editColl);
  expect(screen.getByTestId('modalAddEditCollection')).toBeInTheDocument();
  expect(screen.getByText('Edit Collection')).toBeInTheDocument();

  const inputColl = screen.getByTestId('inputCollectionName');
  expect(inputColl).toBeInTheDocument();
  expect(inputColl).toHaveValue('coll-1');
});