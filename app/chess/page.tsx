'use client';

import { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import styles from '../app.module.css';

export default function ChessPage() {
  const [game, setGame] = useState<Chess>(new Chess());

  function makeMove(move: {
    from: string;
    to: string;
    promotion?: string;
  }): boolean {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);

    if (result) {
      setGame(gameCopy);
      return true;
    }

    return false;
  }

  function onDrop(sourceSquare: string, targetSquare: string): boolean {
    return makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to queen
    });
  }

  return (
    <div style={{ width: '400px', margin: '40px auto', textAlign: 'center' }}>
      <h1 className={styles.h1}>Chess Game</h1>

      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
      />
    </div>
  );
}
