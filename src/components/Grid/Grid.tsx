import React, { Component, Fragment } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Boundary } from '../ErrorBoundary'
import { Wrapper, SmallWrapper } from './Components'
import {
    ColDef,
    AgGridEvent,
    GridApi,
    ColumnApi,
    RowDoubleClickedEvent,
    RowNode,
} from 'ag-grid-community'
import { TextField } from '@material-ui/core'

export { RowNode, RowDoubleClickedEvent, GridApi }
export interface ColumnType {
    headerName: string
    field: string
}
export interface ColumnDefinition extends ColDef {}

export interface GridProps<T> {
    columnDefs: ColDef[]
    rowData: T[]
    onRowClicked?: (node: RowDoubleClickedEvent) => void
    loading: boolean
    showQuickFilter?: boolean
    small?: boolean
    returnApi?: Function
}
export interface GridState {
    quickFilter?: string
}

export class Grid<T> extends Component<GridProps<T>, GridState> {
    public defaultColDef: Partial<ColDef>
    public api: GridApi
    public columnApi: ColumnApi
    constructor(props: GridProps<T>) {
        super(props)
        this.defaultColDef = {
            // set every column width
            minWidth: 100,
            // make every column non-editable
            editable: false,
            // make every column use 'text' filter by default
            filter: 'agTextColumnFilter',
            cellStyle: { textAlign: 'left' },
            sortable: true,
            suppressMenu: true,
            resizable: true,
        }
        this.api = new GridApi()
        this.columnApi = new ColumnApi()
        this.state = {
            quickFilter: undefined,
        }
    }

    public onGridReady = (params: AgGridEvent) => {
        this.api = params.api
        this.columnApi = params.columnApi
        this.api.sizeColumnsToFit()
        window.onresize = () => {
            setTimeout(() => {
                this.api!.sizeColumnsToFit()
            })
        }
        if (this.props.returnApi) {
            this.props.returnApi(this.api)
        }
    }

    public handleChange = (e: any) =>
        this.setState({ quickFilter: e.target.value })

    public render() {
        const {
            columnDefs,
            rowData,
            onRowClicked,
            loading,
            showQuickFilter,
            small,
        } = this.props
        const { quickFilter } = this.state
        const WrapperComponent = small ? SmallWrapper : Wrapper
        return (
            <Boundary>
                <WrapperComponent className="ag-theme-material">
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionAppear={true}
                        transitionAppearTimeout={200}
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}
                    >
                        {!loading && (
                            <Fragment>
                                {showQuickFilter && (
                                    <TextField
                                        placeholder={'Search'}
                                        onChange={this.handleChange}
                                    />
                                )}
                                <AgGridReact
                                    columnDefs={columnDefs}
                                    rowData={rowData}
                                    defaultColDef={this.defaultColDef}
                                    onGridReady={this.onGridReady}
                                    animateRows={true}
                                    suppressCellSelection={true}
                                    rowSelection={'single'}
                                    onRowClicked={onRowClicked}
                                    reactNext={true}
                                    quickFilterText={quickFilter}
                                    // floatingFilter
                                />
                            </Fragment>
                        )}
                    </ReactCSSTransitionGroup>
                </WrapperComponent>
            </Boundary>
        )
    }
}
