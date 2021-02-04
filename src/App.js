import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';
import List from './components/List';
import Item from './components/Item';
import './App.css';

function App() {
  return (
    <Provider store={store}>

    <div className="App">
      <Router>
        <Switch>
          <Route  path='/services/:id'  render={(props) => <Item {...props}/>}></Route> 
          <Route path='/services'  render={(props) => <List {...props}/>}></Route>
          <Redirect to="/services" />
        </Switch>
      </Router>
      
    </div>
    </Provider>

  );
}

export default App;
