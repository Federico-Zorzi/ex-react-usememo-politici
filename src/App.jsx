import { useState, useEffect } from "react";

function App() {
  const [politiciansList, setPoliticiansList] = useState([]);
  console.log(politiciansList);

  const newPoliticiansList = () => {
    fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/politicians`)
      .then((res) => res.json())
      .then((pl) => setPoliticiansList(pl));
  };
  useEffect(newPoliticiansList, []);

  return (
    <main>
      <h1>Lista della politici</h1>

      <section className="cards-list-politicians">
        {politiciansList.length > 0 &&
          politiciansList.map((politician) => {
            return (
              <div key={politician.id} className="politician-card">
                <figure className="politician-card-image">
                  <img src={politician.image ?? ""} alt={politician.name} />
                </figure>
                <div className="politician-card-content">
                  <h3>{politician.name}</h3>
                  <span>{politician.position}</span>
                  <p>{politician.biography}</p>
                </div>
              </div>
            );
          })}
      </section>
    </main>
  );
}

export default App;

/* 
Nome (name)
Immagine (image)
Posizione (position)
Breve biografia (biography)
 */
