from flask import Blueprint, request, jsonify, render_template_string
from flask import Flask, Blueprint, request, jsonify
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs


bptest = Blueprint('bptest', __name__)

@bptest.route('/')
def hello():
    return "<h1>Hello from test.</h1>"

@bptest.route('/hi')
def hi():
    return "<h1>Hi from test.</h1>"

@bptest.route("/chat", methods=['GET', 'POST'])
def chat():
    return render_template_string('''
    <!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <title>TryFlask</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.2/socket.io.js" integrity="sha512-VJ6+sp2E5rFQk05caiXXzQd1wBABpjEj1r5kMiLmGAAgwPItw1YpqsCCBtq8Yr1x6C49/mTpRdXtq8O2RcZhlQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js" integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

</head>

<body>

    <script type="text/javascript">


        $(document).ready(function() {

            var socket = io.connect("https://abcdavid-knguyen.ddns.net:30001");

            socket.on('connect', function() {
                socket.send('User connected!');
            });

            socket.on('message', function(data) {
                console.log(data);
                $('#messages').append($('<p>').text(data));
            });

            $('#send').click(function() {
                socket.send($('#username').val() + ': ' + $('#message').val());
                
                $('#message').val('');
                
            });
        });
    </script>

    <div id="messages">

    </div>
    <input type="text" id="username" placeholder="Username" />
    <input type="text" id="message" placeholder="Message" />
    <button id="send">Send</button>
</body>
    ''')
    

@bptest.route('/addstatus', methods=['GET', 'POST'])
def addpoststatus():
    Session = new_Scoped_session()
    try:
      info = request.get_json()
      new_status = dbm.PostStatus(
        Status = info['status'],
        Information = info['info'],
        ID_Post = info['post']
      )
      Session.add(new_status)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": new_status.ID})
   
    except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})