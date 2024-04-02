import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login () {
  const [formData, setFromData] = useState ({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFromData((prevState) => ({  // () => ({}) means set func = to object
      ...prevState,  // All the stuff typed in the previous form fields
      [e.target.name]: e.target.value,  // Stuff typed in current form field
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
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