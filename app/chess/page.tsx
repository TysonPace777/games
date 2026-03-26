'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import styles from '../app.module.css';

export default function ChessPage() {
  const [playerColor, setPlayerColor] = useState<'w' | 'b'>('w');
  const [difficulty, setDifficulty] = useState(10);
  const [game, setGame] = useState<Chess>(new Chess());
  const [isThinking, setIsThinking] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const [pendingPromotion, setPendingPromotion] = useState<{
    from: string;
    to: string;
  } | null>(null);

  const engineRef = useRef<Worker | null>(null);
  const isPlayerTurn = game.turn() === playerColor;

  function getRandomColor(): 'w' | 'b' {
    return Math.random() > 0.5 ? 'w' : 'b';
  }

  function startGame(color: 'w' | 'b' | 'random') {
    const chosenColor: 'w' | 'b' = color === 'random' ? getRandomColor() : color;
    engineRef.current?.postMessage('stop');
    engineRef.current?.postMessage('isready');
    setIsThinking(false);
    setEngineReady(false);
    setPlayerColor(chosenColor);
    setGame(new Chess());
  }

  useEffect(() => {
    engineRef.current = new Worker('/stockfish/stockfish-18.js', { type: 'module' });

    engineRef.current.onmessage = (event: MessageEvent) => {
      const line = event.data;
      if (typeof line !== 'string') return;

      if (line === 'readyok') {
        setEngineReady(true);
      }

      if (line.startsWith('bestmove')) {
        setIsThinking(false);
        const move = line.split(' ')[1];
        if (move === '(none)') return;

        setGame((prev) => {
          const newGame = new Chess(prev.fen());
          newGame.move({ from: move.substring(0, 2), to: move.substring(2, 4), promotion: 'q' });
          return newGame;
        });
      }
    };

    engineRef.current.postMessage('uci');
    engineRef.current.postMessage('isready');

    return () => engineRef.current?.terminate();
  }, []);

  function makeMove(move: { from: string; to: string; promotion?: string }): boolean {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    if (result) {
      setGame(gameCopy);
      return true;
    }
    return false;
  }

  const makeAIMove = useCallback((currentGame: Chess) => {
    setIsThinking(true);
    engineRef.current?.postMessage(`position fen ${currentGame.fen()}`);
    engineRef.current?.postMessage(`go depth ${difficulty}`);
  }, [difficulty]);

  useEffect(() => {
    if (!isPlayerTurn && !game.isGameOver() && !isThinking && engineReady) {
      const timeout = setTimeout(() => {
        makeAIMove(game);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [game, playerColor, isThinking, isPlayerTurn, makeAIMove, engineReady]);

  function onDrop(sourceSquare: string, targetSquare: string): boolean {
    if (game.isGameOver()) return false;
    if (!isPlayerTurn) return false;

    const piece = game.get(sourceSquare as Square);
    const isPromotion =
      piece?.type === 'p' &&
      ((piece.color === 'w' && targetSquare[1] === '8') ||
        (piece.color === 'b' && targetSquare[1] === '1'));

    if (isPromotion) {
      setPendingPromotion({ from: sourceSquare, to: targetSquare });
      return false;
    }

    return makeMove({ from: sourceSquare, to: targetSquare, promotion: 'q' });
  }

  function handlePromotion(piece: 'q' | 'r' | 'b' | 'n') {
    if (!pendingPromotion) return;
    makeMove({ ...pendingPromotion, promotion: piece });
    setPendingPromotion(null);
  }

  return (
    <div style={{ width: '400px', margin: '40px auto', textAlign: 'center', position: 'relative' }}>

      <h1 className={styles.h1}>Chess Game</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>Difficulty: </label>
        <select value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
          <option value={5}>Easy</option>
          <option value={10}>Medium</option>
          <option value={15}>Hard</option>
          <option value={20}>Very Hard</option>
        </select>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        <label>Play as: </label>
        <button
          onClick={() => startGame('w')}
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '1px solid #aaaaaa',
            padding: '6px 14px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          White
        </button>
        <button
          onClick={() => startGame('b')}
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            border: '1px solid #aaaaaa',
            padding: '6px 14px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Black
        </button>
        <button
          onClick={() => startGame('random')}
          style={{
            background: 'linear-gradient(to right, #ffffff 50%, #000000 50%)',
            color: 'transparent',
            border: '1px solid #aaaaaa',
            padding: '6px 14px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 500,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span style={{ color: '#000', position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }}>?</span>
          <span style={{ color: '#fff', position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}>?</span>
          <span style={{ visibility: 'hidden' }}>Random</span>
        </button>
      </div>

      {pendingPromotion && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          border: '1px solid #aaaaaa',
          borderRadius: '8px',
          padding: '16px 24px',
          zIndex: 100,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          textAlign: 'center',
        }}>
          <div style={{ marginBottom: '12px', fontWeight: 600 }}>Promote pawn to:</div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {(['q', 'r', 'b', 'n'] as const).map((piece) => (
              <button
                key={piece}
                onClick={() => handlePromotion(piece)}
                style={{
                  fontSize: '28px',
                  background: 'none',
                  border: '1px solid #aaaaaa',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                {playerColor === 'w'
                  ? { q: '♛', r: '♜', b: '♝', n: '♞' }[piece]
                  : { q: '♕', r: '♖', b: '♗', n: '♘' }[piece]}
              </button>
            ))}
          </div>
        </div>
      )}

      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        boardOrientation={playerColor === 'w' ? 'white' : 'black'}
      />
    </div>
  );
}