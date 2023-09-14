from components import create_app

App = create_app()

if __name__ == "__main__":
    print(App.url_map)
    App.run(host='0.0.0.0', port=10000, debug=False, threaded=True)