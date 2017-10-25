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
    items: [
      {
        name:'айтем1',
        order:0,
      }
    ],
    count:0,
    id:0
  },

  {
    title: 'Колумн2',
    items: [
      {
        name:'айтем21',
        order:0,
      },
      {
        name:'айтем22',
        order:1,
      }
    ],
    count:1,
    id:0
  },
]

function reducer(state = defaultColumns, action){
  if(action.type === "CREATE_COLUMN"){
    return  [
    {
      title: action.payload,
      items: [],
      count: -1,
      id: 0,
    },
      ...state
    ]
  } else if(action.type === "CREATE_ROW"){
    state.forEach(function(item, index){
      if(item.title === action.payload.columnName){
        let numb = state[index].count;
        numb = numb + 1;
        state[index].count = numb;

        if(action.payload.rowName.length === undefined){
          let promptInfo = prompt('Название карточки')
          state[index].items.push({
            name: promptInfo,
            order:numb
          });
        } else{
          state[index].items.push({
            name: action.payload.rowName,
            order:numb
          });
        }

      }
    })
    return [ ...state ]
  } else if(action.type === "REMOVE_ROW"){
      state.forEach(function(item, index){
          item.items.forEach(function(NestedItem, NestedIndex){
            if(NestedItem.name === action.payload.rowName){
              state[index].count = state[index].count - 1;
              state[index].items.splice(NestedIndex, 1);
              state[index].items.forEach(function(item, index){
                item.order = index
              })
            }
          })
      })
      return [ ...state ]
  } else if(action.type === "CHANGE_TEXT"){
      let order = Number(action.payload.order);
      state.forEach(function(item, index){
          item.items.forEach(function(NestedItem, NestedIndex){
            if(item.title === action.payload.columnName){
              state[index].items[order].name = action.payload.oldName;

              let id = state[index].id;
              id = id + 1;
              state[index].id = id
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
