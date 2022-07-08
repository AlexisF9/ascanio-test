import logo from "./logo.svg";
import "./App.css";
import Tableau from "./components/Tableau";

function App() {
  const nameColumn = ["Fondation", "Assainnissement", "Murs", "Finition"];

  return (
    <div>
      <h1 className="text-3xl font-bold m-8	">Bienvenue !</h1>
      <Tableau nameColumn={nameColumn} />
    </div>
  );
}

export default App;
