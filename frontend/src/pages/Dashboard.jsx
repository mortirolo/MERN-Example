import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()  // Initialize navigate, dispatch
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)  // get user from state.auth
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }
    // Fetch goals from backend and put them in goals
    dispatch(getGoals())

    // Clear state when component unmounts
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])
  //}, [user, navigate, dispatch]) // Theses deps cause loading error on logout: isError, message])  // Dependencies
  //})//, [user, navigate, dispatch]) // Theses deps cause loading error on logout: isError, message])  // Dependencies

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name} </h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />
    
      <section className='content' >
        { goals.length > 0 ?
        (
          <div className='goals' >
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        ) }
      </section>
    </>
  )
}

export default Dashboard