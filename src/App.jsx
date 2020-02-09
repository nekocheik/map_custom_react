import React, { Component } from 'react';
import './styles/style.scss';
import axios from 'axios';
import Datvis from './pluging/dataVis.jsx';

const baseUrl = 'http://13.59.220.41';
const centreOfSante = 'http://13.59.220.41/api/centre_de_santes?Arrondissement=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      centres: null,
      specialites: null,
      dataClean: null,
    };
  }

  async componentDidMount() {
    axios.get(`${centreOfSante}`)
      .then((res) => {
        const data = JSON.stringify(res.data['hydra:member']);
        this.setState({
          centres: data,
        });
        this.formatData();
      });

    axios.get('http://13.59.220.41/api/specialites')
      .then((res) => {
        this.setState({
          specialites: res.data['hydra:member'],
        });
        this.formatData();
      });

    axios.get('http://13.59.220.41/api/arrondissements')
      .then((res) => {
        this.setState({
          data: res.data['hydra:member'],
        });
      });
  }

  formatData() {
    const { specialites, centres } = this.state;
    const array = [];
    if (specialites && centres) {
      specialites.forEach((specialite) => {
        specialite.CentreDeSante.forEach((centre) => {
          const string = `"@id":"${centre}"`.replace(/(\/)/gi, '\u005c' + '/');
          const re = new RegExp(`({(${string})[^}]+})`, 'gm');
          const newCentre = JSON.parse(centres.match(re));
          newCentre.specialite = specialite.name;
          array.push(newCentre);

          // console.log(re);
        });
      });
    }
    array.forEach((element) => {
      if (element.name === 'Centre de santé Fondation Croix Saint Simon') {
        console.log(element);
      }
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="App2">
        { data ? <Datvis data={data} /> : <div /> }
      </div>
    );
  }
}

export default App;
