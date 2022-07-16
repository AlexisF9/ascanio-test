import { useState } from "react";
import EndDate from "../EndDate";
import SearchLocation from "../SearchLocation";

export default function ({ reload, index, setReload }) {
  const [id, setId] = useState();
  const [content, setContent] = useState();

  const [search, setSearch] = useState();
  const [date, setDate] = useState();

  // Ajout d'une nouvelle carte
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Je réccupère les anciennes cartes (si il y en a)
    let oldItems = JSON.parse(localStorage.getItem(id)) || [];

    try {
      let newItems = await {
        content: content,
        location: search,
        dateEnd: date,
      };

      // Si la carte n'exciste pas déjà
      if (
        oldItems.find((element) => element.content === newItems.content) &&
        oldItems.find((element) => element.location === newItems.location)
      ) {
        alert("Attention cette carte existe déjà");
      } else {
        oldItems.push(newItems);
        localStorage.setItem(id, JSON.stringify(oldItems));
      }
    } catch (e) {
      console.log(e);
    }

    setReload(!reload);
    setContent("");
    setSearch("");
    setDate("");
    setId("");
  };

  return (
    <>
      {id === index && (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col	">
          <input
            required
            placeholder="Contenu"
            type="text"
            className="p-2 mb-3 border text-white border-slate-500 bg-transparent rounded focus:outline-0"
            value={content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
              setId(index);
            }}
          />

          <SearchLocation setSearch={setSearch} search={search} />

          <EndDate date={date} setDate={setDate} />

          <button className="w-max flex mt-4 font-bold	text-white" type="submit">
            <span className="material-symbols-outlined">add</span>
            Ajouter
          </button>
        </form>
      )}

      <button
        className="mt-4 p-2 lg:p-3 bg-primary text-center rounded"
        onClick={() => {
          // Au clique je set l'id de la colonne et affiche le fomulaire d'ajout.
          // Au re-clique je vide mon id ce qui ferme le formulaire et vide tout mes champs
          id === index ? setId("") : setId(index);
          setContent("");
          setSearch("");
        }}
      >
        {id === index ? "Annuler" : "Nouvelle carte"}
      </button>
    </>
  );
}
