import * as React from 'react'
import { Pagination as BPagination, PaginationItem, PaginationLink } from 'reactstrap'
import styled from 'styled-components'

interface Props {
  pageCount: number
  currentPage: number
  onPaginationClick: (i: number) => void
}

const CustomizedPagination = styled(BPagination)`
  > ul {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`

export class Pagination extends React.Component<Props> {
  static defaultProps = {}

  renderPageItem() {
    const { pageCount, currentPage, onPaginationClick } = this.props
    const temp = Array.from({ length: pageCount }, (v, i) => i + 1)
    return temp.map((i) => (
      <PaginationItem key={`pi-${i}`} active={currentPage === i} onClick={() => onPaginationClick(i)}>
        <PaginationLink>{i}</PaginationLink>
      </PaginationItem>
    ))
  }

  render() {
    const { currentPage, onPaginationClick } = this.props
    return (
      <CustomizedPagination>
        <PaginationItem onClick={() => onPaginationClick(currentPage - 1)}>
          <PaginationLink previous />
        </PaginationItem>
        {this.renderPageItem()}
        <PaginationItem onClick={() => onPaginationClick(currentPage + 1)}>
          <PaginationLink next />
        </PaginationItem>
      </CustomizedPagination>
    )
  }
}
