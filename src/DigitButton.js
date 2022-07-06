
import {Action} from './App'

export default function DigitButton({dispatch,digit}){

    return(
        <button onClick={()=> dispatch({type:Action.ADD_Digit, payload:{digit}})}>{digit}</button>
    )
}