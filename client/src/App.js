import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import GameCreate from './components/GameCreate';
import Detail from './components/Detail';
import NotFound from "./components/NotFound";

function App() {
	return (
		<BrowserRouter>
			<>
				<Switch>
					<Route exact path='/' component={LandingPage} />
					<Route exact path='/home' component={Home} />
					<Route exact path='/videogame' component={GameCreate} />
					<Route exact path='/videogame/:id' component={Detail} />
					<Route component={NotFound} />
				</Switch>
			</>
		</BrowserRouter>
	);
}

export default App;
