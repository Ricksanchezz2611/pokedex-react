import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loadingscreen from '../components/loadingscreen';
import Error from './Error';
import Button from '../components/Button';
import "../css/Searchedpokemon.css"
import Stat from '../components/Stat';
import Stats from '../components/Stats';

const Searchedpokemon = () => {
    const {pokemon} = useParams();
    const [selectedpokemon,setselectedpokemon] = useState([]);
    const [loading,setloading] = useState(true);
    const [error,setError] = useState(false);
    const [stats,setstats] = useState({
        height : 0,
        weight : 0,
        exp : 0,
        hp : 0,
        attack : 0,
        defence : 0,
        splAttack: 0,
        splDefence : 0,
        speed : 0,
    });

    //COLORS
    const colours = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
    };

    useEffect(()=>{
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        async function fetchpokemon(){
            setloading(true);
            try{
                const  response = await fetch(apiUrl);
                if(!response.ok) throw new Error("Error occured whlie fetching the pokemon");
                const data = await response.json();
                setselectedpokemon(data);
                setstats({
                    height : (data.height / 3.048).toFixed(1),
                    weight : (data.weight / 10).toFixed(1),
                    exp : data.base_experience,
                    hp : data.stats[0].base_stat,
                    attack : data.stats[1].base_stat,
                    defence : data.stats[2].base_stat,
                    splAttack: data.stats[3].base_stat,
                    splDefence : data.stats[4].base_stat,
                    speed : data.stats[5].base_stat,
                })
                setTimeout(()=>{
                    setloading(false);
                });
            } catch(error){
                setloading(false);
                setError(true);
            }
        }
        fetchpokemon();
    },[pokemon])

    if(loading) return <Loadingscreen/>
    if (error) return <Error/>
  return (
    <div className="searched-pokemon maxWidth">
        <div className="searched-pokemon-header">
            <Link to={"/"}>
            <Button Label="back"/>
            </Link>
        </div>

        <div className="pokemon-details">
            <div className="searched-pokemon-info">
                <h4>{selectedpokemon.name}</h4>
                <div className="type">
                    {selectedpokemon.types.map((typex,index)=>(
                        <span key={index} style={{
                            backgroundColor:colours[typex.type.name]
                        }}>{typex.type.name}</span>
                    ))}
                </div>
                <Stats stats={stats}/>
            </div>
            <div className="previewImage">
                <img src={selectedpokemon.sprites.other.home.front_default} alt={selectedpokemon.name} />
            </div>
        </div>
    </div>
  )
}

export default Searchedpokemon;