import React, { Component } from 'react'
import { formatNumber } from '../../helpers/formatHelpers'
import css from './header.module.css'

export default class Header extends Component {
    handleInputChange = (event) => {
        const newText = event.target.value
        this.props.onChangeFilter(newText)
    }

    render() {
        const { filter, countryCount, populationCount } = this.props;
        return (
            <div className={css.flexRow}>
                <input className={css.input} type="text" placeholder="Filtro" value={filter} onChange={this.handleInputChange}></input>
                <span className={css.countries}> Países: <strong>{countryCount}</strong></span>
                <span className={css.population}>População: <strong>{formatNumber(populationCount)}</strong></span>
            </div>
        )
    }
}
