import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Github from './components/github';

// Stylesheets
require('../stylesheets/github.scss');

var elem = document.getElementById('my-github');

if(elem) {
  ReactDOM.render(<Github username="bhavyanshu" />, elem);
}
