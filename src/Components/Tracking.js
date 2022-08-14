import React from 'react'
import BottomMenu from './BottomMenu'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import "../styles/Home.css"
import Header from './header';

function Tracking() {
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
                {/*This item will be 12 units on extra small screens */}
                {/*But will be 6 units on small screens */}
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