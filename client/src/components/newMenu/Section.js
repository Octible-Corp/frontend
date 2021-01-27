import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from 'reactstrap';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, content) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  //padding: grid * 2,
  paddingLeft: 100,
  paddingRight: 100,
  paddingTop: 10,
  paddingBottom: 10,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: content ? (isDragging ? 'lightgreen' : '#fff') : 'transparent',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
});

class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.courses
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.courses.length > 0) {
      console.log('______LENGTH____');
      console.log(props.courses.length);
      if (props.filter) {
        console.log('_ENDERING VOID_');
        let newItems = props.courses.map((item) =>
          item.section === props.filter ? item : null
        );

        if (newItems[0] !== null) {
          this.setState({
            items: newItems
          });
        } else {
          this.setState({
            items: [
              {
                id: `null_placeholder`,
                content: null
              }
            ]
          });
        }
      } else {
        this.setState({
          items: props.courses
        });
      }
    } else {
      this.setState({
        items: [
          {
            id: 'null_placeholder',
            content: null
          }
        ]
      });
    }
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        item.content
                      )}
                    >
                      {' '}
                      {item.content ? item.content : null}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Section;
