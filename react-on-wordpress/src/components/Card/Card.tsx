import * as React from 'react';
import { Card as BCard, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

import { ListItem } from '../../type'

interface Props {
  item: ListItem
}

export const Card: React.FunctionComponent<Props> = ({item}) => (
  <BCard>
    <CardImg top width="100%" src={item.thumbnail} alt="Card image cap" />
    <CardBody>
      <CardTitle>{item.name}</CardTitle>
      <CardText>{item.description}</CardText>
      <a href={item.viewDetailsURL} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
        View details
      </a>
    </CardBody>
  </BCard>
)
