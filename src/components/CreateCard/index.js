import { useState } from "react";

export default function ({ reload, index, setReload }) {
  const [id, setId] = useState();
  const [content, setContent] = useState();
  const [search, setSearch] = useState();

  const [location, setLocation] = useState();

  const handleSearch = async () => {
    try {
      const rep = await fetch(`https://geo.api.gouv.fr/communes?nom=${search}`);
      const response = await rep.json();
      setLocation(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let oldItems = JSON.parse(localStorage.getItem(id)) || [];

    try {
      let newItems = await { content: content, location: search };

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
            list="listLocation"
            type="text"
            placeholder="Localisation"
            className="p-2 mt-2"
            onChange={(e) => {
              setSearch(e.currentTarget.value);
              handleSearch();
            }}
            value={search}
          />
          {location && (
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

          <button className="w-max flex p-2" type="submit">
            <span className="material-symbols-outlined">add</span>
            Ajouter
          </button>
        </form>
      )}

      <button
        className="mt-4 p-3 bg-primary text-center rounded"
        onClick={() => {
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
