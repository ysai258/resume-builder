import React from 'react';
import { BrowserRouter as Router, Redirect, Route, useHistory,  } from 'react-router-dom';
import ResumeForm from './components/ResumeForm/ResumeForm';
import { Switch } from 'react-router-dom';
import ResumeList from './components/ResumeList/ResumeList';
import EditResume from './components/EditResume/EditResume';

const Header = ()=>{
  const history = useHistory();
return(
  <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#9cd1f8",justifyContent:"center"}}>
  <h3>Resume Builder</h3>
 <div className="navbar-nav">
   <a className='nav-item nav-link active' style={{cursor:"pointer"}} onClick={()=>history.push("/")}>create</a>
   <a className="nav-item nav-link active"  style={{cursor:"pointer"}} onClick={()=>history.push("listResume")}>view</a>
 </div>
 </nav>
)
}

function App() {
  return (
    <Router>
      <Header/>
      <div className='mt-3'>
      <Switch>
        <Route exact path="/" component={ResumeForm} />
        <Route exact path="/createResume" component={ResumeForm} />
        <Route exact path="/listResume" component={ResumeList} /> 
        <Route exact path="/editResume" component={EditResume} /> 

        <Route path="/*" render={()=><Redirect to={{pathname:"/"}}/>}/>
      </Switch>
      </div>

    </Router>
  );
}

export default App;
