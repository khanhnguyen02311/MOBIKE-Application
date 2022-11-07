import components as cpn
import socket

isDebug = True
serverIP = ""
serverPort = 3000

# Set the server IP address and port
if isDebug:
    # Get the hostname, IP Address from socket and set FLASK server variables
    hostname = socket.gethostname()
    serverIP = socket.gethostbyname(hostname)
    

if __name__ == "__main__":
    #app.run(debug=True, ssl_context='adhoc')
    #print("Server IP: {}\t Port: {}".format(serverIP, serverPort))
    cpn.App.run(host = serverIP, port = serverPort, debug=isDebug)