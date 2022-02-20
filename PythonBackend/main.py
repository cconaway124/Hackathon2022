from flask import request, jsonify, Flask

app = Flask(__name__)


@app.get("/post")
def get_posts():
    print("These are posts")
    print(request)
    return "<p>Hello, World!</p>"


@app.post("/post")
def post_post():
    print("Post post")
    requestJson = request.get_json()
    name = requestJson["name"]
    return jsonify({
        "response": f"Hi {name}!"
    })
