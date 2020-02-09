import * as React from 'react'
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd'
import { Button, Row } from 'reactstrap'

import { ListItem } from '../../type'
import { DraggableListItem } from '../../components/DraggableListItem/DraggableListItem'
import {AppCol} from '../../components/OverwriteComponent/OverwirteComponent'

interface Props {
  list: ListItem[]
  onDragEnd: OnDragEndResponder
  onEditSaveClick: VoidFunction
  onEditCancelClick: VoidFunction
}

export class EditMode extends React.Component<Props> {
  static defaultProps = {}

  getListStyle(isDraggingOver: boolean) {
    return {
      background: isDraggingOver ? 'lightgrey' : 'white',
      padding: 10,
    }
  }

  renderListItem() {
    const { list } = this.props
    return list.map((item, index) => <DraggableListItem key={`draggable-${item.id}`} item={item} index={index} />)
  }

  render() {
    const {onDragEnd, onEditCancelClick, onEditSaveClick} = this.props
    return (
      <>
        <Row>
          <AppCol>
            <Button color="success" onClick={onEditSaveClick}>Save</Button>
            <Button color="danger" onClick={onEditCancelClick}>Cancel</Button>
          </AppCol>
        </Row>
        <Row>
          <AppCol>          <p>Drag to reorder the list</p>
          </AppCol>
        </Row>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver)}>
                {this.renderListItem()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    )
  }
}
