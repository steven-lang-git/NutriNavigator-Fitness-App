
const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newMeal = () => {
  const statusChance = Math.random()
  return {
    foodname: 'default',
    calories: Math.floor(Math.random() * 100),
    fat: Math.floor(Math.random() * 100),
    carbs: Math.floor(Math.random() * 100),
    protein: Math.floor(Math.random() * 100),
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newMeal(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
