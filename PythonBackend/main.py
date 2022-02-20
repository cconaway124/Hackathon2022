import sql3_db as db
from flask import request, Flask, jsonify

app = Flask(__name__)


def createUsersTable():
    try:
        db.createUsersTable()
    except:
        print("Error creating user table")


def createPostTable():
    try:
        db.createPostTable()
    except:
        print("Error creating post database")


@app.get("/ping")
def ping():
    return "Successful ping!"


@app.post("/user")
def createUser():
    user = request.get_json()
    userID = db.createUser(user["first"], user["last"],
                           user["email"], user["password"])
    return {
        "userID": userID
    }


@app.get("/users")
def getUsersByID():
    return jsonify(db.getUsers())


@app.get("/user/<userID>")
def getUserByID(userID):
    return db.getUserByID(userID)


@app.post("/post")
def createPost():
    post = request.get_json()
    createdPost = db.createPost(post["posterID"], post["postID"], post["title"],
                                post["description"], post["postertag"], post["lookingfortag"])
    return {
        "postID": createdPost
    }


@app.get("/post/<postID>")
def getPost(postID):
    return db.getPost(postID)


@app.get("/allReplies/<postID>")
def getRepliesByPost(postID):
    return jsonify(db.getRepliesByPost(postID))


@app.get("/allPosts/<userID>")
def getPostsByUserID(userID):
    return jsonify(db.getPostsByUserID(userID))


@app.get("/allPosts")
def getAllPosts():
    return jsonify(db.getAllPosts())


if __name__ == "__main__":
    from waitress import serve
    db.openDB("looking4.db")
    serve(app, host="0.0.0.0", port=8080)
    db.closeDB()
