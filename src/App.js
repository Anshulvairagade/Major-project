import Home from "./pages/home/Home";
import {Route} from "react-router-dom";
import "./App.css"
import Chat from "./Chat/Chat";
import Auth from "./components/Auth/Auth";



function App() {
  return (
       <div className="App">
         <Route path='/' component={Home} exact></Route>
         <Route path='/chat' component={Chat} ></Route>
         <Route path='/login' component={Auth}></Route>
       </div>
  )
    

}

export default App;
