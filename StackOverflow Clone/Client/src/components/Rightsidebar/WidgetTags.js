import React from 'react'

const WidgetTags = () => {
  const tags = ['C','C++','Javascript','Java','React.js','Node.js','Express.js','Python','Html','CSS' ];
  return (
    <div className='widget-tags' >
      <h3>Watched Tags</h3>
      <div className='widget-tags-div'> 
      {
         tags.map((tag)=> (
            <p key={tag}>{tag}</p>
         ))
      }
      </div>      
    </div>
  )
}

export default WidgetTags
