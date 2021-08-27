import React from 'react';
import ReactDOM from 'react-dom';
import { AlitaProvider, setConfig } from 'redux-alita';
import umbrella from 'umbrella-storage';
import Page from './Page';
import * as serviceWorker from './serviceWorker';
import * as apis from './service';
// import { AppContainer } from 'react-hot-loader';
import './style/lib/animate.css';
import './style/index.less';
import './style/antd/index.less';

setConfig(apis);
umbrella.config('REACT-ADMIN');


ReactDOM.render(
    // <AppContainer>
    <AlitaProvider>
        <Page />
    </AlitaProvider>,
    // </AppContainer>
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
