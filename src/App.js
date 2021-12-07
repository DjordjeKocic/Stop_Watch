import { useContext } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './App.css';
import Registar from './components/Registar/Registar';
import Timer from './components/Timer';
import Users from './components/Users/Users';
import TimerContext from './store/context';

function App() {

  const context = useContext(TimerContext);

  return (
      <div className="stopwatch">
      <h1>Stop<span style={{color:"red"}}>Watch</span></h1>
      {context.registered ? <Fragment>
      <Timer/>
      <Users/>
      </Fragment> :
      <Registar/>}
      </div>
  );
}

export default App;
