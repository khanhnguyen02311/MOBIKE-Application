from components import Socketio, App

@Socketio.on('connect')
def handle_message(message):
    print('received message: ' + message)
    if message != 'User connected!':
        Socketio.send(message, broadcast=True)