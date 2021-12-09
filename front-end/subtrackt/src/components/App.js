import React from "react";
import "../styles/App.css";
import LandingPage from "./LandingPage";
import Header from "./Header";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ProvideAuth } from "./use-auth";
import ProtectPage from "./ProtectPage";
import { Redirect } from "react-router";
import { ProvideVeil } from "./use-veil";
import Veil from "./Veil";
import TeamPage from "./TeamPage";
import FAQPage from "./FAQPage.jsx";
import Sub from "./SubscriptionList";

function App() {
	return (
		<ProvideAuth>
			<ProvideVeil>
				<Veil>
					<div className='App'>
						<Router>
							<Header />
							<Switch>
								<Route path='/landing'>
									{/* <LandingPage /> */}
									<Sub/>
								</Route>

								<Route path='/team'>
									<TeamPage />
								</Route>

								<Route path='/faqpage'>
									<FAQPage />
								</Route>
								<Route path='/sub_list'>
									<ProtectPage />
								</Route>

								<Route path='/'>
									<Redirect to='/landing'></Redirect>
								</Route>
							</Switch>
						</Router>
					</div>
				</Veil>
			</ProvideVeil>
		</ProvideAuth>
	);
}

export default App;
