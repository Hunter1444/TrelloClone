import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

let defaultColumns = [
  {
    title: 'Колумн1',
    items: ['айтем1', 'айтем2'],
    count:1
  },
  {
    title: 'Колумн2',
    items: ['ritem21', 'ritem22'],
    count:1
  },
  {
    title: 'Колумн3',
    items: ['titem31', 'titem22'],
    count:1
  },
]

function reducer(state = defaultColumns, action){
  if(action.type === "CREATE_COLUMN"){
    return  [
    {
      title: action.payload,
      items: [],
      count: 1
    },
      ...state
    ]
  } else if(action.type === "CREATE_ROW"){
    state.forEach(function(item, index){
      if(item.title === action.payload.columnName){
        let numb = state[index].count;
        numb = numb + 1;
        state[index].count = numb

        if(action.payload.rowName.length === undefined){
          let promptInfo = prompt('Название карточки')
          state[index].items.push('');
        } else{
          state[index].items.push(action.payload.rowName);
        }

      }
    })
    return [ ...state ]
  } else if(action.type === "REMOVE_ROW"){
      state.forEach(function(item, index){
          item.items.forEach(function(NestedItem, NestedIndex){
            if(NestedItem === action.payload.rowName){
              state[index].items.splice(NestedIndex, 1)
            }
          })
      })
      return [ ...state ]
  } else if(action.type === "CHANGE_TEXT"){
      state.forEach(function(item, index){
          item.items.forEach(function(NestedItem, NestedIndex){
            let numb = state[index].count;
            numb = Number(numb) + 1;
            state[index].count = numb
            if(NestedItem === action.payload.newName){
              state[index].items[NestedIndex] = action.payload.oldName
            }
          })
      })
      return [ ...state ]
  }
  else{
    return state
  }
}

let store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
