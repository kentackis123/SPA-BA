import React from 'react';
import cities from 'cities.json';
import countries from 'country-json/src/country-by-abbreviation';
import Select from 'react-select';
import { AppWrap, Grid, GridWrap, Container, Loading } from './styled';
import Map from './Map';

export default class Selects extends React.Component {
  state = {
    cities: cities.map(city => ({
      label: city.name,
      value: city.country,
      lat: city.lat,
      lng: city.lng
    })),
    countries: countries.map(country => ({
      label: country.country,
      value: country.abbreviation
    })),
    city: null,
    cityInput: '',
    country: null,
    forecast: null,
    loading: false
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(e =>
          this.setState(
              {
                city: {
                  lat: e.coords.latitude,
                  lng: e.coords.longitude,
                  label: 'Your location'
                }
              },
              this.getForecast
          )
      );
    } else {
      alert("Browser doesn't support geolocation feature.");
    }
  };

  handleSelectChange = (selectedOption, type) => {
    this.setState({ [type]: selectedOption });
  };

  getForecast = () => {
    const { lat, lng } = this.state.city;
    this.setState({ loading: true });
    fetch(
        `https://cors-anywhere.herokuapp.com/${`https://api.darksky.net/forecast/6d970e217846490dc9febc6ff704acec/${lat},${lng}`}`
    )
    .then(response => response.json())
    .then(res => this.setState({ forecast: res, loading: false }));
  };

  addFavorite = city => {
    const storedFavs = JSON.parse(localStorage.getItem('fav')) || [];
    storedFavs.push(city.label);
    localStorage.setItem('fav', JSON.stringify(storedFavs));
  };

  reset = () => {
    this.setState({ city: null, country: null, forecast: null });
  };

  render() {
    const {
      cities,
      countries,
      city,
      country,
      forecast,
      cityInput,
      loading
    } = this.state;
    return (
        <AppWrap>
          <Container>
            <GridWrap>
              <div>
                <h3>Select a country (optional)</h3>
                <Select
                    value={country}
                    onChange={e =>
                        this.handleSelectChange(e, 'country')
                    }
                    options={countries}
                />
              </div>
              <div>
                <h3>Select a city (required)</h3>
                <Select
                    value={city}
                    onChange={e =>
                        this.handleSelectChange(e, 'city')
                    }
                    onInputChange={e =>
                        this.setState({ cityInput: e })
                    }
                    options={
                      country === null
                          ? cityInput.length > 2
                          ? cities.filter(i =>
                              i.label
                              .toLowerCase()
                              .includes(
                                  cityInput.toLowerCase()
                              )
                          )
                          : []
                          : cities.filter(
                          i => i.value === country.value
                          )
                    }
                />
                <p>
                  {' '}
                  - Either choose a country and select from
                  available cities or enter 3 letters to initiate
                  search.
                </p>
              </div>
            </GridWrap>
            <GridWrap>
              <button onClick={this.getForecast}>Forecast</button>
              <button onClick={this.reset}>Reset</button>
              <button onClick={this.getLocation}>
                Your location
              </button>
              {city !== null &&
              (localStorage.getItem('fav') === null ||
                  !JSON.parse(localStorage.getItem('fav')).find(
                      y => y === city.label
                  )) && (
                  <button onClick={() => this.addFavorite(city)}>
                    Add to favorites
                  </button>
              )}
            </GridWrap>
            {city && forecast && (
                <>
                  <h3>
                    Forecast for {city.label} - {forecast.latitude},{' '}
                    {forecast.longitude}
                  </h3>
                  <Grid>
                    <div>
                      <h3>Temperature</h3>
                      <span>
                                        {forecast.currently.temperature}
                                    </span>
                    </div>
                    <div>
                      <h3>Humidity</h3>
                      <span>{forecast.currently.humidity}</span>
                    </div>
                    <div>
                      <h3>Wind Speed</h3>
                      <span>{forecast.currently.windSpeed}</span>
                    </div>
                    <div>
                      <h3>Apparent Temperature</h3>
                      <span>
                                        {forecast.currently.apparentTemperature}
                                    </span>
                    </div>
                  </Grid>
                  <Map
                      lat={forecast.latitude}
                      lng={forecast.longitude}
                      name={city.label}
                  />
                </>
            )}
          </Container>
          <Loading visible={loading}>Loading... Please wait.</Loading>
        </AppWrap>
    );
  }
}
