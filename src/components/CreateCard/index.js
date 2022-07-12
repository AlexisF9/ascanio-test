import { useState } from "react";

export default function ({ reload, index, setReload }) {
  const [id, setId] = useState();
  const [content, setContent] = useState();
  const [search, setSearch] = useState();

  const [location, setLocation] = useState();

  // fetch de l'API
  const handleSearch = async () => {
    try {
      const rep = await fetch(`https://geo.api.gouv.fr/communes?nom=${search}`);
      const response = await rep.json();
      setLocation(response);
    } catch (e) {
      console.log(e);
    }
  };

  // Ajout d'une nouvelle carte
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Je réccupère les anciennes cartes (si il y en a)
    let oldItems = JSON.parse(localStorage.getItem(id)) || [];

    try {
      let newItems = await { content: content, location: search };

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
            className="p-2 "
            value={content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
              setId(index);
            }}
          />

          <input
            required
            list="listLocation"
            type="text"
            placeholder="Localisation"
            className="p-2 mt-2"
            onChange={(e) => {
              setSearch(e.currentTarget.value);
              handleSearch(); // Je relance la recherche de communes à chaque nouvelle lettre ajouté
            }}
            value={search}
          />
          {location && ( // Si les communes sont trouvés je les listes
            <datalist id="listLocation">
              {location.map((item, index) => {
                return (
                  <option
                    key={index}
                    onClick={() => setSearch(item.nom)}
                    value={item.nom}
                  />
                );
              })}
            </datalist>
          )}

          <button className="w-max flex p-2 font-bold	" type="submit">
            <span className="material-symbols-outlined">add</span>
            Ajouter
          </button>
        </form>
      )}

      <button
        className="mt-4 p-2 md:p-3 bg-primary text-center rounded"
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
