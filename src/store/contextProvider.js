import {useReducer, useState } from "react"
import TimerContext from "./context"


const defaultState = {
    users:[
        {id:"1", name:"John", time:"00:14:58"}
    ],
    registered:false,
    regUser:{}
}

const userReducer = (state,action) => {
    if(action.type === "ADD"){
        return {
            users: [...state.users,action.value],
            registered:true,
            regUser:state.regUser
        }
    }
    if(action.type === "REMOVE") {
        let userIndex = state.users.findIndex(user => user.id === action.value);

        let copyState = [...state.users];

        copyState.splice(userIndex,1);
        return {
            users:copyState,
            registered:false,
            regUser:state.regUser
        }
    }
    if(action.type === "REGISTER"){
        let users = [...state.users];
        return {
            users,
            registered:action.value.reg,
            regUser:action.value
        }
    }
    return defaultState
}



const nameInputChange = (state,action) => {

    if(action.type === "NAME_INPUT") {
        return {value:action.value, isValid:action.value.trim().length > 5}
    }

    if(action.type === "NAME_BLUR"){
        return {value:state.value,isValid:state.value.trim().length > 5}
    }

    return {value:'', isValid:false}
}

const passwordInputChange = (state,action) => {

    if(action.type === "PASS_INPUT") {
        
        return {value:action.value, isValid:action.value.trim().length > 3}
    }

    


    return {value:"", isValid:false}
}


const ContextProvider = (props) => {

    const [userState,userDispatchAction] = useReducer(userReducer,defaultState);

    const [nameInput,setNameInputDispatchAction] = useReducer(nameInputChange,{value:"",isValid:null})

    const [passInput,setPassinputDispatchAction] = useReducer(passwordInputChange, {value:"",isValid:null})



    const [formValid,setFormValid] = useState(false);

   
   

    const addUserToCard = (user) => {
        userDispatchAction({
            type:'ADD',
            value:user
        })
    }

    const removeUserFromCard = (id) => {
        userDispatchAction({
            type:'REMOVE',
            value:id
        })
    }
    
    const nameInputChangeHandler = (e) => {
        setNameInputDispatchAction({
            type:'NAME_INPUT',
            value: e.target.value,
            
        })


        setFormValid(
            e.target.value.trim().length > 5 && passInput.value.trim().length > 3
        )
    }

    const nameInputValidate = () => {
        setNameInputDispatchAction({
            type:'NAME_BLUR'
        })
    }

    const passwordInputChangeHandler = (e) => {
        setPassinputDispatchAction({
            type:"PASS_INPUT",
            value:e.target.value
        })

        setFormValid(
            e.target.value.trim().length > 3 && nameInput.value.trim().length > 5
        )
    }

    const registeredForm = () => {
        userDispatchAction({
            type:'REGISTER',
            value:{name:nameInput.value,reg:true}
        })
    }

    const userContext = {
        users:userState.users,
        addUser:addUserToCard,
        removeUser:removeUserFromCard,
        nameInput:nameInputChangeHandler,
        nameInputValidate:nameInputValidate,
        passInput:passwordInputChangeHandler,
        formValid:formValid,
        registered:userState.registered,
        registerForm:registeredForm,
        regUser:userState.regUser
    }

    return (
        <TimerContext.Provider value={userContext}>
            {props.children}
        </TimerContext.Provider>
    )
}

export default ContextProvider;