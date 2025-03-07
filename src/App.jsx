import { useState, useEffect, useMemo, memo } from "react";

const PoliticianCard = memo(({ image, name, position, biography }) => {
  /* console.log("Render:", name); */
  return (
    <div className="politician-card">
      <figure className="politician-card-image">
        <img src={image ?? ""} alt={name} />
      </figure>
      <div className="politician-card-content">
        <h3>{name}</h3>
        <span>{position}</span>
        <p>{biography}</p>
      </div>
    </div>
  );
});

function App() {
  const [politiciansList, setPoliticiansList] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  /* console.log(filterPosition); */

  useEffect(() => {
    const newPoliticiansList = async () => {
      try {
        const fetchResPoliticians = await fetch(
          `https://boolean-spec-frontend.vercel.app/freetestapi/politicians`
        ).then((res) => res.json());

        if (!fetchResPoliticians.length > 0) {
          throw new Error("Non è disponibile una lista di politici");
        }

        setPoliticiansList(fetchResPoliticians);
      } catch (err) {
        console.error("Errore nella fetch:", err);
      }
    };
    newPoliticiansList();
  }, []);

  const filterPositions = useMemo(() => {
    const politicPositions = [];
    politiciansList.forEach((p) => {
      if (!politicPositions.includes(p.position))
        politicPositions.push(p.position);
    });
    return politicPositions;
  }, [politiciansList]);

  const filteredPoliticiansList = useMemo(() => {
    return politiciansList.filter((p) => {
      const nameMatches = p.name.toLowerCase().includes(filter.toLowerCase());
      const bioMatches = p.biography
        .toLowerCase()
        .includes(filter.toLowerCase());
      const positionMatches =
        filterPosition === "" || p.position === filterPosition;

      return (nameMatches || bioMatches) && positionMatches;
    });
  }, [politiciansList, filter, filterPosition]);

  return (
    <main>
      <h1>Lista della politici</h1>

      {/* SEARCH FIELD */}
      <div id="search-field">
        <input
          type="text"
          placeholder="Cerca per nome o biografia"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div id="search-field-position">
        <select
          id="politician-position"
          name=""
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
        >
          <option value="">Cerca per posizione politica...</option>
          {filterPositions.map((fp, i) => (
            <option key={fp} value={fp}>
              {fp}
            </option>
          ))}
        </select>
      </div>
      <section className="cards-list-politicians">
        {filteredPoliticiansList.length > 0 &&
          filteredPoliticiansList.map((politician) => (
            <PoliticianCard
              key={politician.id}
              image={politician.image}
              name={politician.name}
              position={politician.position}
              biography={politician.biography}
            />
          ))}
      </section>
    </main>
  );
}

export default App;
