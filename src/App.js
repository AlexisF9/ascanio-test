import logo from "./logo.svg";
import "./App.css";
import Tableau from "./components/Tableau";

function App() {
  const nameColumn = ["Fondation", "Assainnissement", "Murs", "Finition"];

  return (
    <div className="bg-dark m-0 min-h-screen pt-8">
      <img className="h-28 mb-8 ml-8" src="/logo.png" />
      <Tableau nameColumn={nameColumn} />
    </div>
  );
}

export default App;
