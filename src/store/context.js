import React from "react";

const TimerContext = React.createContext({
    users:[],
    addUser:()=>{},
    removeUser:()=>{},
    nameInput:()=>{},
    nameInputValidate:()=>{},
    passInput:()=>{},
    formValid:false,
    registered:false,
    registerForm:()=>{},
    regUser:null
});

export default TimerContext;

