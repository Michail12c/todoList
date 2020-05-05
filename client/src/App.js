import React from 'react';
import './App.css';
import 'materialize-css';
import {Switch, Route} from 'react-router-dom'
import Header from './components/header';
import Footer from './components/footer';
import MainPage from './components/pages/MainPage';
import AuthPage from './components/pages/AuthPage';
import TodoPage from './components/pages/TodoPage';



function App() {
  return (

    <div className="App">
      <Header/> 
       <div className ='container'>
        <div className = 'test'>    
            <Switch>
              <Route exact path = '/' render = { () => <MainPage/>}/>
              <Route path ='/auth' render = {() => <AuthPage/>}/>
              <Route path='/todo' render = {() => <TodoPage/> }/>
            </Switch>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
