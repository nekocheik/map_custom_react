import React, { Component } from "react";
import Map from './mapSvg'
import Arrondissements from './Arrondissements.jsx'


export default class dataVis extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      currentArrondissements : {},
    }
    this.updateCurrentArrondissements = this.updateCurrentArrondissements.bind(this)
  }
  
  componentDidMount( ) {
    const arrondissements = this.clearArrondissements(this.props.data)
    this.setState({
      data: this.fitre(arrondissements)
    })
  }


  clearArrondissements( arrondissements ) {
    return arrondissements.map( arrondissement => {
      let model = {
        name : "",
        number: null,
        hopitals: [],
        centreDeSantes: [],
        total: null,
        className: '',
      }

      model.name = arrondissement.name
      model.number = this.setNumberArrondissement(arrondissement.name)
      model.hopitals = arrondissement.hopitals.length
      model.centreDeSantes = arrondissement.centreDeSantes.length
      model.total = arrondissement.centreDeSantes.length + arrondissement.hopitals.length
      model.className = this.formatClassName(arrondissement.name)


      return model
    });
  }

  setNumberArrondissement ( name ) {
    return name.match(/(\d+)/gm)[0]
  }

  formatClassName ( name ) {
    return name.replace(/(eme\s)|(er\s)/gm , '_')
  }

  

  
  updateCurrentArrondissements (arrondissements) {
    console.log(this.state.currentArrondissements)
    this.setState({currentArrondissements: arrondissements})
  }
  
  sortArrayByArrondissements (data) {
    return data.sort((a, b) => parseFloat(a.total) - parseFloat(b.total)).reverse();
  };
  
  fitre ( json  =  this.props.data) {
    const array = [[], [], []];
    json = this.sortArrayByArrondissements(json);
    for (let i = 0; i < array.length; i++) {
      for (let j = Math.floor(20/3) * i; j < Math.floor((20/3) * (i + 1)); j++) {
        array[i].push(json[j]);
      }
    }
    return array
  };
  
  
  render () { return this.state.data ? 
    <div className="view"> 
    <Map 
    updateCurrentArrondissements={ arrondissements => this.updateCurrentArrondissements(arrondissements) }
    arrondissementsGroup={this.state.data} 
    />

    { this.state.currentArrondissements.name ? <Arrondissements arrondissements={this.state.currentArrondissements}/>  : ''}
    </div> 
    : '' 
  }
}
