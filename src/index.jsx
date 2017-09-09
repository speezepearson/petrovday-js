import * as React from 'react';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

var foo = <button onClick={() => console.log("foo")}>Click!</button>;

$(() =>
ReactDOM.render(
  foo,
  document.getElementById('foo')
));
