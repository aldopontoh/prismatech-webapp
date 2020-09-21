import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import _ from 'lodash'
import {path} from 'ramda'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

const entityName = 'TokoCart'
const entity = 'tokocart'
const collection = 'toko_cart'
const serviceEntity = 'TokoCart'

export const redirectAfterCreate = '/' + entity + '/detail'
export const redirectAfterDelete = '/' + entity
export const detailPageUrl = (id) => (`/${entity}/detail/${id}`)
export const updatePageUrl = (id) => (`/${entity}/update/${id}`)
export const createPageUrl = () => (`/${entity}/create`)
export const createNewButtonLabel = 'Create New ' + entityName
export const createPageTitle = 'Create New ' + entityName
export const listallPageTitle = 'Data Pembelian'
export const detailPageTitle = entityName + ' Detail'
export const updatePageTitle = 'Update ' + entityName
export const updateService = 'update' + serviceEntity
export const createService = 'create' + serviceEntity
export const detailService = 'getDetail' + serviceEntity
export const listallService = 'getAll' + serviceEntity + 's'
export const deleteService = 'delete' + serviceEntity
export const fields = '_id, count, amount, product_id{name, code, price}, device_id, session_id'
// export const fields = '_id,list_data{product_id{name,code,price},created_at,updated_at,created_by{full_name},updated_by{full_name}}'
// export const fields = '_id,list_data{product_id{name,code,price},count,amount},count,page_count,error,status,created_at,updated_at,created_by{full_name},updated_by{full_name}'
export const getColumns = (history) => [
  // {
  //   Header: 'Act',
  //   accessor: '_id',
  //   Cell: p => (
  //     <div className='btn-group'>
  //       <button type='button' className='btn btn-default dropdown-toggle dropdown-icon' data-toggle='dropdown'>
  //         <span className='sr-only'>Toggle Dropdown</span>
  //       </button>
  //       <div className='dropdown-menu' role='menu'>
  //         <Link className='dropdown-item' to={`${basePath}${redirectAfterCreate}/${p.cell.value}`}>Detail</Link>
  //       </div>
  //     </div>)
  // },
  { Header: 'Nama Produk', accessor: p => (<span>{p.product_id.name}</span>) },
  { Header: 'Kode Produk', accessor: p => (<span>{p.product_id.code}</span>) },
  { Header: 'Harga (Rp)', accessor: p => (<span>{p.product_id.price}</span>) },
  { Header: 'Qty', accessor: 'count' },
  { Header: 'Amount', accessor: 'amount' }
  // { Header: 'No Telepon', accessor: 'phone_number' },
  // { Header: 'Email', accessor: 'email' },
  // { Header: 'Total Pembayaran', accessor: 'total_amount' },
  // { Header: 'ID Sesi', accessor: 'session_id' },
  // { Header: 'Kode Invoice', accessor: 'invoice_code' },
//   { Header: 'category', accessor: p => (<span>{(_.map(p.category_id, v => v.title) || []).join(', ')}</span>) },
//   { Header: 'toko', accessor: p => (<span>{(_.map(p.toko_id, v => v.name) || []).join(', ')}</span>) },
// { Header: 'picture', accessor: p => (<span>{p.image_id.filename}.{p.image_id.file_type}</span>) },
//   {
//     Header: 'created_at',
//     accessor: 'created_at',
//     Cell: d => {
//       let data = Moment(d.cell.value)
//       if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
//       else data = ''
//       return (<span>{`${data}`}</span>)
//     }
//   },
  // {
  //   Header: 'Tanggal Transaksi',
  //   accessor: 'updated_at',
  //   Cell: d => {
  //     let data = Moment(d.cell.value)
  //     if (data && data.isValid()) data = data.format('YYYY-MM-DD HH:mm:ss')
  //     else data = ''
  //     return (<span>{`${data}`}</span>)
  //   }
  // },
  // { Header: 'created by', accessor: 'created_by.full_name' }
//   { Header: 'updated by', accessor: 'updated_by.full_name' }
  // { Header: 'created at', accessor: 'created_at' },
  // { Header: 'updated at', accessor: 'updated_at' }
]

export default {
  fields,
  getColumns
}
