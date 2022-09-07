const graphql = require('graphql');

const {GraphQLObjectType , GraphQLSchema ,GraphQLString ,GraphQLID, GraphQLInt ,GraphQLList , GraphQLNonNull} =graphql;

const Meal  = require('../models/Meal')


const MealType = new GraphQLObjectType({
    name: 'Meal',
    fields: () =>({
        id: { type: GraphQLID},
        foodname: {type: GraphQLString},
        calories: {type: GraphQLInt},
        fat: {type: GraphQLInt},
        carbs: {type: GraphQLInt},
        protein: {type: GraphQLInt},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        meal:{
            type: MealType,
            args:{id:{type: GraphQLID}},
            resolve (parent ,args){
                return Meal.findById(args.id)
            }
        },
        meals:{
            type: new GraphQLList(MealType),
            args:{id:{type: GraphQLID}},
            resolve (parent ,args){
                return Meal.find()
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addMeal: {
            type: BookType,
            args: {
                foodname: {type : new GraphQLNonNull(GraphQLString)},
                calories: {type: GraphQLInt},
                fat: {type: GraphQLInt},
                carbs: {type: GraphQLInt},
                protein: {type: GraphQLInt},
            },
            resolve(parent , args){
                const meal = new Meal({foodname: args.foodname , calories: args.calories , fat: args.fat, carbs: args.carbs , protein: args.protein})
                return meal.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})