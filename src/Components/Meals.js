//useEffect() hook loads the user data into React component user state
import React, { useState, useEffect } from 'react'
import BottomMenu from './BottomMenu'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import "../styles/Home.css"
import Header from './header';
import { List } from '@material-ui/core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from "react-hook-form";


function Meals() {
    const [items, setItems] = useState([
        { itemName: 'item1', quantity: 1, isSelected: false },
        { itemName: 'item2', quantity: 3, isSelected: false },
        { itemName: 'item3', quantity: 2, isSelected: true },
    ])


    const { register, handleSubmit, reset } = useForm();
    //useState hook allows us to track state in a function component
    const [inputValue, setInputValue] = useState('');
    const [totalItemCount, setTotalItemCount] = useState(6);
    const [rows,setRows] = useState(
        []);
    const handleAddButtonClick = () => {
        const newItem = {
            itemName: inputValue,
            quantity: 1,
            isSelected: false,
        }
        const newItems = [...items, newItem];

        setItems(newItems);
    }

    const toggleComplete = (index) => {
        const newItems = [...items];
        newItems[index].isSelected = !newItems[index].isSelected;
        setItems(newItems);
    }

    const calculateTotal = () => {
        const totalItemCount = items.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

        setTotalItemCount(totalItemCount);
    }



    const handleQuantityIncrease = (index) => {
        const newItems = [...items];

        newItems[index].quantity++;
        setItems(newItems);
        calculateTotal()
    }
    const handleQuantityDecrease = (index) => {
        const newItems = [...items];

        newItems[index].quantity--;
        setItems(newItems);
        calculateTotal()
    }


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(food_name, calories, fat, carbs, protein) {
        return { food_name, calories, fat, carbs, protein };
    }


    const totalCalsValue = ((rows.reduce((a, v) => a = a + v.calories, 0)));
    const totalFatValue = ((rows.reduce((a, v) => a = a + v.fat, 0)));
    const totalCarbsValue = ((rows.reduce((a, v) => a = a + v.carbs, 0)));
    const totalProteinValue = ((rows.reduce((a, v) => a = a + v.protein, 0)));


    var totalMacros = {
        'totalCals': totalCalsValue,
        'totalFat': totalFatValue,
        'totalCarbs': totalCarbsValue,
        'totalProtein': totalProteinValue
    }
        ;

    var recommendedMacros = {
        'totalCals': 2717,
        'totalFat': 80,
        'totalCarbs': 275,
        'totalProtein': 224,
    };

    const remMacros = {};

    for (var key in recommendedMacros) {
        if (recommendedMacros.hasOwnProperty(key)) {
            remMacros[key] = parseInt(recommendedMacros[key] - totalMacros[key]);
        }
    }


    function onSubmit(data){
   
        for (var key in data) {
            if (key !=='food_name'){
                if (data.hasOwnProperty(key)) {
                    data[key] = parseInt(data[key]);
                }
            }
        }
        const newRows = [...rows, data];
        console.log(newRows)
        setRows(newRows);
    }




    return (
        <div className="right">
            <Header />
            <Grid container spacing={3}>
                {/*Create items with different breakpoints */}
                {/*For example,This item will be 12 units wide on extra small screens */}
                <Grid item xs={12}>
                    <h1>Meals</h1>
                    <Paper style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", height: 100, margin: 10 }}>

                        <h4>
                            Record your meals with your caloric intake.
                        </h4>
          
                    </Paper>
                </Grid>
                {/*This item will be 12 units on extra small screens */}
                {/*But will be 6 units on small screens */}

                <Grid item xs={12} sm={12}>
                    <Paper style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", margin: 10, display: "flex", padding: "25px 50px 75px 50px" }}>
                        <div>
                            <h4>
                                What we've eaten so far...
                            </h4>
                        </div>
                        {/* <div>
                            <TextField id="outlined-search" label="Search field" type="search" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                            <Fab color="primary" aria-label="add">
                                <AddIcon onClick={() => handleAddButtonClick()} />
                            </Fab>
                        </div> */}
                        <div>
                            <form onSubmit = {handleSubmit(onSubmit)}>
                                <label>
                                    {/* ...register allows to register an input or select element to React Hook Form    */}
                                    <TextField id="outlined-basic" label="Name" variant="outlined" type="text" name="food_name" {...register('food_name')} />
                                </label>
                                <label>
                                    <TextField id="outlined-basic" label="Calories" variant="outlined" type="text" name="calories" {...register('calories')}/>
                                </label>
                                <label>
                                    <TextField id="outlined-basic" label="Fat" variant="outlined" type="text" name="fat" {...register('fat')}/>
                                </label>
                                <label>
                                    <TextField id="outlined-basic" label="Carbs" variant="outlined" type="text" name="carbs" {...register('carbs')}/>
                                </label>
                                <label>
                                    <TextField id="outlined-basic" label="Protein" variant="outlined" type="text" name="protein" {...register('protein')}/>
                                </label>
                                {/* <button type="submit" className="btn btn-primary mr-1">Submit</button> */}
                                <Button type="submit" className="btn btn-primary mr-1" variant="contained" endIcon={<AddIcon />}>
  Add
</Button>
                                {/* <Fab color="primary" aria-label="add">
                                    <AddIcon type="submit"/>
                                </Fab> */}
                            </form>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                                        <StyledTableCell align="right">Calories</StyledTableCell>
                                        <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                        <StyledTableCell align="right">Edit</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.food_name}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.food_name}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button type="submit" className="btn btn-primary mr-1" variant="contained" endIcon={<EditIcon />}>
  Edit
</Button></StyledTableCell>
                                        </StyledTableRow>
                                    ))}

                                    <TableRow>
                                        <StyledTableCell><b>Total Count</b></StyledTableCell>
                                        <StyledTableCell align="right"><b>{totalCalsValue}</b></StyledTableCell>
                                        <StyledTableCell align="right"><b>{totalFatValue}</b></StyledTableCell>
                                        <StyledTableCell align="right"><b>{totalCarbsValue}</b></StyledTableCell>
                                        <StyledTableCell align="right"><b>{totalProteinValue}</b></StyledTableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", margin: 10, display: "flex", padding: "25px 50px 75px 50px" }}>
                        <h3>Calories consumed:</h3>
                        <h1>{totalCalsValue}&nbsp;(g)</h1>
                        <h3>Calories remaining:</h3>
                        <span style={{ color: 'hsl(203, 89%, 64%)' }}><h1>{remMacros.totalCals}&nbsp;(g)</h1></span>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", margin: 10, display: "flex", padding: "25px 50px 75px 50px" }}>
                        <h3>Fats consumed:</h3>
                        <h1>{totalFatValue}&nbsp;(g)</h1>
                        <h3>Fats remaining:</h3>
                        <span style={{ color: 'hsl(203, 89%, 64%)' }}><h1>{remMacros.totalCals}&nbsp;(g)</h1></span>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", margin: 10, display: "flex", padding: "25px 50px 75px 50px" }}>
                        <h3>Carbs consumed:</h3>
                        <h1>{totalCarbsValue}&nbsp;(g)</h1>
                        <h3>Carbs remaining:</h3>
                        <span style={{ color: 'hsl(203, 89%, 64%)' }}><h1>{remMacros.totalCarbs}&nbsp;(g)</h1></span>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", margin: 10, display: "flex", padding: "25px 50px 75px 50px" }}>
                        <h3>Protein consumed:</h3>
                        <h1>{totalProteinValue}&nbsp;(g)</h1>
                        <h3>Protein remaining:</h3>
                        <span style={{ color: 'hsl(203, 89%, 64%)' }}><h1>{remMacros.totalProtein}&nbsp;(g)</h1></span>
                    </Paper>
                </Grid>
            </Grid>

            <BottomMenu />




        </div>
    )
}

export default Meals