import React, { Component }  from 'react';
import './styles/style.scss';
import Datvis from './pluging/dataVis.jsx'
import axios from "axios";


class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }
  componentDidMount( ) {
    axios.get('http://13.59.220.41/api/arrondissements')
    .then(res => {
      this.setState({
        data: res.data["hydra:member"]
      });
    })
  }


  render () {
    return (
      <div className="App2">
        { this.state.data ? <Datvis data={this.state.data} ></Datvis> : <div></div> }
      </div>
    );
  }

}

export default App;
