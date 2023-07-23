import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('renders App successfully', async () => {
  const tree = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  await waitFor(() => {
    expect(tree).toMatchSnapshot();
  })
});