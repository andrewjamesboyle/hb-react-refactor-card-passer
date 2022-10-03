import React from 'react';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import CardList from './CardList';

export default function Player({
  player,
  setTo,
  hand,
  setFrom,
  setSelectedCard,
  selectedCard,
}) {
  const { to } = useContext(GameContext);
  
  return (
    <div
      className={`player ${to === player ? 'selected-player' : ''}`}
      onClick={() => setTo(player)}
    >
      <p>Player {player}</p>
      <CardList
        player={player}
        cards={hand}
        setFrom={setFrom}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </div>
  );
}
