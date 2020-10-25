import { createStore, applyMiddleware } from "redux";

// Logger with default options


import reducer from "./reducer";

export default function configureStore() {
  const store = createStore(reducer);
  return store;
}