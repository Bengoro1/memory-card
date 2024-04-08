import fetchList from './characters'
import { useState, useEffect } from 'react'
import Card from './Card'

export default function App() {
  const [difficulty, setDifficulty] = useState('Easy');
  const [play, setPlay] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [clicked, setClicked] = useState();
  
  const characters = fetchList("https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0");

  useEffect(() => {
    if (characters) {
      pickPokemon();
    }
  }, [characters, difficulty]) 
  
  function DiffButton(props) {  
    function onClick() {
      setDifficulty(props.text);
      setPlay(!play);
    }

    return (
      <button onClick={onClick}>{props.text}</button>
    )
  }
    
  const diffN = difficulty === 'Easy'
    ? 6
    : difficulty === 'Medium'
    ? 12
    : difficulty === 'Hard'
    ? 20
    : null;

  async function fetchPokemonData(random) {
    const response = await fetch(characters.results[random].url);
    const data = await response.json();
    return data;
  }

  function pickPokemon() {
    const arr = [];
    for (let i = 0; i < diffN; i++) {
      const random = Math.floor(Math.random() * 100);
      if (arr.includes(random)) {
        i--;
      } else {
        arr.push(random);
      }
    }
    const response = arr.map(num => fetchPokemonData(num));
    Promise.all(response).then((values) => {
      setPokemon(values);
    })
  }
    
  return (
    <>
      {!play ? (
        <>
          Difficulty: 
          <DiffButton text='Easy'></DiffButton>
          <DiffButton text='Medium'></DiffButton>
          <DiffButton text='Hard'></DiffButton> 
        </>
      ) : (
        <div>
          {pokemon.map((poke) => {
            return <Card key={poke.id} charUrl={poke.sprites.front_default} charName={poke.name} />
          })}
        </div>
      )}
    </>
  )
}