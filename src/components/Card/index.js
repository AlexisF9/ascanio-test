import { useEffect, useState } from "react";

export default function Card({ id, reload, setReload }) {
  const [data, setData] = useState();

  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState();
  const [editId, setEditId] = useState();

  useEffect(() => {
    fetchData();
  }, [reload]);

  function fetchData() {
    setData(JSON.parse(localStorage.getItem(id)));
  }

  async function editItem(e) {
    data[editId].content = await editContent;
    localStorage.setItem(id, JSON.stringify(data));

    setEditId("");
    setReload(!reload);
    setEdit(false);
  }

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
              class="bg-secondary p-4 mt-4 flex justify-between rounded break-all"
              key={index}
            >
              {edit && editId === index ? (
                <input
                  onChange={(e) => {
                    setEditContent(e.currentTarget.value);
                  }}
                  value={editContent}
                />
              ) : (
                <p>{item.content}</p>
              )}

              <div>
                {edit ? (
                  <button
                    class="material-symbols-outlined"
                    onClick={() => editItem(item)}
                  >
                    done
                  </button>
                ) : (
                  <button
                    class="material-symbols-outlined"
                    onClick={() => {
                      setEdit(true);
                      setEditContent(item.content);
                      setEditId(index);
                    }}
                  >
                    edit
                  </button>
                )}
                <button
                  class="material-symbols-outlined "
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
