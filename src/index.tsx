import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import 'tw-elements';
// import { } from 'styled-components/cssprop';

import { store } from './store';

import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './components/App';

// import * as moment from './lib/moment-with-locales.min'
import moment from 'moment';
import 'moment/locale/ru';

const container = document.getElementById('root')!;
const root = createRoot(container);
moment.locale('ru');
console.log(moment);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
