import React from 'react'

export default (props) => {
  return (<>
    <div className='foodCaption'>
      <h5>{props.ele.title}</h5>
    </div>
   
      <img className='foodImg'
        src={props.ele.image_url}
        alt='recipe'/>
  </>)
}