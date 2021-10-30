import logo from "../logo.svg";
import "../styles/App.css";
import SubscriptionList from "./SubscriptionList";
import LandingPage from "./LandingPage";
import Header from "./Header";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LogInPage from "./LogInPage";
import { ProvideAuth } from "./use-auth";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <ProvideAuth>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/login">
              <LogInPage />
            </Route>

            <Route path="/landing">
              <LandingPage />
            </Route>

            <PrivateRoute path="/sub_list">
              <SubscriptionList />
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </ProvideAuth>
  );
}

export default App;
