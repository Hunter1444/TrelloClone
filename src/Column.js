import React, { Component } from 'react';
import Row from './Row';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

var that;

class Column extends Component{

  createRow(rowName = '', columnName = this.refs.column.textContent){
    let column = {
      columnName,
      rowName
    }
    this.props.createRow(column)
  }

  removeRow(rowName, columnName){
    let column = {
      columnName,
      rowName
    }
    this.props.removeRow(column)
  }

  render(){
      that = this;
      const { connectDropTarget } = this.props;
      let rowItems = this.props.items.map(function(item, index){
        return(
          <Row key={index} title={item}/>
        )
      })
    return(
      connectDropTarget(
        <div data-id={this.props.count} className='column'>
          <span ref='column' className='column__name'>{this.props.title}</span>
          <ul className='column-rows'>
            {rowItems}
          </ul>
          <b onClick={this.createRow.bind(this)} className='column__add'>Добавить карточку</b>
        </div>
      )
    )
  }
}

const columnTarget = {
  drop(props, monitor, component) {
    var RowName = monitor.getItem().name;
    var ColumnName = props.title;
    that.removeRow(RowName, ColumnName);
    that.createRow(RowName, ColumnName);
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

Column = DropTarget('Row', columnTarget, collect)(Column);
export default connect('',
  dispatch => ({
    createRow: (row) =>{
      dispatch({ type: 'CREATE_ROW', payload: row});
    },
    removeRow: (row) =>{
      dispatch({ type: 'REMOVE_ROW', payload: row});
    }
}))(Column)
