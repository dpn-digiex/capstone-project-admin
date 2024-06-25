import { useEffect, useState } from 'react'
import Skeleton from '@components/skeleton'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import clsx from 'clsx'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './components'

const LIMIT = 10

const TableComponent = ({
  columns,
  data,
  totalItems,
  totalPages,
  activePage,
  isLoading,
  tableBodyClassName = '',
  rowEvents,
  onClick = () => {},
  setActivePage,
  onSortingChange,
  rowSelection = {},
  setRowSelection = () => {}
}) => {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  useEffect(() => {
    onSortingChange?.(sorting)

    return () => {
      onSortingChange?.([])
    }
  }, [sorting])

  return (
    <div className='box-shadow overflow-x-auto overflow-y-hidden h-full'>
      <div className='rounded-[16px] bg-white overflow-y-hidden'>
        <Table id='table-container' className='w-full'>
          <TableHeader id='table-header' className='table w-full table-fixed'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow id='table-row' className='' key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className='table-header px-0 text-xs-medium text-tertiary-600'
                      key={header.id}
                      style={{
                        width: header.getSize()
                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            className={clsx(
              'max-h-[calc(100vh-72px-56px-250px-60px)] block overflow-y-auto custom-scrollbar w-full',
              tableBodyClassName
            )}
          >
            {/* Loading - show skeleton */}
            {isLoading &&
              Array(LIMIT || 10)
                .fill('')
                .map((_, index) => {
                  return (
                    <TableRow key={index} className='h-[72px] table table-fixed w-full'>
                      <TableCell colSpan={columns.length}>
                        <Skeleton className='h-[40px] rounded-[4px]' />
                      </TableCell>
                    </TableRow>
                  )
                })}
            {/* fetch data done - show data*/}
            {!isLoading &&
              !!table.getRowModel().rows?.length &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={clsx('h-[72px] table table-fixed over cursor-pointer w-full')}
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={(e) => rowEvents?.onClick?.(row.original, e)}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        className={clsx('text-ellipsis px-0')}
                        key={cell.id}
                        style={{
                          width: cell.column.getSize()
                        }}
                        onClick={() => {
                          if (!cell.column.id.includes('checkbox') && !cell.column.id.includes('action'))
                            onClick(row.original)
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            {/* fetch data done and No result */}
            {!data.length && !isLoading && (
              <TableRow className='table w-full table-fixed'>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableCaption
            className='h-0 lg:h-[68px] relative w-[calc(100vw-50px)] lg:w-full flex justify-center'
            key={'footer'}
          >
            {/* <TablePagination
              totalPages={totalPages}
              totalItems={totalItems}
              activePage={activePage}
              onPageChange={setActivePage}
            /> */}
          </TableCaption>
        </Table>
      </div>
    </div>
  )
}

export default TableComponent
