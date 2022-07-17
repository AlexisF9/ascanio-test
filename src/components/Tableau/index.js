import { useEffect, useState } from "react";
import Card from "../Card";
import CreateCard from "../CreateCard";
import CreateColumn from "../CreateColumn";

export default function Tableau() {
  const [openForm, setOpenForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState();

  const [nameColumn, setNameColumn] = useState();
  const [reload, setReload] = useState(false);
  const [name, setName] = useState();

  // on get les colonnes pour les affichers
  useEffect(() => {
    setNameColumn(JSON.parse(localStorage.getItem("columns")));
  }, []);

  // Créer une nouvelle colonne

  async function editCol(e) {
    let oldItems = (await JSON.parse(localStorage.getItem("columns"))) || [];

    // si le champ n'est pas vide
    if (name) {
      // si le nom n'est pas le même qu'une autre colonne
      if (oldItems.find((element) => element === name)) {
        alert("Cette colonne existe déjà");
      } else {
        nameColumn[editId] = await name;
        localStorage.setItem("columns", JSON.stringify(nameColumn));
      }
    } else {
      alert("Votre titre ne peut pas être vide");
    }

    setEditId("");
    setName("");
    setEdit(false);
  }

  return (
    <>
      <CreateColumn
        setOpenForm={setOpenForm}
        openForm={openForm}
        setNameColumn={setNameColumn}
        setName={setName}
        name={name}
      />
      {nameColumn && (
        <div className="lg:overflow-x-scroll flex flex-col	lg:flex-row">
          {/* Je parcours l'objet column des localstorage et j'en créé une par nom */}
          {nameColumn.map((item, index) => {
            return (
              <div
                className="mb-4 lg:min-w-[500px] lg:max-w-[500px] lg:mt-0 lg:flex-1 h-max bg-darkLight border border-2 border-darkBorder mx-2 p-2 lg:p-4 rounded-md"
                key={index}
              >
                <div className="flex justify-center items-center">
                  {edit && editId === index ? (
                    <>
                      <input
                        type="text"
                        placeholder="Nom de la colonne"
                        className="mr-2 p-2 border text-white border-slate-500 bg-transparent rounded focus:outline-0"
                        value={name}
                        onChange={(e) => {
                          setName(e.currentTarget.value);
                        }}
                      />
                      <button
                        className="material-symbols-outlined text-primary"
                        onClick={() => {
                          editCol(index);
                        }}
                      >
                        done
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="mr-2 font-bold uppercase">{item}</h2>
                      <button
                        className="material-symbols-outlined text-primary"
                        onClick={() => {
                          setEdit(true);
                          setName(item);
                          setEditId(index);
                        }}
                      >
                        edit
                      </button>
                    </>
                  )}
                </div>

                {/* Contenu de la colonne */}
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
