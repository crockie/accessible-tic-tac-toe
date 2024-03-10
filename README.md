# Accessible Tic-Tac-Toe

This is a simple tic-tac-toe game that is accessible to people with visual impairments. It is built with Next.js and uses ARIA attributes to make it accessible to screen readers. The backend is built with FastAPI and uses WebSockets to communicate with the frontend.

## 1. How to run

### 1.1 With Docker

#### 1.1.1 Prerequisites

- Docker

#### 1.1.2 Steps

1. Run `docker-compose up --build` in the root directory of the project
2. Navigate to `http://localhost:3000` in your browser
3. In another browser window, navigate to `http://localhost:3000` and start playing!

### 1.2 Without Docker

#### 1.2.1 Prerequisites

- Node.js 20
- Python 3.11

#### 1.2.2 Steps

1. Run `npm install` in the `frontend` directory
2. Run `npm run dev` in the `frontend` directory
3. Create a virtual environment with `python -m venv <path to virtual environment>` [optional]
4. Change to the `backend` directory
5. Run `pip install -r requirements.txt`
6. Run `./run-dev.sh` to start the backend
7. Navigate to `http://localhost:3000` in your browser
8. In another browser window, navigate to `http://localhost:3000` and start playing!

## 2. Accessibility Features

1. The game is fully navigable using the keyboard.
2. The game has high contrast colors to make it easier to see.
3. The game has an announcer that tells the user the board state and whose turn it is.

## 3. Assummptions

1. User do not need to login to play the game.
2. User do not need play again functionality.
3. User enters correct game id to join the game.

## 4. Future Improvement

1. Adding view game history functionality.
2. Adding login functionality.
3. Adding play again functionality.

## 5. References

1. [Contrast Checker](https://webaim.org/resources/contrastchecker/)
2. [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
3. [Accessibility inspiration](https://savvasstephanides.hashnode.dev/lets-create-an-accessible-tic-tac-toe-game)
