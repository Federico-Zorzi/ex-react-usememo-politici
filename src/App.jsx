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
  /* console.log(politiciansList); */

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

  const filteredPoliticiansList = useMemo(() => {
    if (!filter.trim()) return politiciansList;

    return politiciansList.filter(
      (p) =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.biography.toLowerCase().includes(filter.toLowerCase())
    );
  }, [politiciansList, filter]);

  return (
    <main>
      <h1>Lista della politici</h1>

      {/* SEARCH FIELD */}
      <div id="search-field">
        <input type="text" onChange={(e) => setFilter(e.target.value)} />
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
