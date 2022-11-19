import React from 'react';
import { render } from 'react-dom';

import './i18n';

import { PreloadApi } from '../ipc';

import App from './containers/App';
import ContextProvider from './state/context';

declare global {
  interface Window {
    electron: PreloadApi;
  }
}

const root = document.createElement('div');
document.body.appendChild(root);

render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  root,
);
