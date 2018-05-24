import React from 'react';
import ReactDOM from 'react-dom';
import './Sass/index.css';
import Rdrag from './RDrag'
import registerServiceWorker from './registerServiceWorker';
import "storm-react-diagrams/dist/style.min.css";


ReactDOM.render(<Rdrag/>, document.getElementById('root'));
registerServiceWorker();
