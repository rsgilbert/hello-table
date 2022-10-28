import { useReactTable, ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, Column, Table } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react'


function DefaultColumnCell({ getValue, row, column, table }) {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    // if initial value is changed externally, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const onBlur = () =>
        table.options.meta?.updateData(row.index, column.id, value)


    return (
        <input
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={onBlur}
        />
    )
}
/** 
 * Give our default column cell renderer editing superpowers
 * @type {Partial<ColumnDef<Person>}
 **/
const defaultColumn = {
    cell: DefaultColumnCell
}

export function HelloEditable() {
    const columns = useMemo(
        /**
         * 
         * @returns {ColumnDef<Person>}
         */
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name'
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
            },
            {

                accessorKey: 'age',
                header: 'Age',
            },
            {
                accessorKey: 'visits',
                header: 'Visit Count'
            },
            {
                accessorKey: 'status',
                header: 'Status',
            },
            {
                accessorKey: 'progress',
                header: 'Progress',
            },
        ],
        []
    )

    const [data, setData] = useState([...defaultData])

    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        meta: {
            updateData: (rowIndex, columnId, value) => {
                console.log(rowIndex, columnId, value, data)
            }
        },
        debugTable: true
    })

    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    <label>
                                        Filter:
                                        <Filter column={header.column} />
                                    </label>
                                    {header.isPlaceholder ? null : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

/**
 * 
 * @param {{
 * column: Column<any,any> }} props 
 */
function Filter({
    column
}) {

    return (
        <div>
            <input
                type="text"
                value={column.getFilterValue() ?? ''}
                onChange={e => column.setFilterValue(e.target.value)}
                placeholder={"Filter " + column.columnDef.header}
            />
        </div>
    )
}

/**
 * @type { Person[]}
 */
const defaultData = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]