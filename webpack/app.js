import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Github from './components/github';

// Stylesheets
require('./stylesheets/app.scss');

ReactDOM.render(
  <Github username="bhavyanshu" />,
  document.getElementById('my-github')
);
