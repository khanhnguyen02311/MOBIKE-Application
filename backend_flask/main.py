from components import Socketio, App

# App = create_app()

if __name__ == "__main__":
    # App.run(debug=True)
    Socketio.run(App, debug=True)

