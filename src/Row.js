import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

var that;

class Row extends Component{

  constructor(props) {
   super(props);
   this.state = {value: this.props.title};
   this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
   let oldName = event.target.value;
   this.setState({value: event.target.value});
   let rowInfo = {
     oldName,
     newName: this.state.value,
     order:this.props.order,
     columnName: this.props.columnName
   }
   this.props.changeText(rowInfo)
  }
  render(){
    that = this;
    const { connectDragSource, isDragging } = this.props;
    const opacity = isDragging ? 0.4 : 1
    return connectDragSource(
      <li style={{ opacity }} data-active={isDragging} className='column-rows__row'>
        <input onChange={this.handleChange} type='text' value={this.props.title}/>
      </li>
    )
  }
}
const rowSource = {
  beginDrag(props) {
    return {
      name:props.title,
      order: props.order,
      prevColumn: that.props.columnName
    };
  }
};

const cardTarget = {
	hover(props, monitor, component) {
    console.dir(props)
	},
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}



Row = DragSource('Row', rowSource, collect)(Row);
export default connect('',
  dispatch => ({
    changeText: (row) =>{
      dispatch({ type: 'CHANGE_TEXT', payload: row});
    }
}))(Row)
