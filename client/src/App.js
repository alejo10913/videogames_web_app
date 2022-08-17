import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import LandingPAge from './components/LandingPage/LandingPage';
import GameDetail from './components/GameDetail/GameDetail';
import NavBar from './components/Navbar/Navbar';
import GameCreate from './components/CreateGame/CreateGame';
import Favorite from './components/favoritos/Favorite';
import ResultsSearch from './components/ResultsSearch/ResultsSearch';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/'  component = {LandingPAge}/>
      <Route  path ='/home'  component ={NavBar}/> 
      <Route exact path= '/home' component ={Home}/>
      <Route exact path= '/home/game' component={GameCreate} />
      <Route exact path= '/home/favoritos' component={Favorite} />
      <Route exact path= '/home/home/:id' component={GameDetail} />
      <Route exact path= '/home/home/home/:id' component={GameDetail} />
      <Route exact path= '/home/resultados' component={ResultsSearch} />
    </div>
    </BrowserRouter>
  );
}

export default App;
