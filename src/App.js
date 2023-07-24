
import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

/**
 * https://stackoverflow.com/questions/69870484/take-input-value-from-submit-form-and-store-in-redux-store-to-use-later
 */

const userSlice = createSlice({
  name: "user",
  initialState: "",
  reducers: {
    saveUser: (state, action) => action.payload
  }
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(userSlice.actions.saveUser(name));
    navigate("/main");
  };

  const handleChangeName = (text) => {
    setName(text);
  };

  return (
    <div className="container">
      <div className="LoginBox">
        <form onSubmit={handleSubmitForm}>
          <h2>Welcome to codeleap network</h2>
          <text>Please enter your username</text>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => handleChangeName(e.target.value)}
            placeholder="Jane Doe"
          />
          <div className="button">
            <button
              type="submit"
              style={{
                backgroundColor: name ? "black" : "#cccccc",
                color: name ? "white" : "black"
              }}
              disabled={!name}
            >
              ENTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Main = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <h1>Main</h1>
      <div>User: {user}</div>
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
        </div>

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
    </Provider>
  );
}
