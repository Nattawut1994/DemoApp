/**
 * @format
 */
import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducer from './src/reducers';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './src/saga';
import logger from 'redux-logger';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(rootSaga)

const AppDemo = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <App />
      </SafeAreaProvider>
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => AppDemo);
