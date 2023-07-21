import { useEffect, useState } from "react";
import GameOver from "./components/Game-over";
import "./App.css";

function App() {
  const [id, setId] = useState(0);
  const [maxChar, setMaxChar] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [gameover, setGameOver] = useState(false);
  const [character, setCharacter] = useState({});
  const [guess, setGuess] = useState("");
  const [blurred, setBlurred] = useState("");
  function increment() {
    setId(id + 1);
  }
  function decrement() {
    setId(id - 1);
  }

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setMaxChar(data.length - 1);
        const easy = data.filter((character) => character.image);
        const charactersWith = data.filter((character) => character.image);

        setCharacter({
          name: easy[id].name,
          species: easy[id].species,
          gender: easy[id].gender,
          wand: [
            easy[id].wand.wood,
            ", ",
            easy[id].wand.core,
            ", ",
            easy[id].wand.length,
            " inches",
          ],
          house: easy[id].house,
          patronus: easy[id].patronus,
          alternate_names: easy[id].alternate_names,
          actor: easy[id].actor,
          img: easy[id].image,
          eyeColour: easy[id].eyeColour,
          ancestry: easy[id].ancestry,
          id: easy[id].id,
        });
      });
  }, [id]);

  function playerGuess(input) {
    const guessedWord = input.target.value;
    setGuess(guessedWord);
  }

  function handleGuess() {
    if (guessCount === 6 && !correctAnswer) {
      setGameOver(true);
      setTimeout(() => {
        setId(Math.floor(Math.random() * 24));
        setCorrectAnswer(false);
        setGuessCount(0);
        setGameOver(false);
      }, 3000);
    }
    if (!guess) {
      setGuessCount(guessCount + 1);
    } else {
      if (guess.toLowerCase().trim() === character.name.toLowerCase()) {
        setCorrectAnswer(true);
        setTimeout(() => {
          setId(Math.floor(Math.random() * 24));
          setCorrectAnswer(false);
          setGuessCount(0);
        }, 3000);
      } else {
        setGuessCount(guessCount + 1);
      }
    }
  }
  useEffect(() => {
    if (guessCount === 6) {
      setBlurred("blurred_img_level_1");
    } else if (guessCount === 5) {
      setBlurred("blurred_img_level_2");
    } else if (guessCount === 4) {
      setBlurred("blurred_img_level_3");
    } else if (guessCount === 3) {
      setBlurred("blurred_img_level_4");
    } else if (guessCount === 2) {
      setBlurred("blurred_img_level_5");
    } else if (guessCount === 1) {
      setBlurred("blurred_img_level_6");
    } else {
      setBlurred("blurred_img_level_7");
    }
  }, [guessCount]);

  return (
    <>
      <div>
        <h1>Guess Harry Potter Character</h1>
      </div>
      <div>
        <input onChange={playerGuess} type="text" />
        <button onClick={handleGuess}>Revelio</button>
      </div>
      <div>{gameover ? 6 : guessCount} of 6 Guesses</div>
      <h1 className={correctAnswer ? "correct" : null}>
        {correctAnswer || gameover ? character.name : null}
      </h1>
      {correctAnswer || gameover ? (
        <img src={character.img} />
      ) : (
        <img className={blurred} src={character.img} />
      )}
      {gameover ? <GameOver /> : null}

      <div className="character-container">
        {guessCount >= 0 ? (
          <div>
            <h4>Gender</h4>
            <p>{character.gender}</p>
          </div>
        ) : (
          <div></div>
        )}
        {guessCount >= 1 ? (
          <div>
            <h4>House</h4>
            <p>{character.house}</p>
          </div>
        ) : null}
        {guessCount >= 2 ? (
          <div>
            <h4>Species</h4>
            <p>{character.species}</p>
          </div>
        ) : null}
        {guessCount >= 3 ? (
          <div>
            <h4>Wand</h4>
            <p>{character.wand}</p>
          </div>
        ) : null}
        {guessCount >= 4 ? (
          <div>
            <h4>Patronus</h4>
            <p>{!character.patronus ? "?" : character.patronus}</p>
          </div>
        ) : null}
        {guessCount >= 5 ? (
          <div>
            <h4>Alternate Names</h4>
            <p>
              {character.alternate_names
                ? character.alternate_names.map((name) => name + ", ")
                : character.alternate_names}
            </p>
          </div>
        ) : null}
        {guessCount >= 6 ? (
          <div>
            <h4>Actor</h4>
            <p>{character.actor}</p>
          </div>
        ) : null}
      </div>
      {/* //forward and back buttons */}
      {/* 
      {!id ? (
        <button>Previus</button>
      ) : (
        <button onClick={decrement}>Previus</button>
      )}

      {id === maxChar ? (
        <button>Next</button>
      ) : (
        <button onClick={increment}>Next</button>
      )} */}
    </>
  );
}

export default App;
