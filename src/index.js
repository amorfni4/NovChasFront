import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProductStore from './store/ProductStore';
import UserStore from './store/UserStore';
import DealStore from './store/DealStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
      user: new UserStore(),
      product: new ProductStore(),
      deal: new DealStore(),
  }}>
    <App />
  </Context.Provider>,
);