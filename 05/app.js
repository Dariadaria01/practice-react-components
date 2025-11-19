import React from 'react';
import { createRoot } from 'react-dom/client';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
    };
  }
  componentDidMount() {
    const { lat, lng } = this.props;
    const API_KEY = '6e86c3547c88493792e8bef2cd9c0a1c';

    const url = `https://api.weatherbit.io/v2.0/current?key=${API_KEY}&lat=${lat}&lon=${lng}&lang=pl`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Błąd w połączeniu z API');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ data: data.data[0] });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }
  render() {
    const { data, error } = this.state;
    if (error) {
      return <p>Błąd: {error}</p>;
    }
    if (!data) {
      return <p>Ładowanie pogody...</p>;
    }
    return (
      <div>
        <h2>Pogoda dla {data.city_name}</h2>
        <p>Temperatura: {data.temp}C</p>
        <p>Opis: {data.weather.description}</p>
        <p>Wiatr: {data.wind_spd} m/s</p>
        <p>Wilgotność: {data.rh}%</p>
      </div>
    );
  }
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Weather lat={52.232222} lng={21.008333} />);
