import fetchList from './characters'
import { useState, useEffect } from 'react'
import Card from './Card'

export default function App() {
  const [difficulty, setDifficulty] = useState('');
  const [play, setPlay] = useState(false);
  const [pokemon, setPokemon] = useState();
  
  const characters = fetchList("https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0");
  
  useEffect(() => {
    if (characters) {
      pickPokemon();
    }
  }, [difficulty])
  
  
  function DiffButton(props) {  
    function onClick() {
      setDifficulty(props.text);
      setPlay(!play);
    }

    const diffN = difficulty === 'Easy'
      ? 6
      : difficulty === 'Medium'
      ? 12
      : difficulty === 'Hard'
      ? 20
      : null;

    return (
      <button onClick={onClick}>{props.text}</button>
    )
  }

  async function fetchPokemonData(random) {
    const response = await fetch(characters.results[random].url);
    const data = await response.json();
    return data;
  }

  function pickPokemon() {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      const random = Math.floor(Math.random() * 100);
      if (arr.includes(random)) {
        i--;
      } else {
        arr.push(random);
      }
    }
    const result = arr.map(num => fetchPokemonData(num));
    setPokemon(result);
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
        <Card charUrl={'hello'} charName={'pokemon'}></Card>
      )}
    </>
  )
}