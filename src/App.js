import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      allCountries: [],
      filteredCountries: [],
      filter: ''
    }
  }

  async componentDidMount() {
    const data = await fetch('https://restcountries.eu/rest/v2/all')
    const json = await data.json()
    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return { id: numericCode, name, filterName: name.toLowerCase(), flag, population }
    });
    this.setState({
      allCountries,
      filteredCountries: allCountries
    })
  }

  handleChangeFilter = (newText) => {
    const newTextLowerCase = newText.toLowerCase()
    const { allCountries } = this.state
    const filteredCountries = allCountries.filter(country => country.filterName.includes(newTextLowerCase) > 0)
    this.setState({
      filter: newText,
      filteredCountries
    })
  }

  render() {
    const { filteredCountries, filter } = this.state
    return (
      <div className="container">
        <h1>React Countries</h1>
        <Header filter={filter} onChangeFilter={this.handleChangeFilter}/>
        <Countries countries={filteredCountries}/>
      </div>
    );
  }
}

