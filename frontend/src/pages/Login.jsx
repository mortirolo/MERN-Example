import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login () {
  const [formData, setFromData] = useState ({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) { toast.error(message) }
    if (isSuccess || user) { navigate('/') }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])  // watch for these states/events

  const onChange = (e) => {
    setFromData((prevState) => ({  // () => ({}) means set func = to object
      ...prevState,  // All the stuff typed in the previous form fields
      [e.target.name]: e.target.value,  // Stuff typed in current form field
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = { email, password, }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login 
        </h1>
      </section> 
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>Login</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login 