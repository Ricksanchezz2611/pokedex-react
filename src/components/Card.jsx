import React from 'react'

const Card = ({data}) => {
  console.log(data);
  const urlParts = data.url.split("/");
  console.log(urlParts.length);
  const pokeId = urlParts[urlParts.length - 2]
  console.log(pokeId);
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeId}.png`
  return (
    <div className="card">
            <img src={imgUrl} 
            alt="pokemon" />
            <div className="text">
                <h4 className="name" >
                    <span className="pokeId">{pokeId}.</span>{data.name}
                </h4>
            </div>
        </div>
  );
};

export default Card