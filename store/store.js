import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const initial={
  user:{},
  home:{},
  op:{}
}

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunk)
)
// store.subscribe(() => {  
//   console.log(state);
// })