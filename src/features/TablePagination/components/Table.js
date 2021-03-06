import React, { Component, memo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { path } from 'ramda'
import { connect } from 'react-redux'
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { injectIntl } from 'react-intl'
import TablepaginationActions from '../redux'
import Immutable from 'seamless-immutable'
import config from '../config'
import { fetchData } from '../functions'

const Styles = styled.div`
  padding: 1rem;
  .pagination {
    padding: 0.5rem;
  }
`

function Table ({ columns, data, fetchData, loading, pageCount: controlledPageCount, count, filter }) {
  console.log('dataaa=====>', data)
  console.log('filter=====>', filter)
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    rows,
    state: { pageIndex, pageSize }
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: config.defaultPageIndex, pageSize: config.defaultPageSize },
    manualPagination: true,
    pageCount: controlledPageCount
  },
  usePagination
  )

  // fetchData({ pageIndex, pageSize })

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    // console.log('react effect========pageIndex=', pageIndex)
    // console.log('react effect========pageSize=', pageSize)
    fetchData({ pageIndex, pageSize, filter })
  }, [fetchData, pageIndex, pageSize])

  // Render the UI for your table
  return (
    <>
      <div className='table-responsive'>
        <table className='table table-sm' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, j) => (
                  <th key={j} {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, j) => {
                    return <td key={j} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
            <tr>
              {/* {loading && (<td colSpan={columns.length}>Loading...</td>)}
              {!loading && (<td colSpan={columns.length}>Showing {page.length} of ~ {count} results</td>)} */}
              {/* {!loading && <td colSpan={columns.length}>Showing {page.length} of ~ {count} results  Showing {page.length} of ~{controlledPageCount * pageSize}{' '} results  </td>} */}
            </tr>
          </tbody>
        </table>
      </div>

      <div className='dataTables_paginate paging_simple_numbers' id='example1_paginate'>
        <ul className='pagination'>
          <li className={`paginate_button page-item previous ${!canPreviousPage ? 'disabled' : ''}`} id='example1_previous'>
            <a href='javascript:;' aria-controls='example1' data-dt-idx={0} tabIndex={0} className='page-link' onClick={() => gotoPage(0)}>{'<<'}</a>
          </li>
          <li className={`paginate_button page-item ${!canPreviousPage ? 'disabled' : ''}`}><a href='javascript:;' aria-controls='example1' data-dt-idx={3} tabIndex={0} className='page-link' onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</a></li>
          <li className={`paginate_button page-item ${!canNextPage ? 'disabled' : ''}`}><a href='javascript:;' aria-controls='example1' data-dt-idx={4} tabIndex={0} className='page-link' onClick={() => nextPage()}>{'>'}</a></li>
          <li className={`paginate_button page-item next ${!canNextPage ? 'disabled' : ''}`} id='example1_next'>
            <a href='javascript:;' aria-controls='example1' data-dt-idx={7} tabIndex={0} className='page-link' onClick={() => gotoPage(pageCount - 1)}>{'>>'}</a>
          </li>
          <li>
            <div>Halaman {' '} <strong>{pageIndex + 1} dari {pageOptions.length}</strong></div>
          </li>
          {/* <li className=''>
            <div>
              | Go to page:{' '}
              <input
                type='number'
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
              />
            </div>
          </li> */}
          <li className=''>
            <div>
              <select
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
              Tampilkan {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

// const _gotoCreateForm = useCallback(() => {
//   console.log('tessss')
// }, [])

function App (props) {
  const {
    columns,
    paginationConfig,
    createHref,
    tablepaginationFetchData,
    createNewButtonLabel,
    whereCondition,
    cardHeader,
    tableMenus,
    cardTitle,
    cardFooter,
    distinct
  } = props
  const history = useHistory()
  const loading = path(['loading', paginationConfig.serviceName], props)
  const data = path(['data', paginationConfig.serviceName], props) || []
  const count = path(['count', paginationConfig.serviceName], props) || []
  const pageCount = path(['pageCount', paginationConfig.serviceName], props) || []

  console.log('App begeeeeeeiinnn')
  const filter = path(['filter', paginationConfig.serviceName], props) || {}

  const doFetchData = React.useCallback(({ pageSize, pageIndex, filter }) => {
    console.log('doFetchData filter===>', filter)

    fetchData({
      fields: paginationConfig.fields,
      filter,
      loading,
      pageSize,
      pageIndex,
      serviceName: paginationConfig.serviceName,
      tablepaginationFetchData,
      history,
      whereCondition,
      distinct
    })
  }, [])

  console.log('renderrrrrrrr')
  return (
    <>
      <div className='card'>
        <div className='card-header'>
          {cardTitle && <h3 className='card-title'>{cardTitle}</h3>}
          {cardHeader && cardHeader()}
          <div className='card-tools'>
            <button type='button' className='btn btn-tool myCardWidget' data-card-widget='collapse'><i className='fas fa-minus' /></button>
            {/* <button type='button' className='btn btn-tool' data-card-widget='remove'><i className='fas fa-times' /></button> */}
          </div>
        </div>
        <div className='card-body'>
          {}
          {(!tableMenus && createHref) && (<button type='button' className='btn btn-info' onClick={() => history.push(createHref)}><i className='fas fa-plus' /> {`${createNewButtonLabel || 'Create New'}`}</button>)}
          <Styles>
            <Table
              columns={columns}
              data={Immutable.asMutable(data, { deep: true })}
              fetchData={doFetchData}
              loading={loading}
              pageCount={pageCount}
              count={count}
              filter={filter}
            />
          </Styles>
        </div>
        <div className='card-footer'>
          {cardFooter && cardFooter()}
        </div>
      </div>
    </>
  )
}

// class Index extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       pageCount: 0
//     }
//     this.doFetchData = this.doFetchData.bind(this)
//   }

//   doFetchData ({ pageSize, pageIndex }) {
//     const { paginationConfig, tablepaginationFetchData } = this.props
//     const filter = path(['filter', paginationConfig.serviceName], this.props) || {}
//     const loading = path(['loading', paginationConfig.serviceName], this.props)
//     fetchData({
//       fields: paginationConfig.fields,
//       filter,
//       loading,
//       pageSize,
//       pageIndex,
//       serviceName: paginationConfig.serviceName,
//       tablepaginationFetchData
//     })
//   }

//   render () {
//     const {
//       columns,
//       paginationConfig,
//       history
//     } = this.props
//     const loading = path(['loading', paginationConfig.serviceName], this.props)
//     const data = path(['data', paginationConfig.serviceName], this.props) || []
//     const count = path(['count', paginationConfig.serviceName], this.props) || []
//     const pageCount = path(['pageCount', paginationConfig.serviceName], this.props) || []
//     return (
//       <div className='card'>
//         <div className='card-header'>
//           <button type='button' className='btn btn-info' onClick={() => history.push('/home')}><i className='fas fa-plus' /> Create New</button>
//         </div>
//         <div className='card-body'>
//           <Styles>
//             <Table
//               columns={columns}
//               data={Immutable.asMutable(data, { deep: true })}
//               fetchData={this.doFetchData}
//               loading={loading}
//               pageCount={pageCount}
//               count={count}
//             />
//           </Styles>
//         </div>
//       </div>
//     )
//   }
// }

const mapStateToProps = (state, ownProps) => {
  return {
    count: state.tablepagination.count,
    data: state.tablepagination.data,
    filter: state.tablepagination.filter,
    loading: state.tablepagination.loading,
    pageCount: state.tablepagination.pageCount,
    pageSize: state.tablepagination.pageSize,
    pageIndex: state.tablepagination.pageIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tablepaginationFetchData: data => dispatch(TablepaginationActions.tablepaginationFetchData(data))
    //   resetForm: data => dispatch(LoginActions.loginReset(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(App))
