import './App.css'
import { Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Chatpage from './pages/Chatpage';

function App() {
  return (
      <div className="bg-black min-h-screen">
          <Route exact path="/" component = {SignUp}/>
          <Route exact path="/login" component = {Login}/>
          <Route path="/chats" component = {Chatpage}/>          
      </div>
  );
}

export default App;
