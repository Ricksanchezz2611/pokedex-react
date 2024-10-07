import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Loadingscreen from '../components/loadingscreen'
const Home = () => {
  const [pokemons,setPokemons] = useState([]);
  const [offSet,setOffset] = useState(()=>{
    const storedOffset = sessionStorage.getItem("offset");
    return storedOffset ? parseInt(storedOffset,10) : 0;
  });
  const[loading,setloading] = useState(true);
  function handleNextpage() {
    const newoffset = offSet + 50;
    setOffset(newoffset);
    sessionStorage.setItem("offset", newoffset.toString());
  }
  function handlePreviouspage(){
    const newoffset = offSet <=50 ? 0 : offSet - 50;
    setOffset(newoffset);
    sessionStorage.setItem("offset",newoffset.toString);
  }
  useEffect(() => {
    async function fetchPokemon(){
      const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offSet}`;
      const res = await fetch(apiUrl);
      const data = await res.json();
      setPokemons(data.results);
      setTimeout(() =>{
        setloading(false);
      },500);
    }
    fetchPokemon();
  }, [offSet]);
  useEffect(() =>{
    setloading(true);
  },[offSet]);
  return (
    <div className="Home maxWidth">
      {loading && <Loadingscreen/>}
      {!loading && (
        <>
        <Header/>
        <Feed  pokemons={pokemons} />

      <div className="pagination">
        <button onClick={handlePreviouspage} className="btn">Previous</button>
        <button onClick={handleNextpage} className="btn">Next</button>
      </div>
        </>
      )}
    </div>
  )
}

export default Home