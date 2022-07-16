import { useEffect, useState } from "react";
import Card from "../Card";
import CreateCard from "../CreateCard";

export default function Tableau() {
  const [openForm, setOpenForm] = useState(false);

  const [nameColumn, setNameColumn] = useState();
  const [reload, setReload] = useState(false);
  const [name, setName] = useState();

  // on get les colonnes pour les affichers
  useEffect(() => {
    setNameColumn(JSON.parse(localStorage.getItem("columns")));
  }, []);

  // Créer une nouvelle colonne
  const addCol = async (event) => {
    event.preventDefault();

    let oldItems = (await JSON.parse(localStorage.getItem("columns"))) || [];
    let newItems = await name;

    if (oldItems.find((element) => element === newItems)) {
      alert("Cette colonne existe déjà");
    } else {
      await oldItems.push(newItems);
      await localStorage.setItem("columns", JSON.stringify(oldItems));
    }

    setNameColumn(JSON.parse(localStorage.getItem("columns")));
    setName("");
    setOpenForm(false);
  };

  return (
    <>
      <form className="ml-4 my-14" onSubmit={addCol}>
        {openForm ? (
          <>
            <input
              placeholder="Nom de la colonne"
              className="p-3 border text-white border-slate-500 bg-transparent rounded focus:outline-0"
              type="text"
              onChange={(e) => setName(e.currentTarget.value)}
              value={name}
            />
            <button
              type="submit"
              className="mx-2 p-2 lg:p-3 bg-secondary text-center rounded"
            >
              Créer
            </button>
            <button
              className="text-white"
              onClick={() => {
                setOpenForm(false);
                setName("");
              }}
            >
              Annuler
            </button>
          </>
        ) : (
          <button
            className="p-2 lg:p-3 bg-secondary text-center rounded"
            onClick={() => setOpenForm(true)}
          >
            Ajouter une nouvelle colonne
          </button>
        )}
      </form>

      {nameColumn && (
        <div className="lg:overflow-x-scroll flex flex-col	lg:flex-row">
          {/* Je parcours mes nom de colonne passé en props et j'en créé une par nom */}

          {nameColumn.map((item, index) => {
            return (
              <div
                className="mb-4 lg:min-w-[500px] lg:max-w-[500px] lg:mt-0 lg:flex-1 h-max bg-darkLight border border-2 border-darkBorder mx-2 p-2 lg:p-4 rounded-md"
                key={index}
              >
                <h2 className="text-center mb-2 font-bold	 uppercase">{item}</h2>
                <Card id={index} reload={reload} setReload={setReload} />
                <CreateCard
                  reload={reload}
                  index={index}
                  setReload={setReload}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
