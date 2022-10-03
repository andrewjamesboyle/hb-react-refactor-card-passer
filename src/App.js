import './App.css';
import Player from './components/Player';
import CardList from './components/CardList';
import { useContext } from 'react';
import ExecutePassButton from './components/ExecutePassButton';
import { GameContext } from '../src/context/GameContext';

function App() {
  const { to, from, deck, setDeck, playerOneHand, playerTwoHand, playerThreeHand, setPlayerOneHand, setPlayerTwoHand, setPlayerThreeHand, selectedCard, setSelectedCard } = useContext(GameContext);

  function findCardIndex(value, suit, cards) {
    return cards.findIndex((card) => card.value === value && card.suit === suit);
  }

  function passCard(card) {
    const playerHands = [playerOneHand, playerTwoHand, playerThreeHand];
    const playerHandSetFunctions = [setPlayerOneHand, setPlayerTwoHand, setPlayerThreeHand];

    // arrays start at zero, but our players start at 1 :shrug:
    const toHand = playerHands[to - 1] || deck;
    const fromHand = playerHands[from - 1] || deck;

    const toSetFunction = playerHandSetFunctions[to - 1] || setDeck;
    const fromSetFunction = playerHandSetFunctions[from - 1] || setDeck;

    const cardToMoveIndex = findCardIndex(card.value, card.suit, fromHand);
    const [cardToMove] = fromHand.splice(cardToMoveIndex, 1);

    toHand.push(cardToMove);

    toSetFunction([...toHand]);
    fromSetFunction([...fromHand]);

    setSelectedCard(null);
  }

  return (
    <div className="App">
      <section>
        {/* if the player names are numbers, that will make our life easier later because we can reuse numbers as arrays. Note that this will make our app brittle! */}
        <Player
          
          player={1}
          hand={playerOneHand}
          
          
          
          setSelectedCard={setSelectedCard}
        />
        <Player
          
          player={2}
          hand={playerTwoHand}
          
         
          
          setSelectedCard={setSelectedCard}
        />
        <Player
          
          player={3}
          hand={playerThreeHand}
          
          
          
          setSelectedCard={setSelectedCard}
        />
        <CardList
          cards={deck}
          
          setSelectedCard={setSelectedCard}
          
          player={'deck'}
        />
      </section>
      <section>
        {selectedCard && (
          <ExecutePassButton
            passCard={passCard}
            
            from={from}
      
            
            setSelectedCard={setSelectedCard}
          />
        )}
      </section>
    </div>
  );
}

export default App;
