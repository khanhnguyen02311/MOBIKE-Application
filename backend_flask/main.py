from components import Socketio, App

# App = create_app()

if __name__ == "__main__":
    # App.run(debug=True)
    Socketio.run(App, debug=True)

@Socketio.on('connect')
def handle_message(message):
    print('received message: ' + message)
    if message != 'User connected!':
        Socketio.send(message, broadcast=True)