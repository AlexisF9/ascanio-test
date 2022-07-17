export default function CreateColumn({
  setOpenForm,
  openForm,
  setNameColumn,
  setName,
  name,
}) {
  // Ajout de colonne
  const addCol = async (event) => {
    event.preventDefault();

    // Je réccup les anciennes colonnes
    let oldItems = (await JSON.parse(localStorage.getItem("columns"))) || [];
    let newItems = await name;

    // Si la colonne existe déjà
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
  );
}
