import React, { createContext, useReducer } from "react";
const initialState = {
  reloadProduct:false
};

const store = createContext(initialState);
const { Provider } = store;

const SET_RELOAD_PRODUCT = "set_reload_product"


const reducer = (state, action)=>{
  switch (action) {
    case SET_RELOAD_PRODUCT:
      console.log(state,"state reload");
      return !state
    default:
      throw new Error("Invalid action")
  }
}

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState)
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { store, StateProvider };
