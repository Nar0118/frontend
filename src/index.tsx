import ReactDOM from 'react-dom/client';
// import React, {  createContext, useContext } from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
import ThemeContext from './context/themeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// export const { Context, setContext } = createContext<any>(null);

// const { dark, setDark } = useContext(ThemeContext);

root.render(
  // <Context.Provider value={{
  //   user: new UserStore()
  // }}>
    <App />
  // </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
