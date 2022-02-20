import sql3_db as db
from flask import request, Flask

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
    pass


@app.post("/user")
def createUser():
    user = request.get_json()
    userID = db.createUser(user["first"], user["last"],
                           user["email"], user["password"])
    return userID


@app.get("/user/<userID>")
def getUserByID(userID):
    return db.getUserByID(userID)


@app.post("/post")
def createPost():
    post = request.get_json()
    return db.createPost(post["posterID"], post["postID"], post["title"], post["description"], post["postertag"], post["lookingfortag"])


@app.get("/post/<postID>")
def getPost(postID):
    return db.getPost(postID)


@app.get("/allReplies/<postID>")
def getRelpiesByPost(postID):
    return db.getRelpiesByPost(postID)


@app.get("/allPosts/<userID>")
def getPostsByUserID(userID):
    return db.getPostsByUserID(userID)


@app.get("/allPosts")
def getAllPosts():
    return db.getAllPosts()


if __name__ == "__main__":
    from waitress import serve
    db.openDB("looking4.db")
    createUsersTable()
    createPostTable()
    serve(app, host="0.0.0.0", port=8080)
    db.closeDB()
