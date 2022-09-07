import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { gql, useMutation } from '@apollo/client';


const initialMeal = {
    foodname: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    subRows: undefined,
}


const AddUserDialog = props => {
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
        addMealHandler(meal)
        setMeal(initialMeal)
        switchState.addMultiple ? setOpen(true) : setOpen(false)
    }

    const handleChange = name => ({ target: { value } }) => {
        setMeal({ ...meal, [name]: value })
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
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Add Meal
                </DialogTitle>
                <DialogContent></DialogContent>
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
                    <Button onClick={handleAdd} color="primary">
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

