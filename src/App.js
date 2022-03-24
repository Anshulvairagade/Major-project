import Home from "./pages/home/Home";
import {Route, useHistory} from "react-router";
import "./App.css"
import Chat from "./Chat/Chat";
import Auth from "./components/Auth/Auth";
import { useEffect } from "react";
import Translate from "./Translate/Translate";



function App() {

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chat");
  }, [history]);

  return (
       <div className="App">
         <Route path='/' component={Home} exact></Route>
         <Route path='/chat' component={Chat} exact></Route>
         <Route path='/login' component={Auth}></Route>
         <Route path='/translate' component={Translate}></Route>
       </div>
  )
    

}

export default App;
