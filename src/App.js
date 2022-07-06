import { useReducer } from 'react';
import './scss/style.scss'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const Action = {
  ADD_Digit : 'add-digit',
  CLEAR: 'clear',
  DELETE :'delete',
  CHOOSE_OPERATION:'choose-operation',
  EVALUATION:'evaluation',
}

function reducer(state,{ type, payload }){
  switch (type) {
    case Action.ADD_Digit:
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currantOperated:payload.digit
        }
      }
      if(payload.digit === '0' && state.currantOperated === '0'){ return state}
      if(payload.digit === '.' && state.currantOperated.includes('.')){ return state}
            return{
        ...state,
        currantOperated: `${state.currantOperated || ""}${payload.digit}`
      }

      case Action.CHOOSE_OPERATION:
        if(state.currantOperated == null && state.prevOperated == null){
           return state
           }

           if(state.currantOperated == null){
             return {
               ...state,
               operation:payload.operation
             }
           }
        if(state.prevOperated == null){
          return {
            ...state,
            operation: payload.operation,
            prevOperated:state.currantOperated,
            currantOperated: null,
          }
        }
      return{
        ...state,
            operation: payload.operation,
            prevOperated:evaluation(state),
            currantOperated: null,
      }

      case Action.DELETE:
            if(state.overwrite){
              return{
                ...state,
                overwrite:false,
                currantOperated:null,
              }
            }
            if(state.currantOperated == null) {
              return state
            }
            if(state.currantOperated.length === 1){
              return{
                ...state,
                currantOperated:null
              }
            }
            return{
              ...state,
              currantOperated:state.currantOperated.slice(0, -1)
            }

            case Action.EVALUATION:
              if(state.currantOperated == null || state.prevOperated == null || state.operation == null){
                return state
              }

              return{
                ...state,
                 overwrite:true,
                 prevOperated:null,
                operation:null,
                currantOperated:evaluation(state),
               
              }
              
      case Action.CLEAR:
        return {};
        break

     
  }
  

}



function evaluation ({currantOperated, prevOperated, operation}){
 let prev = parseFloat(prevOperated);
 let current = parseFloat(currantOperated);
 if (isNaN(prev) || isNaN(current))
 {
   return " "
 }

 let competition = " ";
 switch (operation) {
   case "*":
     competition = prev * current;
     break;
     case "/":
     competition = prev / current;
     break;
     case "-":
     competition = prev - current;
     break;
     case "+":
     competition = prev + current;
     break;
 
   default:
     break;
 }
 return competition.toString()
}

// const Init_format = new Init.NumberFormat("en-us",{
//   maximumFractionDigits: 0,
// })

function App() {
  const [{currantOperated, prevOperated,operation}, dispatch] = useReducer(reducer,{})
 
  return (
    <div className='calc_body'>
      <div className='calc_body_output'>
        <div className='preValue'>{prevOperated}{operation}</div>
        <div className='value'>{currantOperated}</div>
      </div>
        <button className='span' onClick={()=>dispatch({type:Action.CLEAR})}>AC</button>
        <button onClick={()=>dispatch({type:Action.DELETE})}>DEL</button>
        <OperationButton operation="/" dispatch={dispatch}/>
        <DigitButton digit="1" dispatch={dispatch}/>
        <DigitButton digit="2" dispatch={dispatch}/>
        <DigitButton digit="3" dispatch={dispatch}/>
        <OperationButton operation="*"dispatch={dispatch}/>
        <DigitButton digit="4" dispatch={dispatch}/>
        <DigitButton digit="5" dispatch={dispatch}/>
        <DigitButton digit="6" dispatch={dispatch}/>
        <OperationButton operation="-" dispatch={dispatch}/>
        <DigitButton digit="7" dispatch={dispatch}/>
        <DigitButton digit="8" dispatch={dispatch}/>
        <DigitButton digit="9" dispatch={dispatch}/>
        <OperationButton operation="+" dispatch={dispatch}/>
        <DigitButton digit="." dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch}/>
        <button className='span' onClick={()=>dispatch({type:Action.EVALUATION})}> = </button>
    </div>
  )
}

export default App