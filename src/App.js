import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import UserWrapper from "./Components/Wrapper/UserWrapper";

function App() {

  return (
 
    <BrowserRouter>
      <Provider store={Store}>
        <Routes>
          <Route path="/*" element={<UserWrapper/>}></Route> 
        </Routes>
      </Provider>
    </BrowserRouter>
      );
}

export default App;