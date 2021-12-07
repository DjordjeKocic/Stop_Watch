import React, { useContext, useEffect, useState } from "react";
import TimerContext from "../store/context";
import Button from "../UI/Button";
import classes from "./Timer.module.css";

const Timer = (props) => {
  const [timer, setTimer] = useState(0);

  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');
  const [mili, setMili] = useState('00');

  const [startTimer, setStartTimer] = useState(false);

  const context = useContext(TimerContext);

  useEffect(() => {
    let interval = null;

    if (startTimer) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 10);
      setMin(("0" + Math.floor((timer / 60000) % 60)).slice(-2));
      setSec(("0" + Math.floor((timer / 1000) % 60)).slice(-2));
      setMili(("0" + ((timer / 10) % 1000)).slice(-2));
      }, 10);
    } else {
      
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startTimer,timer]);

  const start = () => {
    setStartTimer(true);
  };

  const stop = () => {
    setStartTimer(false);

    context.addUser({
      id:Math.random(),
      name:context.regUser.name,
      time: `${min}:${sec}:${mili}`
    })
  };

  

  return (
    <div>
      <h2 className={classes.timer__h2}>
        <span>{min}:</span>
        <span>{sec}:</span>
        <span>{mili}</span>
      </h2>
      <Button onClick={start} className={classes.start}>
        Start
      </Button>
      
      <Button onClick={stop} className={classes.stop}>
        Stop
      </Button>
    </div>
  );
};

export default Timer;
