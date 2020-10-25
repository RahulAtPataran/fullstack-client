import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import store from './reduxweb/store'
import Home from './components/Home';


import Events from './components/Events';



function App() {
  return (

    <Provider store={store}>
       <Router>
         <Switch>
           <Route path='/' exact>
             <Home />

             </Route>

           <Route path='/events' exact>
             <Events/>

             </Route>

           <Route path='/room' exact>
           <Events/>


             </Route>

          



           </Switch>
         </Router>
      </Provider>
    
  );
}

export default App;
