import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App.tsx';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  input {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    outline: none;
  }  
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <GlobalStyle />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
);
