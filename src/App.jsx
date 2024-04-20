import fetchList from './characters'
import { useState, useEffect } from 'react'
import Card from './Card'

export default function App() {
  const [difficulty, setDifficulty] = useState('Easy');
  const [play, setPlay] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [win, setWin] = useState();
  
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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleClick(poke) {
    const result = shuffleArray(pokemon);
    setPokemon(result);
    if (!clicked.includes(poke)) {      
      setClicked([...clicked, poke]);
      setScore(score + 1);
      if (score >= highScore) setHighScore(score + 1);
      if ((clicked.length + 1) == pokemon.length) newGame('won');
    } else {
      newGame('lost');
    }
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

  function newGame(result) {
    console.log(result);
    setWin(result);
    setDifficulty('');
    setScore(0);
    setClicked([]);
    setPlay(!play);
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
          <p>Score: {score} High score: {highScore}</p>
          {pokemon.map((poke) => {
            return <Card key={poke.id} onClick={() => handleClick(poke.name)} charUrl={poke.sprites.front_default} charName={poke.name}  />
          })}
        </div>
      )}
    </>
  )
}