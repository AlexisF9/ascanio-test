import { useState } from "react";

export default function SearchLocation({ setSearch, search }) {
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

  return (
    <>
      <input
        required
        list="listLocation"
        type="text"
        placeholder="Localisation"
        className="p-2  border text-white border-slate-500 bg-transparent rounded focus:outline-0"
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
    </>
  );
}
