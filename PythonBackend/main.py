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


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
