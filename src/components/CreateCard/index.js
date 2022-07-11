import { useState } from "react";

export default function ({ reload, index, setReload }) {
  const [id, setId] = useState();
  const [content, setContent] = useState();
  const [search, setSearch] = useState();

  const [data, setData] = useState();

  const handleSearch = async () => {
    try {
      const rep = await fetch(`https://geo.api.gouv.fr/communes?nom=${search}`);
      const response = await rep.json();
      setData(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let oldItems = JSON.parse(localStorage.getItem(id)) || [];

    try {
      const rep = await fetch(`https://geo.api.gouv.fr/communes?nom=${search}`);
      const response = await rep.json();

      let newItems = await { content: content, location: response[0].nom };

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
        <form onSubmit={handleSubmit} class="mt-8 flex flex-col	">
          <input
            placeholder="Contenu"
            type="text"
            class="p-2 "
            value={content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
              setId(index);
            }}
          />

          <input
            list="brow"
            type="text"
            onChange={(e) => {
              setSearch(e.currentTarget.value);
              handleSearch();
            }}
            value={search}
          />
          {data && (
            <datalist id="brow">
              {data.map((item, index) => {
                return <option key={index} value={item.nom} />;
              })}
            </datalist>
          )}

          {/* <input
            class="p-2 mt-2"
            placeholder="Localisation"
            type="text"
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
            value={search}
          /> */}

          <button class="material-symbols-outlined p-2" type="submit">
            add
          </button>
        </form>
      )}

      <button
        class="mt-4 p-3 bg-primary text-center rounded"
        onClick={() => {
          id === index ? setId("") : setId(index);
          setContent("");
        }}
      >
        {id === index ? "Annuler" : "Nouvelle carte"}
      </button>
    </>
  );
}
