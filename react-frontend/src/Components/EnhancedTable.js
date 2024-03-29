import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import MaUTable from "@material-ui/core/Table";
import PropTypes from "prop-types";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableToolbar from "./TableToolbar";
import {
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable
} from "react-table";
import Button from '@mui/material/Button';
import { gql, useMutation, useQuery } from "@apollo/client";
import { lighten, makeStyles } from '@material-ui/core/styles';
import { lineHeight } from "@mui/system";


const GET_MEALS = gql`
{
    meals{
        foodname
        calories
        fat
        carbs
        protein
    }
}
`;

const REMOVE_MEAL = gql`
mutation deleteMeal ($id: ID){
    deleteMeal(id:$id){
        id
    }
}
`;

const useEnhancedTableHeadStyles = makeStyles(theme => ({
    root: {
        '& .MuiTypography-root': {
            color: 'white',
            fontFamily: "Roboto",

        },
        '& .MuiTypography-h6':
        {
            fontSize: 24,
            lineHeight: 1.5,
            fontWeight: 600,
            textTransform: 'capitalize',
        },
        '& .MuiTableCell-head':
        {
            fontSize: 24,
            lineHeight: 1.5,
            fontWeight: 600,
            color: 'white',

        },
        '& .MuiSvgIcon-root':
        {
            color: 'white'
        }
        ,
        '& .MuiTableCell-root':
        {
            borderBottom: 0,
        },
        '& .MuiTableCell-body': {
            color: '#e1ffa0',

        },


    },

    active: {},
}))


//Handle the checkboxes on the table
const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        //useRef - returns mutable ref object whose .current property is inititalized to the passed argument (initialValue).
        //useRef is a "box" that can hold a mutable value in its .current property
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <Checkbox ref={resolvedRef} {...rest} style={{ color: 'white' }} />
            </>
        )
    }
);


//creating the editable cell containers
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateData, //function supplied to table instance
    editableRowIndex, //index of row requesting to edit
    calTotal: initial,
}) => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = (e) => {
        setValue(e.target.value);
    }


    //update external data when input is blurred
    const onBlur = () => {
        updateData(index, id, value);
    }

    //if initial value is changed, sync with state
    React.useEffect(() => {
        setValue(initialValue);

    }, [initialValue]);

    // ? is javascript conditional operator for if it is not true then execute that line
    return index === editableRowIndex ? (
        <input value={value} onChange={onChange} onBlur={onBlur} />
    ) : (
        <p>{value}</p>
    );
};


//type checking with proptypes
//make sure data receive is valid
EditableCell.propTypes = {
    cell: PropTypes.shape({
        value: PropTypes.any.isRequired
    }),
    row: PropTypes.shape({
        index: PropTypes.number.isRequired
    }),
    column: PropTypes.shape({
        id: PropTypes.string.isRequired
    }),
    updateData: PropTypes.func.isRequired

};

const defaultColumn = {
    Cell: EditableCell
};

const EnhancedTable = ({
    columns,
    data,
    setData,
    updateData,
    skipPageReset
}) => {

    //code gets a single value of state for each call, React handles the storage separately and returns current value via useState on each execution of code
    //update to the current status, using the set state
    const [editableRowIndex, setEditableRowIndex] = React.useState(null);
    const [deleteMeal, { loading: deleting, error: deleteError }] = useMutation(REMOVE_MEAL)
    const {
        refetch: refetchMeals
    } = useQuery(GET_MEALS)
    const {
        getTableProps,
        headerGroups,
        prepareRow,
        page,
        gotoPage,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: {
            pageIndex, pageSize, selectedRowIds, globalFilter }

    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            autoResetPage: !skipPageReset,
            updateData,
            editableRowIndex,
            setEditableRowIndex // set state hook for toggling edit on/off

        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.allColumns.push((columns) => [
                {
                    id: "selection",
      
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
     
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} style={{ color: 'white' }} />
                        </div>
                    )
                },
                ...columns,
                // pass edit hook
                {
                    accessor: "Edit",
                    id: "Edit",
                    Header: "",
                    Cell: ({ row, setEditableRowIndex, editableRowIndex }) => (
                        <Button
                            style={{
                                display: 'flex',
                                position: 'relative',
                                alignItems: 'left',
                                color: '#e1ffa0',
                                textDecoration: 'none',
                                fontSize: 18,
                                lineHeight: 1.5,
                            }}
                            className="action-button"
                            onClick={() => {
                                const currentIndex = row.index;
                                if (editableRowIndex !== currentIndex) {
                                    // row requested for edit access
                                    setEditableRowIndex(currentIndex);
                                } else {
                                    // request for saving the updated row
                                    setEditableRowIndex(null);
                                    const updatedRow = row.values;
                                    // call your updateRow API
                                }
                            }}
                        >
                            {/* single action button supporting 2 modes */}
                            {editableRowIndex !== row.index ? "Edit" : "Save"}
                        </Button>

                    )
                }
            ]);
        }
    );

    const handleChangePage = (event, newPage) => {
        gotoPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(Number(event.target.value));
    };

    const removeByIndexs = (array, indexs) =>
        array.filter((_, i) => !indexs.includes(i));

    const deleteMealHandler = (event) => {

        const newData = removeByIndexs(
            data,
            Object.keys(selectedRowIds).map((x) => parseInt(x, 10))
        );
        Object.keys(selectedRowIds).map((item) =>
            deleteMeal({
                variables: { id: data[item].id },
            }));
        setData(newData);
        refetchMeals();
    };

    const addMealHandler = (user) => {
        const newData = data.concat([user]);
        setData(newData);
    };

    const cls = useEnhancedTableHeadStyles();


    // Render the UI for your table
    return (
        <TableContainer classes={{ root: cls.root }}>
            <TableToolbar
                numSelected={Object.keys(selectedRowIds).length}
                deleteMealHandler={deleteMealHandler}
                addMealHandler={addMealHandler}
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
            />
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableCell
                                    {...(column.id === "selection"
                                        ? column.getHeaderProps()
                                        : column.getHeaderProps(column.getSortByToggleProps()))}

                                >
                                    {column.render("Header")}
                                    {column.id !== "selection" ? (
                                        <TableSortLabel
                                            active={column.isSorted}
                                            // react-table has a unsorted state which is not treated here
                                            direction={column.isSortedDesc ? "desc" : "asc"}
                                        />
                                    ) : null}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()} >
                                {row.cells.map((cell) => {
                                    return (
                                        <TableCell {...cell.getCellProps()} classes={{ root: cls.root }}>
                                            {cell.render("Cell")}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>

                <TableFooter >
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: "All", value: data.length }
                            ]}
                            colSpan={3}
                            count={data.length}
                            rowsPerPage={pageSize}
                            page={pageIndex}
                            SelectProps={{
                                inputProps: { "aria-label": "rows per page" },
                                native: true
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            style={{ color: 'white' }}
                        />
                    </TableRow>
                </TableFooter>
            </MaUTable>
        </TableContainer>
    );
};


EnhancedTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    updateData: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    skipPageReset: PropTypes.bool.isRequired
};

export default EnhancedTable;