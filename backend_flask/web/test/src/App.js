import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App" width="100%">
      <header className="App-header">
        <img
          src="https://abcdavid-knguyen.ddns.net:30001/image/get/216"
          className="App-logo"
          alt="KNguyen"

        />
        <a
          className="App-link"
          href="https://www.facebook.com/khanhkhanh66"
          target="_blank"
          rel="noopener noreferrer"
          style = {{ margin: '0px 0px 30px 0px'}}
        >
          Nguyen Khanh
        </a>
          <iframe
            title="Webpage"
            src="https://steamcommunity.com/id/khanhkhanh66"
            width="100%"
            height="500px"
          />
      </header>
    </div>
  );
}

export default App;
