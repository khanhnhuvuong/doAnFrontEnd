import './App.css';
import Register from "./components/register";
import Login from "./components/login";
import Chat from "./components/chatApp";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Home from "./page/Home";
import UserList from "./components/Test";
import UserListPage from "./components/chatApp/userlist";
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
                </Switch>
            </BrowserRouter>
        );
}
export default App;
