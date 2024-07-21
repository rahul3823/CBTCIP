import React,{Component} from 'react';
import {BrowserRouter,Route,Navigate, Routes } from 'react-router-dom'
import AuthPage from './components/Auth.js';
import BookingsPage from './components/Bookings.js';
import EventsPage from './components/Events.js'
import MainNavigation from './components2/Nav/Mainnav.js';
import AuthContext from './context/auth-context.js';
import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };
  render() {
  return (
   <BrowserRouter>
   <React.Fragment>
   <AuthContext.Provider  
               value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}>
   <MainNavigation/>
   <main className='main-content'>
   <Routes>
   {this.state.token && <Route path="/" element={<Navigate to="/events" />} />}
   {this.state.token && <Route path="/Auth" element={<Navigate to="/events" />} />}
      {!this.state.token && ( <Route path="/Auth" element={<AuthPage />} />)}
        <Route path="/events" element={<EventsPage />} />
        {!this.state.token &&(<Route path="/bookings" element={<BookingsPage />} />)}
        {!this.state.token && <Route path='/Auth' element={<AuthPage/>} />}
      </Routes>
      </main>
      </AuthContext.Provider>
      </React.Fragment>
      </BrowserRouter>
  );
}
}

export default App;
