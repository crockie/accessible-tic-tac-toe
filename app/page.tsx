"use client";

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import DialogButton from "./components/DialogButton";
import { generateGameID } from "./utils/gamelogic";

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

export default function Home() {
  const [gameId, setGameId] = useState("");

  const generateGameId = () => {
    // Generate a unique game ID here
    const newGameId = generateGameID();
    setGameId(newGameId);
  };

  const navigateToGame = () => {
    if (gameId) {
      // Navigate to the game page with the generated game ID
      window.location.href = `/game/${gameId}`;
    }
  };

  return (
    <main>
      <NavBar />
      <div className="flex flex-col space-y-3 m-5 items-center">
        <h1 className="text-2xl text-center p-10">Welcome to Tic-Tac-Toe</h1>
        <DialogTrigger>
          <Button className="btn btn-secondary w-48" onPress={generateGameId}>
            Start Game
          </Button>
          <ModalOverlay className="fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur">
            <Modal className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
              <Dialog className="flex justify-center backdrop-blur text-center">
                {({ close }) => (
                  <form>
                    <Heading
                      slot="title"
                      className="text-2xl font-semibold leading-6 my-0 text-slate-700"
                      aria-hidden="true"
                    >
                      Start Game
                    </Heading>
                    <TextField autoFocus className="space-x-5 m-5">
                      <Label className="text-lg">Name</Label>
                      <Input
                        className="text-lg text-pretty"
                        placeholder="Enter your name here"
                      />
                    </TextField>
                    <div className="mt-6 flex justify-end gap-2">
                      <DialogButton
                        className="bg-slate-200 text-slate-800 hover:border-slate-300 pressed:bg-slate-300"
                        onPress={close}
                      >
                        Cancel
                      </DialogButton>
                      <DialogButton
                        onPress={() => {
                          close();
                          navigateToGame();
                        }}
                        className="bg-green-500 text-white hover:border-green-600 pressed:bg-green-600"
                      >
                        Submit
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
            <Modal className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
              <Dialog className="flex justify-center backdrop-blur text-center">
                {({ close }) => (
                  <form>
                    <Heading
                      slot="title"
                      className="text-2xl font-semibold leading-6 my-0 text-slate-700"
                    >
                      Join Game
                    </Heading>
                    <TextField autoFocus className="space-x-5 m-5">
                      <Label className="text-lg">Name</Label>
                      <Input
                        className="text-lg text-pretty"
                        placeholder="Enter your name here"
                      />
                    </TextField>
                    <TextField autoFocus className="space-x-5 m-5">
                      <Label className="text-lg">Game</Label>
                      <Input
                        className="text-lg text-pretty"
                        placeholder="Enter game ID here"
                      />
                    </TextField>
                    <div className="mt-6 flex justify-end gap-2">
                      <DialogButton
                        className="bg-slate-200 text-slate-800 hover:border-slate-300 pressed:bg-slate-300"
                        onPress={close}
                      >
                        Cancel
                      </DialogButton>
                      <DialogButton
                        onPress={close}
                        className="bg-green-500 text-white hover:border-green-600 pressed:bg-green-600"
                      >
                        Submit
                      </DialogButton>
                    </div>
                  </form>
                )}
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
        <Button className="btn btn-secondary w-48">View History</Button>
      </div>
    </main>
  );
}
