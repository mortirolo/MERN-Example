import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem ({goal}) {
  const dispatch = useDispatch()

  return (
    <div className="goal goal-color" >
      <div className="goal-color">
        {new Date(goal.createdAt).toLocaleString('en-US')}
      </div>
      <h2 className='goal-color' >{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close' >X</button>
    </div>
  )
}

export default GoalItem