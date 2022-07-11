import { useState } from "react";
import Card from "../Card";

export default function Tableau(props) {
  const [id, setId] = useState();
  const [content, setContent] = useState();
  const [search, setSearch] = useState();

  const [reload, setReload] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let oldItems = JSON.parse(localStorage.getItem(id)) || [];

    try {
      const rep = await fetch(`https://geo.api.gouv.fr/communes?nom=${search}`);
      const response = await rep.json();

      let newItems = await { content: content, location: response[0].nom };

      if (oldItems.find((element) => element.content === newItems.content)) {
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
    <div class="flex">
      {props.nameColumn.map((item, index) => {
        return (
          <div
            class="flex-1 h-max bg-slate-200 mx-2 p-4 rounded-md max-w-md	"
            key={index}
          >
            <h2 class="text-center mb-2 uppercase">{item}</h2>

            <Card id={index} reload={reload} setReload={setReload} />

            {id === index && (
              <form onSubmit={handleSubmit} class="mt-8 flex">
                <input
                  type="text"
                  class="p-2 "
                  value={content}
                  onChange={(e) => {
                    setContent(e.currentTarget.value);
                    setId(index);
                  }}
                />
                <input
                  type="text"
                  onChange={(e) => {
                    setSearch(e.currentTarget.value);
                  }}
                  value={search}
                />
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
          </div>
        );
      })}
    </div>
  );
}
