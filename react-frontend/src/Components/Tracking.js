import React from 'react'
import BottomMenu from './BottomMenu'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import "../styles/Home.css"
import Header from './header';
import { CssBaseline } from '@material-ui/core';
import EnhancedTable from './EnhancedTable'
import makeData from '../makeData'


function Tracking() {
    const columns = React.useMemo(
        () => [
            {
                Header:'Food Name',
                accessor:'foodname',
            },
            {
                Header:'Calories',
                accessor:'calories',
            },
            {
                Header:'Fat',
                accessor:'fat',
            },
            {
                Header:'Carbs',
                accessor:'carbs',
            },
            {
                Header:'Protein',
                accessor:'protein',
            },

        ],
        []
    )

    // const [data,setData] = React.useState(React.useMemo(()=>makeData(20),[]))
    // useMemo returns a memoized memo - optimization technique by storing results of expensive function calls and returning the cache result
    const [data,setData] = React.useState([])
    const [skipPageReset, setSkipPageReset] = React.useState(false)


    const totalCalsValue = ((data.reduce((a, v) => a = a + parseInt(v.calories), 0)));
    const totalFatValue = ((data.reduce((a, v) => a = a + parseInt(v.fat), 0)));
    const totalCarbsValue = ((data.reduce((a, v) => a = a + parseInt(v.carbs), 0)));
    const totalProteinValue = ((data.reduce((a, v) => a = a + parseInt(v.protein), 0)));


    var totalMacros = {
        'totalCals': totalCalsValue,
        'totalFat': totalFatValue,
        'totalCarbs': totalCarbsValue,
        'totalProtein': totalProteinValue
    };

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
    // stop table from resetting page index when you update data
    //when cell renderer calls updateData, will use rowIndex, columnID and new value to update original data
    const updateData = (rowIndex, columnId, value)=>{
        setSkipPageReset(true)
        setData( old=>
            old.map((row,index)=>{
                if (index===rowIndex){
                    return{
                        ...old[row],
                        [columnId]:value,
                    }
                }
                return row
            })
            )
    }


    return (
        <div className="right">
                               <Header />

            <Grid container spacing={3}>
                {/*Create items with different breakpoints */}
                {/*For example,This item will be 12 units wide on extra small screens */}
                <Grid item xs={12}>
                    <h1>Tracking</h1>

                    <Paper style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", height: 100, margin: 10 }}>

                        <h4>
                            Track everything from your weight and average heart rates.
                        </h4>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", margin: 10, display: "flex", padding: "25px 50px 75px 50px" }}>
                    <div>
                        <CssBaseline/>
                        <EnhancedTable
                            columns={columns}
                            data={data}
                            setData={setData}
                            updateData={updateData}
                            skipPageReset={skipPageReset}

                        />
                    </div>
                    </Paper>
                    </Grid>
                {/*This item will be 12 units on extra small screens */}
                {/*But will be 6 units on small screens */}
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
                        <span style={{ color: 'hsl(203, 89%, 64%)' }}><h1>{remMacros.totalFat}&nbsp;(g)</h1></span>
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
                <Grid item xs={12} sm={6}>
                    <Paper style={{ height: 100, margin: 10 }}>xs=12 sm=6</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={{ height: 100, margin: 10 }}>xs=12 sm=6</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper style={{ height: 100, margin: 10 }}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper style={{ height: 100, margin: 10 }}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper style={{ height: 100, margin: 10 }}>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper style={{ height: 100, margin: 10 }}>xs=6 sm=3</Paper>
                </Grid>
            </Grid>

            <BottomMenu />




        </div>
    )
}

export default Tracking