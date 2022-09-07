const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    foodname: String,
    calories: Number,
    fat: Number,
    carbs: Number,
    protein: Number,
})

module.exports = mongoose.model('Meal' , mealSchema);
