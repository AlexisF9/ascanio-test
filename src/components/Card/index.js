import { useEffect, useState } from "react";
import SearchLocation from "../SearchLocation";

export default function Card({ id, reload, setReload }) {
  const [data, setData] = useState();

  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState();
  const [editId, setEditId] = useState();
  const [search, setSearch] = useState();

  // Je fais une mise à jours des cartes à chaque fois qu'un changement est enregistré
  useEffect(() => {
    fetchData();
  }, [reload]);

  function fetchData() {
    setData(JSON.parse(localStorage.getItem(id)));
  }

  // Modification d'une carte
  async function editItem(e) {
    if (editContent && search) {
      data[editId].content = await editContent;
      data[editId].location = await search;
      localStorage.setItem(id, JSON.stringify(data));
    } else {
      alert("Votre contenu ne peut pas être vide");
    }

    setEditId("");
    setReload(!reload);
    setEdit(false);
  }

  // Suppression d'une carte
  async function suppItem(e) {
    if (window.confirm("Êtes vous sur de vouloir supprimer cet element ?")) {
      await data.splice(e, 1);
      localStorage.setItem(id, JSON.stringify(data));

      setReload(!reload);
    }
  }

  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <div
              className="bg-secondary p-4 mt-4 flex justify-between rounded break-all"
              key={index}
            >
              {edit && editId === index ? ( // On edit les infos ou on les affiches
                <div className="flex flex-col">
                  <input
                    placeholder="Content"
                    type="text"
                    className="p-2"
                    onChange={(e) => {
                      setEditContent(e.currentTarget.value);
                    }}
                    value={editContent}
                  />

                  <SearchLocation setSearch={setSearch} search={search} />
                </div>
              ) : (
                <div>
                  <p className="font-bold">{item.content}</p>
                  <p className="flex mt-4">
                    <span className="material-symbols-outlined">push_pin</span>
                    {item.location}
                  </p>
                </div>
              )}

              <div>
                {edit && editId === index ? (
                  <button
                    className="material-symbols-outlined"
                    onClick={() => editItem(item)}
                  >
                    done
                  </button>
                ) : (
                  <button
                    className="material-symbols-outlined"
                    onClick={() => {
                      setEdit(true);
                      setEditContent(item.content);
                      setSearch(item.location);
                      setEditId(index);
                    }}
                  >
                    edit
                  </button>
                )}
                <button
                  className="material-symbols-outlined "
                  onClick={() => suppItem(index)}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
}
