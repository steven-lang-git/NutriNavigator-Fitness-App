import './App.css';
import React from 'react';



import Sidebar from "./Components/Sidebar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Meals from './Components/Meals'
import Explore from './Components/Explore'
import Fitness from './Components/Fitness'
import Cardio from './Components/Cardio'
import Tracking from './Components/Tracking'
import Bookmarks from './Components/Bookmarks'
import Lists from './Components/Lists'
import Profile from './Components/Profile'
import More from './Components/More'
function App() {

  return (

    <div>
      <div style={{ display: "flex" }}>
        
          <Router>
            <Sidebar />
            <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/explore' element={<Explore />}></Route>
              <Route exact path='/fitness' element={<Fitness />}></Route>
              <Route exact path='/cardio' element={<Cardio />}></Route>
              <Route exact path='/meals' element={<Meals />}></Route>
              <Route exact path='/tracking' element={<Tracking />}></Route>
              <Route exact path='/bookmarks' element={<Bookmarks />}></Route>
              <Route exact path='/lists' element={<Lists />}></Route>
              <Route exact path='/profile' element={<Profile />}></Route>
              <Route exact path='/more' element={<More />}></Route>

            </Routes>
          </Router>
     

      </div>




    </div>

  );
}

export default App;
