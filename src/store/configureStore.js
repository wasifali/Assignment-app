import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer/index';

const initialState = {
    user: {
        data: '',
        loading: false,
        error: '',
    },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
    let persistor = persistStore(store);
    return {persistor, store};
};
