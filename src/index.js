import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import './critterpedia.scss';
import './fonts/SourceSansPro-Regular.ttf';
import CritterPedia from './components/CritterPedia';

ReactDOM.render(
  <CritterPedia />,
  document.getElementsByTagName('body')[0],
);
