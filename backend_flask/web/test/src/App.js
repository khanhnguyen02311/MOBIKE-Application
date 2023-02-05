import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App" width="100%">
      <header className="App-header">
        <img
          src="https://abcdavid-knguyen.ddns.net:30001/image/get/186"
          className="App-logo"
          alt="KNguyen"

        />
        <a
          className="App-link"
          href="https://www.facebook.com/khanhkhanh66"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: '0px 0px 30px 0px' }}
        >
          Nguyen Khanh
        </a>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/y_fB0IMbq54"
          frameborder="100"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>

        </iframe>
      </header>
    </div>
  );
}

export default App;
