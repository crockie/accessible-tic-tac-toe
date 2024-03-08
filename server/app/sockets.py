import socketio

sio = socketio.AsyncServer(async_mode="asgi")
sio_app = socketio.ASGIApp(sio)

games = {}


@sio.event
def handle_join_game(game_id: str, player_name: str):
    """
    This function handles the joining of a game
    @param game_id: The id of the game
    @param player_name: The name of the player
    """
    if game_id not in games:
        games[game_id] = {
            "players": {"x": None, "o": None},
            "moves": [],
        }
    if len(games[game_id]["players"]) >= 2:
        sio.emit("game_full")
        return

    if games[game_id]["players"]["x"] is None:
        games[game_id]["players"]["x"] = player_name
    else:
        games[game_id]["players"]["o"] = player_name
    sio.enter_room(sio.sid, game_id)
    if len(games[game_id]["players"]) == 2:
        sio.emit("game_start", room=game_id)


@sio.event
def handle_move(game_id: str, move: (str, int, int)):
    """
    This function handles the move of a player in a game
    @param game_id: The id of the game
    @param move: The move of the player (symbol, board_index, move_number)
    """
    games[game_id]["moves"].append(move)
    sio.emit("game_move", move, room=game_id)


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
