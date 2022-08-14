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

function Meals() {
    const [items, setItems] = useState([
        { itemName: 'item1', quantity: 1, isSelected: false },
        { itemName: 'item2', quantity: 3, isSelected: false },
        { itemName: 'item3', quantity: 2, isSelected: true },
    ])

    // const [calories,]



    //useState hook allows us to track state in a function component
    const [inputValue, setInputValue] = useState('');
    const [totalItemCount, setTotalItemCount] = useState(6);
    const [totalCalCount, setCalCount] = useState();
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

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


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
    // const total = rows.reduce((acc,current)=>
    // {
    //     const{
    //         name,
    //         calories,
    //         fat,
    //         carbs,
    //         protein
    //     } = current;
    //     const currentMeal = acc[name]??{
    //         calorieTotal: 0,
    //         fatTotal: 0,
    //         carbsTotal:0,
    //         proteinTotal:0
    //     };
    //     acc[name] = {
    //         calorieTotal : currentMeal.calorieTotal+calories,
    //         fatTotal : currentMeal.fatTotal+fat,
    //         carbsTotal:currentMeal.carbsTotal+carbs,
    //         proteinTotal:currentMeal.proteinTotal+protein,
    //     };
    //     return acc;
    // }, {});

    // console.log(total);

    // const defaultGroup = datas.map((i)=>({
    //     Calories: 0,
    //     Fat:0,
    //     Carbs:0,
    //     Protein:0
    // }));

    // const [group,setGroup] = useState(defaultGroup);
    // const onChange = (type,value,index) =>{
    //     // g & idx are arbitrary values
    //     const newGroup = group.map((g,idex )=>{
    //         if (index==idx)
    //             return{
    //                 ...g,
    //                 [type]:parseInt(value||0)
    //             };
    //             return g;

    //     });
    //     setGroup(newGroup);
    // };

    // const total = group.reduce((acc,cur)=>{
    //     acc+= cur.Calories + cur.Fat + cur.Carbs + c
    // })






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
                            <form>
                                <label>

                                    <TextField id="outlined-basic" label="Name" variant="outlined" type="text" name="food_name" />
                                </label>
                                <label>

                                    <TextField id="outlined-basic" label="Calories" variant="outlined" type="text" name="calories" />
                                </label>
                                <label>

                                    <TextField id="outlined-basic" label="Fat" variant="outlined" type="text" name="fat" />
                                </label>
                                <label>

                                    <TextField id="outlined-basic" label="Carbs" variant="outlined" type="text" name="carbs" />
                                </label>
                                <label>

                                    <TextField id="outlined-basic" label="Protein" variant="outlined" type="text" name="protein" />
                                </label>
                                <Fab color="primary" aria-label="add">
                                    <AddIcon onClick={() => handleAddButtonClick()} />
                                </Fab>
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
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