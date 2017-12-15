import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// import { persistStore, autoRehydrate } from 'redux-persist';
// import { AsyncStorage } from 'react-native';

const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk)));

// const store = createStore(
//   reducers,
//   {},
//   compose(applyMiddleware(thunk), autoRehydrate())
// );

// persistStore(store, { storage: AsyncStorage, whitelist: ['auth'] });

export default store;
