import socketio

sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=[])
sio_app = socketio.ASGIApp(sio)

games = {}


@sio.event
async def join_game(sid: str, game_id: str, player_name: str):
    """
    This function handles the joining of a game
    @param game_id: The id of the game
    @param player_name: The name of the player
    """
    print("join_game: ", sid, game_id, player_name)

    # If game does not exist, create it
    if game_id not in games:
        games[game_id] = {
            "players": {"X": None, "O": None},
            "board": [None] * 9,
        }
    # If game is full, emit game_full event
    if (
        games[game_id]["players"]["X"] is not None
        and games[game_id]["players"]["O"] is not None
    ):
        await sio.emit("game_full")
        return
    # Set player name
    if games[game_id]["players"]["X"] is None:
        games[game_id]["players"]["X"] = player_name
    elif games[game_id]["players"]["O"] is None:
        games[game_id]["players"]["O"] = player_name


@sio.event
async def in_game(sid: str, game_id: str, player_name: str):
    # Join game room
    await sio.enter_room(sid, game_id)
    symbol = "X" if games[game_id]["players"]["X"] == player_name else "O"

    print("join_room: ", sid, game_id, player_name)

    # Emit game_start or waiting_for_opponent event
    if (
        games[game_id]["players"]["X"] is not None
        and games[game_id]["players"]["O"] is not None
    ):
        if symbol == "X":
            opponent_name = games[game_id]["players"]["O"]
        else:
            opponent_name = games[game_id]["players"]["X"]
        await sio.emit(
            "game_start",
            {
                "player1": games[game_id]["players"]["X"],
                "player2": games[game_id]["players"]["O"],
                "symbol1": "X",
                "symbol2": "O",
            },
            room=game_id,
        )
        print("game_start: ", game_id, player_name, opponent_name, game_id)
    else:
        await sio.emit("waiting_for_opponent", room=game_id)


@sio.event
def handle_player_disconnect(game_id: str):
    """
    This function handles the disconnection of a player from a game
    @param game_id: The id of the game
    """
    sio.leave_room(sio.sid, game_id)

    # Store moves and players in database
    # ...

    # Remove game from games
    del games[game_id]


@sio.event
async def handle_move(sid, data):
    game_id = data["game_id"]
    symbol = data["symbol"]
    board_index = data["board_index"]

    print(data)

    if game_id not in games:
        print("game not found")
        return
    game = games[game_id]
    if game["board"][board_index] is not None or symbol not in ["X", "O"]:
        print("invalid move")
        return
    game["board"][board_index] = symbol

    winner = calculate_winner(game["board"])
    if winner:
        await sio.emit(
            "game_update",
            room=game_id,
            data={
                "status": "win",
                "winner": winner,
                "move": {"symbol": symbol, "index": board_index},
            },
        )
        print("winner")
    elif not any(s is None for s in game["board"]):
        await sio.emit(
            "game_update",
            room=game_id,
            data={"status": "draw", "move": {"symbol": symbol, "index": board_index}},
        )
        print("draw")
    else:
        await sio.emit(
            "game_update",
            room=game_id,
            data={
                "status": "in game",
                "move": {"symbol": symbol, "index": board_index},
                "next_turn": "X" if symbol == "O" else "O",
            },
        )
        print("game_update: ", game_id, game["board"])


def calculate_winner(board):
    winning_combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],  # Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],  # Columns
        [0, 4, 8],
        [2, 4, 6],  # Diagonals
    ]
    for combination in winning_combinations:
        if board[combination[0]] == board[combination[1]] == board[combination[2]]:
            return board[combination[0]]

    return None
