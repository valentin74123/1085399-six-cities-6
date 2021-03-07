import React from 'react';
import REactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {createAPI} from './api';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import offers from "./mocks/offers";
import {reducer} from './store/reducer';
import {ActionCreator} from './store/action';
import {checkAuth} from "./store/api-actions";
import {AuthorizationStatus} from "./const";
import {redirect} from "./store/middlewares/redirect";


const api = createAPI(
    () => store.dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

store.dispatch(checkAuth()).then(() => {
  REactDOM.render(
      <Provider store={store}>
        <App
          offers={offers}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
});
