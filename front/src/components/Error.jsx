import React from 'react'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <div className='error'>

            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Link to='/' className='link-error'>Go Back to homepage</Link>
    </div>
  )
}

export default Error
