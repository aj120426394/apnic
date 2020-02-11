import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { ListItem } from '../../type'
import styled from 'styled-components'

const ListItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin: 10px auto;
  box-sizing: border-box;
  background: rgb(55, 55, 55);
  color: white;
`
const DetailContainer = styled.div`
  padding: 5px 10px;
`

const CustomizedImg = styled.img`
  width: 100%;
`

type Props = {
  item: ListItem
}

export const ListItemComponent: React.FunctionComponent<Props> = ({ item }) => (
  <ListItemContainer>
    <CustomizedImg src={item.thumbnail} alt="" />
    <DetailContainer>
      <h3>
        {item.name} ({item.formattedDuration})
      </h3>
      <p>{item.description}</p>
    </DetailContainer>
  </ListItemContainer>
)

export const DraggableListItem: React.FunctionComponent<{ item: ListItem; index: number }> = ({ item, index }) => (
  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
    {(provided, snapshot) => (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <ListItemComponent item={item} />
      </div>
    )}
  </Draggable>
)
