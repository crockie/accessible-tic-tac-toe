"use client";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Board from "../../components/Board";
import Announcer from "../../components/Announcer";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  game_start: (data: {
    player1: string;
    player2: string;
    symbol1: "X" | "O";
    symbol2: "X" | "O";
  }) => void;
  waiting_for_opponent: () => void;
  game_update: (data: {
    status: "win" | "draw" | "in game";
    winner: string | null;
    move: {
      symbol: "X" | "O";
      index: number;
    } | null;
    next_turn: string | null;
  }) => void;
}

interface ClientToServerEvents {
  in_game: (gameId: string, playerName: string) => void;
  handle_move: (data: {
    game_id: string;
    symbol: string;
    board_index: number;
  }) => void;
}

export default function GamePage({ params }: { params: { gameId: string } }) {
  const [board, setBoard] = useState({ squares: Array(9).fill(null) });
  const gameId = params.gameId;
  const [playerName, setPlayerName] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O" | null>(null);
  const [opponentName, setOpponentName] = useState("");
  const [opponentSymbol, setOpponentSymbol] = useState<"X" | "O" | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [opponentJoined, setOpponentJoined] = useState(false);

  const [gameStatus, setGameStatus] = useState<
    "win" | "draw" | "in game" | null
  >(null);

  const [winner, setWinner] = useState<string | null>(null);

  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  // mount socket on component mount
  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      autoConnect: false,
    });
    newSocket.connect();
    setSocket(newSocket);
    setPlayerName(localStorage.getItem("playerName") || "");

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (playerName !== "") {
      socket?.emit("in_game", gameId, playerName);
    }

    socket?.on("game_start", (data) => {
      const { player1, player2, symbol1, symbol2 } = data;

      setOpponentJoined(true);

      if (playerName === player1) {
        setPlayerSymbol(symbol1);
        setOpponentName(player2);
        setOpponentSymbol(symbol2);
        setIsPlayerTurn(true);
      } else {
        setPlayerSymbol(symbol2);
        setOpponentName(player1);
        setOpponentSymbol(symbol1);
      }
    });

    socket?.on("game_update", (data) => {
      const { status, winner, move, next_turn } = data;

      if (move) {
        setBoard((prevBoard) => {
          const updatedSquares = [...prevBoard.squares];
          updatedSquares[move.index] = move.symbol;
          return { squares: updatedSquares };
        });
      }
      if (status === "win") {
        setGameStatus("win");
        if (winner === playerSymbol) {
          setWinner(playerName);
        } else if (winner === opponentSymbol) {
          setWinner(opponentName);
        }
      }
      if (status === "draw") {
        setGameStatus("draw");
        alert("It is a draw!");
      }

      if (next_turn === playerSymbol) {
        setIsPlayerTurn(true);
      }
    });

    return () => {
      socket?.off("game_start");
      socket?.off("waiting_for_opponent");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, gameId, playerName, playerSymbol]);

  const handleClick = (i: number) => {
    // if no symbol or not player's turn, return
    if (!playerSymbol || !isPlayerTurn) return;

    const squares = [...board.squares];

    if (squares[i]) {
      return;
    }

    squares[i] = playerSymbol;
    setIsPlayerTurn(false);

    setBoard({ squares });

    socket?.emit("handle_move", {
      game_id: gameId,
      symbol: playerSymbol,
      board_index: i,
    });
  };

  return (
    <main aria-label="Game Page">
      <Announcer squares={board.squares} />
      <div className="flex flex-col items-center p-10 text-center text-lg">
        <div className="mb-8">
          <div className="mb-3">
            <span className="font-semibold">Game ID: </span>
            <span>{gameId}</span>
          </div>
          <div role="status" aria-live="polite">
            <div>
              <span className="font-semibold">Player:</span>{" "}
              <span className="mr-2">{playerName}</span>
              <span className="font-semibold">{playerSymbol}</span>
            </div>
            <div>
              <span className="font-semibold">Opponent:</span>{" "}
              <span className="mr-2">{opponentName}</span>
              <span className="font-semibold">{opponentSymbol}</span>
            </div>

            {opponentJoined && (
              <div className="mt-3">
                {gameStatus === "win" ? (
                  <span className="font-semibold">{winner} wins!</span>
                ) : gameStatus === "draw" ? (
                  <span className="font-semibold">It is a draw!</span>
                ) : (
                  <>
                    <span className="font-semibold">Turn: </span>
                    <span>
                      {isPlayerTurn ? "Your turn" : "Opponent's turn"}
                    </span>
                  </>
                )}
              </div>
            )}
            {!opponentJoined && (
              <div className="mt-3">
                <span className="font-semibold">Waiting for opponent...</span>
              </div>
            )}
          </div>
        </div>
        <Board squares={board.squares} onClick={handleClick} />
      </div>
    </main>
  );
}
