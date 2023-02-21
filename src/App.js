import "./App.css";
import { Auth } from "./components/Auth";
import { Firestore } from "./components/Firestore";
import { Storage } from "./components/Storage";

function App() {
  return (
    <div className="App">
      <Auth />
      <br />
      <Firestore />

      <br />
      <Storage />
    </div>
  );
}

export default App;
