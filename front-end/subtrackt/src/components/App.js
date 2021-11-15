import "../styles/App.css";
import LandingPage from "./LandingPage";
import Header from "./Header";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ProvideAuth } from "./use-auth";
import ProtectPage from './ProtectPage'

function App() {
  return (
    <ProvideAuth>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/landing">
              <LandingPage />
            </Route>

            <Route path="/sub_list">
              <ProtectPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </ProvideAuth>
  );
}

export default App;
