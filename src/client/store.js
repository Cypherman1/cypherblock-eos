import reducers from './reducers';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxThunk from 'redux-thunk';
import metisMenuReducer from 'react-metismenu/lib/reducers';

const mainreducers = combineReducers({
  myStore: reducers,
  // Your other reducer assignments...
  metisMenuStore: metisMenuReducer // Here "metisMenuStore" is default and it can be changed with "reduxStoreName" prop
});

export const mainstore = createStore(mainreducers, {myStore: {}, metisMenuStore: {}}, applyMiddleware(reduxThunk));
