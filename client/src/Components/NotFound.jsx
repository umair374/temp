import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const style= {
    textAlign: 'center',
    marginTop: '50px'
                }
    const style2 ={
       width: '1000px',
       height: '700px' }            
  return(
    <div>
      <div style={style}>
      <img
        src={process.env.PUBLIC_URL + '/error404.jpg'}
        alt="Error"
        style={style2}
      />
      <h1>Oops! Page Not Found</h1>
      <p>The page you are looking for might be in another castle.</p>
      <p>
        <Link to="/">Go to Home</Link>
      </p>
    </div>
    </div>
  )
};

export default NotFound;
