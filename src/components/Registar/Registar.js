import { useContext } from 'react';
import TimerContext from '../../store/context';
import Button from '../../UI/Button';
import classes from './register.module.css';
const Registar = (props) => {


    const context = useContext(TimerContext);

    const onNameChange = (e) => {
       context.nameInput(e);
    }

    const onPasswordChange = (e) => {
        context.passInput(e);
    }

    const onRegisterHandler = (e) => {
        e.preventDefault();
        context.registerForm();        
    }
    return(
        <form onSubmit={onRegisterHandler} className={classes.form}>
            <label className={classes.form__label}>Register(enter name)</label>
            <input onChange={onNameChange} onBlur={context.nameInputValidate} className={classes.form__input} type="text"/>
            <label className={classes.form__label}>Your Password</label>
            <input onChange={onPasswordChange} className={classes.form__input} type="password"/>
            <Button type="submit" className={classes.form__btn}  disabled={!context.formValid}>Submit</Button>
        </form>
    )
}

export default Registar;