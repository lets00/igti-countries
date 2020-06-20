import React, { Component } from 'react';
import Countries from './components/countries/Countries';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      allCountries: []
    }
  }

  async componentDidMount() {
    const data = await fetch('https://restcountries.eu/rest/v2/all')
    const json = await data.json()
    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return { id: numericCode, name, flag, population }
    });
    this.setState({
      allCountries
    })
  }

  render() {
    const { allCountries } = this.state
    return (
      <div className="container">
        <h1>React Countries</h1>
        <Countries countries={allCountries}/>
      </div>
    );
  }
}

