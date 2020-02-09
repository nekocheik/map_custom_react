import React, { Component }  from 'react';
import Barre from './barrePercentage'

function Arrondissements ({ arrondissements }) {
  return (
    <div class="container__graphe">
    <div class="graphes">
      <div class="background__number"><span>3</span></div>
      <span>
        <h1 class="title">Paris, {arrondissements.number}th</h1>
      </span>
      <div class="barres">
        <Barre info={arrondissements.hopitals} name={ arrondissements.hopitals > 1 ? "hopitaux" : "hopital" } />
        <Barre info={arrondissements.hopitaux} name={ arrondissements.hopitaux > 1 ? "hopitaux" : "hopital" } />
      </div>
    </div>
  </div>
  )
}

export default Arrondissements