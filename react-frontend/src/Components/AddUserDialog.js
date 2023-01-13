import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import {gql, useMutation, useQuery} from "@apollo/client"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
// DEFINE MUTATION
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
const ADD_MEAL = gql`
    mutation AddMeal($foodname: String! , $calories:Int!, $fat:Int!, $carbs:Int!, $protein:Int!) {
  
        addMeal(foodname: $foodname , calories: $calories, fat: $fat , carbs: $carbs,protein: $protein) {
            id
            foodname
            calories
            fat
            carbs
            protein
            
        }
    }
`
const initialMeal = {
    foodname: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    subRows: undefined,
}


const AddUserDialog = props => {
    const {
        data = {meals:[]},
        refetch:refetchMeals
    } = useQuery(GET_MEALS)

    const [foodname , setFoodName] = useState('')
    const [calories , setCalories] = useState('')
    const [fat , setFat] = useState('')
    const [carbs , setCarbs] = useState('')
    const [protein , setProtein] = useState('')
    const [addMeal] = useMutation(ADD_MEAL)
    const [meal, setMeal] = useState(initialMeal)
    const { addMealHandler } = props
    const [open, setOpen] = React.useState(false)

    const [switchState, setSwitchState] = React.useState({
        addMultiple: false,
    })

    const handleSwitchChange = name => event => {
        setSwitchState({
            ...switchState, [name]: event.target.checked
        })

    }
    const resetSwitch = () => {
        setSwitchState({
            addMultiple: false
        })
    }


    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        resetSwitch()
    }

    const handleAdd = event => {
   
        addMeal({variables:{foodname,calories,fat,carbs,protein }})
        switchState.addMultiple ? setOpen(true) : setOpen(false)
    }
    async function addNewMeal(){
        addMealHandler(meal)
        setMeal(initialMeal)
        await addMeal({variables:{foodname,calories,fat,carbs,protein }})
        refetchMeals()
        switchState.addMultiple ? setOpen(true) : setOpen(false)
    
    }
    //... spread syntax allows an iterable, such as an array or string to be expanded in places where zero or more arguments (for function calls) or elements are expected
    //used to add key-value pairs to the object being created
    const handleChange = name => ({ target: { value } }) => {
        setMeal({ ...meal, [name]: value })
        switch (name){
            case 'foodname':
                setFoodName(value)
                break
            case 'calories':
                setCalories(parseInt(value))
                break
            case 'fat':
                setFat(parseInt(value))
                break
            case 'carbs':
                setCarbs(parseInt(value))
                break
            case 'protein':
                setProtein(parseInt(value))
                break
        }
        //if name = foodname do setfoodname else

    }
    return (
        <div>
            <Tooltip title="Add">
                <IconButton aria-label="add" onClick={handleClickOpen}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Dialog   
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="form-dialog-title">
                    Add Meal
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Add a meal to today's meals
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Food Name"
                    type="text"
                    fullWidth
                    value={meal.foodname}
                    onChange={handleChange('foodname')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Calories"
                    type="text"
                    fullWidth
                    value={meal.calories}
                    onChange={handleChange('calories')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Fat"
                    type="text"
                    fullWidth
                    value={meal.fat}
                    onChange={handleChange('fat')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Carbs"
                    type="text"
                    fullWidth
                    value={meal.carbs}
                    onChange={handleChange('carbs')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Protein"
                    type="text"
                    fullWidth
                    value={meal.protein}
                    onChange={handleChange('protein')}
                />
                </DialogContent>
                <DialogActions>
                    <Tooltip title="Add Multiple">
                        <Switch
                            checked={switchState.addMultiple}
                            onChange={handleSwitchChange('addMultiple')}
                            value="addMuiltiple"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </Tooltip>

                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={addNewMeal} color="primary">
                        Add
                    </Button>

                </DialogActions>

            </Dialog>

        </div>
    )
}

AddUserDialog.propTypes = {
    addMealHandler: PropTypes.func.isRequired,
}

export default AddUserDialog

