import React, { Component } from 'react';
import './App.css';
import Column from './Column';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  createColumn(){
    let columnName = prompt('Название колонки')
    this.props.createColumn(columnName)
  }
  render() {
    let columns = this.props.columnList.map(function(item, index){
      return <Column count={item.count} key={index} id={item.id} title={item.title} items={item.items}/>
    })
    return (
        <div className="app">
          <button onClick={this.createColumn.bind(this)} className="addColumns">Добавить колонку</button>
          {columns}
        </div>
    );
  }
}
App = DragDropContext(HTML5Backend)(App);
export default connect(
  state => ({
    columnList: state
  }),
  dispatch => ({
    createColumn: (column) =>{
      dispatch({ type: 'CREATE_COLUMN', payload: column});
    }
}))(App)
