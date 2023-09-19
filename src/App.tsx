import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { Header } from "./components/navbar/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
