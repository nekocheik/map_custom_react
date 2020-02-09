import React, { Component }  from 'react';


const barre = function ({info, name}) {
  return ( 
    <div class="container__barre">
      <div class="barre"></div>
      <p>{name}</p>
    </div>
  )
}

export default barre