import React, { Component } from 'react';
import './styles/style.scss';
import axios from 'axios';
import Datvis from './pluging/dataVis.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    axios.get('http://13.59.220.41/api/arrondissements')
      .then((res) => {
        this.setState({
          data: res.data['hydra:member'],
        });
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
