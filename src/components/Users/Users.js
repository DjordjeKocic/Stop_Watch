import { useContext } from "react";
import TimerContext from "../../store/context";
import Button from "../../UI/Button";
import classes from './Users.module.css';

const Users = () => {
    const context = useContext(TimerContext);
    return (
        <div>
            {context.users.map(user => {
                return <div className={classes.userList} key={user.id}>
                    <p>{user.name}</p>
                    <p>{user.time}</p>
                </div>
            })}
            <Button className={classes.button__Retrun}>Return</Button>
        </div>
    )
}

export default Users;