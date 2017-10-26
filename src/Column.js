import React, { Component } from 'react';
import Row from './Row';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom'
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
          <Row columnName={that.props.title} order={item.order} key={index} title={item.name}/>
        )
      })
    return(
      connectDropTarget(
        <div data-count={this.props.count} data-id={this.props.id} className='column'>
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

    let y = monitor.getSourceClientOffset().y;
    let nextColumn = component.props.title;
    let prevColumn = monitor.getItem().prevColumn;
    let order;
    let childrens = findDOMNode(component).children[1].children;
    nextColumn === prevColumn ? order = -1 : order = 0;
    [].forEach.call(childrens, function(item, index){
      let childrenY = item.getBoundingClientRect().top;
      item.style.order = index;
      let childrenOrder = item.style.order;
      if(y > childrenY){
        item.style.order = Number(childrenOrder) - 1
        order++;
      } else{
        item.style.order = Number(childrenOrder) + 1;
      }

    })



    var RowName = monitor.getItem().name;
    var ColumnName = props.title;
    that.removeRow(RowName, ColumnName);
    that.createRow(RowName, ColumnName);

    childrens = findDOMNode(component).children[1].children;
    [].forEach.call(childrens, function(item, index){
      if(item.style.order === ''){
        item.style.order = order;
      }
    })

    nextColumn === prevColumn ? order = -1 : order = 0;

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
