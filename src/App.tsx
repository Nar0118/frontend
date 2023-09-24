import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import AppRouter from "./components/AppRouter";
import { Header } from "./components/feature/navbar/Navbar";

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
