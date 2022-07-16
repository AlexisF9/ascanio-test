import { useEffect, useState } from "react";
import EndDate from "../EndDate";
import SearchLocation from "../SearchLocation";

export default function Card({ id, reload, setReload }) {
  const [data, setData] = useState();

  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState();
  const [editId, setEditId] = useState();
  const [search, setSearch] = useState();
  const [date, setDate] = useState();

  // Je fais une mise à jours des cartes à chaque fois qu'un changement est enregistré
  useEffect(() => {
    fetchData();
  }, [reload]);

  function fetchData() {
    setData(JSON.parse(localStorage.getItem(id)));
  }

  // Modification d'une carte
  async function editItem(e) {
    if (editContent && search && date) {
      data[editId].content = await editContent;
      data[editId].location = await search;
      data[editId].dateEnd = await date;
      localStorage.setItem(id, JSON.stringify(data));
    } else {
      alert("Votre contenu ne peut pas être vide");
    }

    setEditId("");
    setDate("");
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

  async function positionHaut(e) {
    if (e > 0) {
      const element = await data.splice(e, 1)[0];
      await data.splice(e - 1, 0, element);
      await localStorage.setItem(id, JSON.stringify(data));

      setReload(!reload);
    }
  }

  async function positionBas(e) {
    if (e < data.length - 1) {
      const element = await data.splice(e, 1)[0];
      await data.splice(e + 1, 0, element);
      await localStorage.setItem(id, JSON.stringify(data));

      setReload(!reload);
    }
  }

  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <>
              {item.content != null && item.location != null ? ( // Si la carte n'est pas vide
                <div
                  className="relative group bg-secondaryLight border-2 border-secondary p-4 mt-4 flex justify-between "
                  key={index}
                >
                  {edit && editId === index ? ( // On edit les infos ou on les affiches
                    <div className="flex flex-col">
                      <input
                        placeholder="Content"
                        type="text"
                        className="p-2 mb-3 border text-white border-slate-500 bg-transparent rounded focus:outline-0"
                        onChange={(e) => {
                          setEditContent(e.currentTarget.value);
                        }}
                        value={editContent}
                      />

                      <SearchLocation setSearch={setSearch} search={search} />
                      <EndDate date={date} setDate={setDate} />
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold break-words">{item.content}</p>
                      <p className="flex mt-4 break-words">
                        <span className="material-symbols-outlined">
                          push_pin
                        </span>
                        {item.location}
                      </p>
                      <p className="flex mt-4 break-words">
                        <span class="material-symbols-outlined">timer</span>
                        {item.dateEnd}
                      </p>
                    </div>
                  )}

                  <div>
                    {edit && editId === index ? (
                      <button
                        className="material-symbols-outlined text-primary"
                        onClick={() => editItem(item)}
                      >
                        done
                      </button>
                    ) : (
                      <button
                        className="material-symbols-outlined text-primary"
                        onClick={() => {
                          setEdit(true);
                          setEditContent(item.content);
                          setSearch(item.location);
                          setDate(item.dateEnd);
                          setEditId(index);
                        }}
                      >
                        edit
                      </button>
                    )}
                    <button
                      className="material-symbols-outlined text-primary"
                      onClick={() => suppItem(index)}
                    >
                      delete
                    </button>
                  </div>

                  <div className="md:opacity-0 group-hover:opacity-100 flex absolute left-[50%] translate-x-[-50%] md:translate-x-0 md:left-[-10px] top-[-10px] bg-white rounded ease-in-out duration-200">
                    {index > 0 && (
                      <button
                        className="material-symbols-outlined"
                        onClick={() => positionHaut(index)}
                      >
                        expand_less
                      </button>
                    )}
                    {index === data.length - 1 ? null : (
                      <button
                        className="material-symbols-outlined"
                        onClick={() => positionBas(index)}
                      >
                        expand_more
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </>
          );
        })}
    </>
  );
}
