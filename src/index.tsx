import * as React from 'react';
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App';
import "./styles.scss";

const client = new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: new InMemoryCache(),
  });

// var mountNode = document.getElementById("app");
// ReactDOM.render(
//     <ApolloProvider client={client}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </ApolloProvider>
// , mountNode);

const root = ReactDOM.createRoot(document.getElementById("app")!);

root.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>
);
