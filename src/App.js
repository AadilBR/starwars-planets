import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import Star_Wars from "./Star_Wars.png";


function App() {

  const [planets, setPlanets] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [end, setEnd] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://swapi.dev/api/planets/?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (data.next === null) {
          setEnd(true)
        }
        console.log(data)
        setPlanets(p => [...p, ...data.results])
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page])

  return (
    <section className="container py-5">
      <h1 className="mb-5 text-white">Planètes dans l'univers Star Wars</h1>
      <div className="row">
        {planets.map((planet) => {
          return (
            <div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={planet.name}>
              <article className="bg-warning p-3">
                <h2 className="h5">{planet.name}</h2>
                <p className="mb-0"><b>population</b><br />{planet.population}</p>
                <p className="mb-0"><b>climat</b><br />{planet.climate}</p>
              </article>
            </div>
          )
        })}
        {loading && <p className="mb-4 text-center p-3">Loading....</p>}
        {error && <p className="mb-4 text-center p-3">{error}</p>}
      </div>
      {end ? <p className="bg-dark text-white p-3"><b>Nous avons listé toutes les planètes recensées.</b></p> : <button type="button" className="btn btn-dark" onClick={() => setPage(p => p + 1)} ><b>Suivantes</b></button>}
      <div className="text-center">
        <img className="photo" src={Star_Wars} alt="logo Star Wars"></img>
      </div>
    </section >

  );
}

export default App;