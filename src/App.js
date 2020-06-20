import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      allCountries: [],
      filteredCountries: [],
      filter: '',
      filteredPopulation: 0,
    }
  }

  async componentDidMount() {
    const data = await fetch('https://restcountries.eu/rest/v2/all')
    const json = await data.json()
    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return { id: numericCode, name, filterName: name.toLowerCase(), flag, population }
    });
    const filteredPopulation = allCountries.reduce((acc, country) => acc + country.population, 0)
    this.setState({
      allCountries,
      filteredCountries: allCountries,
      filteredPopulation
    })
  }

  handleChangeFilter = (newText) => {
    const newTextLowerCase = newText.toLowerCase()
    const { allCountries } = this.state
    const filteredCountries = allCountries.filter(country => country.filterName.includes(newTextLowerCase) > 0)
    const filteredPopulation = filteredCountries.reduce((acc, country) => acc + country.population, 0)
    this.setState({
      filter: newText,
      filteredCountries,
      filteredPopulation
    })
  }

  render() {
    const { filteredCountries, filter, filteredPopulation } = this.state
    return (
      <div className="container">
        <h1>React Countries</h1>
        <Header filter={filter} countryCount={filteredCountries.length} populationCount={filteredPopulation} onChangeFilter={this.handleChangeFilter}/>
        <Countries countries={filteredCountries}/>
      </div>
    );
  }
}

