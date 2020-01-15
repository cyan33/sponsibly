import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './theme'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Suspense fallback={null}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Suspense>
, document.getElementById('root'));

registerServiceWorker();
