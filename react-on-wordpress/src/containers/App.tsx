import axios from 'axios'
import React from 'react'
import { Button, Container, Row } from 'reactstrap'
import { DropResult } from 'react-beautiful-dnd'

import { ListItem } from '../type'
import { Pagination } from '../components/Pagination/Pagination'
import { Card } from '../components/Card/Card'
import { EditMode } from './EditMode/EditMode'
import { AppCol, AppRow } from '../components/OverwriteComponent/OverwirteComponent'
import { WrapContainer } from './WrapContainer/WrapContainer'

const URL = 'https://academy.apnic.net/wp-json/academy/virtual-labs'
const MAX_CARD_ON_ONE_PAGE = 6

interface Props {}

interface State {
  loadedList: ListItem[]
  editingList: ListItem[]
  pageCount: number
  currentPage: number
  editMode: boolean
}

export class App extends React.Component<Props, State> {
  static defaultProps = {}
  state = {
    loadedList: [],
    editingList: [],
    pageCount: 0,
    currentPage: 1,
    editMode: false,
  }

  /**
   * Loading the data from the api
   */
  loadData() {
    axios
      .get(URL)
      .then((res) => {
        this.setState({
          loadedList: res.data['virtualLabs'],
          pageCount: Math.ceil(res.data['virtualLabs'].length / MAX_CARD_ON_ONE_PAGE),
        })
      })
      .catch((reason: Error) => {
        console.error(reason)
      })
  }

  /**
   * Helper to reorder the list after dragging
   * @param list
   * @param startIndex
   * @param endIndex
   */
  reorder = (list: ListItem[], startIndex: number, endIndex: number): ListItem[] => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  componentDidMount() {
    this.loadData()
  }

  onPaginationClick = (i: number) => {
    let nextPage = i
    if (nextPage < 1) {
      nextPage = 1
    } else if (nextPage > this.state.pageCount) {
      nextPage = this.state.pageCount
    }

    this.setState({
      currentPage: nextPage,
    })
  }

  onEditClick = () => {
    this.setState((prevState) => ({
      editMode: !prevState.editMode,
      editingList: prevState.loadedList,
    }))
  }

  onEditSaveClick = () => {
    this.setState((prevState) => ({
      loadedList: prevState.editingList,
      editMode: false,
    }))
  }

  onEditCancelClick = () => {
    this.setState((prevState) => ({
      editingList: prevState.loadedList,
      editMode: false,
    }))
  }

  onItemDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    const reorderedList = this.reorder(this.state.editingList, result.source.index, result.destination.index)
    this.setState({
      editingList: reorderedList,
    })
  }

  renderListItem() {
    const { currentPage, loadedList } = this.state
    const offset = (currentPage - 1) * MAX_CARD_ON_ONE_PAGE
    const endIndex = offset + MAX_CARD_ON_ONE_PAGE
    return loadedList.slice(offset, endIndex).map((item: ListItem) => <Card key={item.id} item={item} />)
  }

  render() {
    const { currentPage, pageCount, editMode, editingList } = this.state
    return (
      <WrapContainer wrapPrefix="apnic-react-in-wordpress">
        <Container>
          {!editMode && (
            <>
              <Row>
                <AppCol>
                  <Pagination currentPage={currentPage} pageCount={pageCount} onPaginationClick={this.onPaginationClick} />
                  <Button color="primary" onClick={this.onEditClick}>
                    Reorder
                  </Button>
                </AppCol>
              </Row>
              <AppRow>{this.renderListItem()}</AppRow>
            </>
          )}
          {editMode && (
            <EditMode
              list={editingList}
              onDragEnd={this.onItemDragEnd}
              onEditSaveClick={this.onEditSaveClick}
              onEditCancelClick={this.onEditCancelClick}
            />
          )}
        </Container>
      </WrapContainer>
    )
  }
}

export default App
