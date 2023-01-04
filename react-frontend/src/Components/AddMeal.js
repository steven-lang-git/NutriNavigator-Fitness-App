import {useState,useEffect} from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";

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



const AddMeal = () => {
    const {
        data = {meals:[]},
        refetch:refetchMeals
    } = useQuery(GET_MEALS)

    const [addMeal] = useMutation(ADD_MEAL)


    const [foodname , setFoodName] = useState('')
    const [calories , setCalories] = useState('')
    const [fat , setFat] = useState('')
    const [carbs , setCarbs] = useState('')
    const [protein , setProtein] = useState('')

    async function addNewMeal(){
        await addMeal({variables:{foodname,calories,fat,carbs,protein }})
        refetchMeals()
    
    }


    return <div style={{margin:"30px"}}>
       <div style={{margin:"30px", display:'flex', justifyContent:'space-evenly' }}>
           <label>Foodname: </label>

           <input type={"text"} onChange={e => setFoodName(e.target.value)}/>
           <label>Calories </label>

           <input type={"number"} onChange={e => setCalories(parseInt(e.target.value))}/>
           <label>Fat</label>

           <input type={"number"} onChange={e => setFat(parseInt(e.target.value))}/>
           <label>Carbs</label>

           <input type={"number"} onChange={e => setCarbs(parseInt(e.target.value))}/>
           <label>Protein</label>

           <input type={"number"} onChange={e => setProtein(parseInt(e.target.value))}/>

            <button  onClick={addNewMeal}> Submit</button>
         
       </div>
    </div>
}

export default AddMeal