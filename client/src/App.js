import { Container } from "semantic-ui-react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css"

import { AuthProvider } from "./utils/auth";
import AuthRoute from "./utils/AuthRoute";

import MenuBar from "./components/menubar/MenuBar";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard"
import SinglePost from "./pages/singlePost/SinglePost";
import LandingPage from "./pages/landingPage/LandingPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <AuthRoute path="/home" component={Home} />
            <AuthRoute path="/post/:id" component={SinglePost} />
            <AuthRoute path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
