import './App.css';
import Register from "./components/register";
import Login from "./components/login";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Home from "./page/Home";
import Test from "./components/Test";
import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/test">
                        <Test />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
}
export default App;
