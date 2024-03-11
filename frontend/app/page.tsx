"use client";
import React, { useState, useEffect } from "react";
import DialogButton from "./components/DialogButton";
import { generateGameID } from "./utils/gamelogic";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";

import {
  Button,
  Dialog,
  ModalOverlay,
  Modal,
  TextField,
  Label,
  Input,
  Heading,
  DialogTrigger,
} from "react-aria-components";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  join_game: (gameId: string, playerName: string) => void;
}

export default function Home() {
  const [gameId, setGameId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isGameFull, setIsGameFull] = useState(false);
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  const router = useRouter();

  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      autoConnect: false,
    });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on("game_full", () => {
      setIsGameFull(true);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleGenerateGameID = () => {
    const id = generateGameID();
    setGameId(id);
  };

  const generateAndJoinGame = () => {
    if (!gameId) {
      alert("Please enter a valid game ID first!");
      return;
    }
    if (!playerName) {
      alert("Please enter your name!");
      return;
    }
    if (isGameFull) {
      alert("Game room is full! Please try creating a new game.");
      return;
    }
    socket?.emit("join_game", gameId, playerName);
    localStorage.setItem("playerName", playerName);
    if (!isGameFull) {
      router.push(`/game/${gameId}`);
    }
  };

  return (
    <main>
      <div className="flex flex-col space-y-3 m-5 items-center">
        <h1 className="text-2xl text-center p-10 font-semibold">
          Welcome to Tic-Tac-Toe
        </h1>
        <DialogTrigger>
          <Button
            className="btn btn-secondary w-48"
            onPress={handleGenerateGameID}
          >
            Create Game
          </Button>
          <ModalOverlay className="fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur">
            <Modal
              aria-labelledby="dialogTitle"
              aria-describedby="dialogDescription"
              className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl"
            >
              <Dialog className="flex justify-center backdrop-blur text-center">
                {({ close }) => (
                  <form>
                    <Heading
                      id="dialogTitle"
                      slot="title"
                      className="text-2xl font-semibold leading-6 my-0 text-slate-700"
                      aria-hidden="true"
                    >
                      Create Game
                    </Heading>
                    <TextField className="space-x-5 m-5">
                      <Label htmlFor="playerName" className="text-lg">
                        Name
                      </Label>
                      <Input
                        id="playerName"
                        aria-required
                        className="text-lg text-pretty p-2"
                        placeholder="Enter your name here"
                        onChange={(e) => setPlayerName(e.target.value)}
                      />
                    </TextField>
                    <section
                      id="dialogDescription"
                      aria-labelledby="gameIdHeading"
                    >
                      <h2 id="gameIdHeading" className="text-lg mt-5">
                        Share this Game ID with your friend:
                      </h2>
                      <p id="gameId" className="text-lg text-center font-bold">
                        {gameId}
                      </p>
                    </section>
                    <div className="mt-6 flex justify-end gap-2">
                      <DialogButton
                        className="bg-slate-200 text-slate-800 hover:border-slate-300 pressed:bg-slate-300"
                        onPress={() => {
                          close();
                          setGameId("");
                          setPlayerName("");
                        }}
                      >
                        Cancel
                      </DialogButton>
                      <DialogButton
                        onPress={generateAndJoinGame}
                        className="bg-green-500 text-white hover:border-green-600 pressed:bg-green-600"
                      >
                        Start
                      </DialogButton>
                    </div>
                  </form>
                )}
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
        <DialogTrigger>
          <Button className="btn btn-secondary w-48">Join Game</Button>
          <ModalOverlay className="fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur">
            <Modal
              aria-labelledby="dialogTitle"
              aria-describedby="dialogDescription"
              className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl"
            >
              <Dialog className="flex justify-center backdrop-blur text-center">
                {({ close }) => (
                  <form>
                    <Heading
                      id="dialogTitle"
                      slot="title"
                      className="text-2xl font-semibold leading-6 my-0 text-slate-700"
                    >
                      Join Game
                    </Heading>
                    <TextField className="space-x-5 m-5">
                      <Label htmlFor="playerName" className="text-lg">
                        Name
                      </Label>
                      <Input
                        id="playerName"
                        aria-required
                        className="text-lg text-pretty p-2"
                        placeholder="Enter your name here"
                        onChange={(e) => setPlayerName(e.target.value)}
                      />
                    </TextField>
                    <TextField className="space-x-5 m-5">
                      <Label htmlFor="gameId" className="text-lg">
                        Game ID
                      </Label>
                      <Input
                        id="gameId"
                        aria-required
                        className="text-lg text-pretty p-2"
                        placeholder="Enter game ID here"
                        onChange={(e) => setGameId(e.target.value)}
                      />
                    </TextField>
                    <div className="mt-6 flex justify-end gap-2">
                      <DialogButton
                        className="bg-slate-200 text-slate-800 hover:border-slate-300 pressed:bg-slate-300"
                        onPress={() => {
                          close();
                          setGameId("");
                          setPlayerName("");
                        }}
                      >
                        Cancel
                      </DialogButton>
                      <DialogButton
                        onPress={generateAndJoinGame}
                        className="bg-green-500 text-white hover:border-green-600 pressed:bg-green-600"
                      >
                        Start
                      </DialogButton>
                    </div>
                  </form>
                )}
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
      </div>
    </main>
  );
}
