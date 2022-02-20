import sqlite3 as sql3


def openDB(filename):
    conn = sql3.connect(filename)
    c = conn.cursor()
    if ("SELECT name FROM sqlite_master WHERE type='table' AND name='users'" == 0):
        createUsersTable()
    c.close()


def closeDB():
    conn.close()


def createUser(first, last, email, password) -> int:
    c = conn.cursor()
    userID = c.execute(
        "INSERT INTO userTable(first, last, email, password) VALUES (?, ?, ?, ?)", (first, last, email, password))
    conn.commit()
    c.close()
    return userID.lastrowid


def createUsersTable():
    c = conn.cursor()
    c.execute("""CREATE TABLE userTable (
                first text,
                last text,
                email text unique,
                password text,
                userID integer primary key
                )""")
    c.close()


def createPostTable():
    c = conn.cursor()
    c.execute("""CREATE TABLE postTable (
                 posterID integer,
                 postID integer primary key,
                 title text,
                 description text,
                 posterRoles text,
                 lookingforRoles text,
                 replyingToID integer,
                 timestamp integer,
                 foreign key (replyingToID) references postTable(postID),
                 foreign key (posterID) references userTable(userID)
                 )""")
    c.close()

#c.execute("INSERT INTO users VALUES ('Chase', 'Conaway', 'chase.conaway@wsu.edu', '1234')")


def getUser(email):
    c = conn.cursor()
    user = c.execute("SELECT * FROM userTable WHERE email='?'", (email,)).fetchone()
    c.close()
    return user


def getUserByID(userID):
    c = conn.cursor()
    user = c.execute("SELECT * FROM userTable WHERE userID='?'", (userID,)).fetchone()
    c.close()
    return user

def getUsersByFirst(first):
    c = conn.cursor()
    user = c.execute("SELECT * FROM userTable WHERE first='?'", (first,)).fetchall()
    c.close()
    return user
def getUsersByLast(last):
    c = conn.cursor()
    user = c.execute("SELECT * FROM userTable WHERE last='?'", (last,)).fetchall()
    c.close()
    return user

def getPost(postID):
    c = conn.cursor()
    post = c.execute("SELECT * FROM postTable WHERE postID='?'", (postID,)).fetchone()
    c.close()
    return post


def createPost(posterID, postID, title, description, posterRoles, lookingforRoles, replyingToID) -> int:
    c = conn.cursor()
    postID = c.execute("INSERT INTO postTable(posterID, title, description, posterRoles, lookingforRoles, replyingToID) VALUES (?, ?, ?, ?, ?, ?)",
                       (posterID, title, description, posterRoles, lookingforRoles, replyingToID))
    conn.commit()
    c.close()
    return postID.lastrowid

def getPostsByUserID(userID):
    c = conn.cursor()
    post_by_user_id = c.execute("SELECT * FROM postTable WHERE posterID='?'", (userID,)).fetchall()
    c.close()
    return post_by_user_id

def getRepliesByPost(replyingToID):
    c = conn.cursor()
    replies = c.execute("SELECT * FROM postTable WHERE postID='?'", (replyingToID,)).fetchall()
    c.close()
    return replies

def getAllPosts():
    c = conn.cursor()
    all_posts = c.execute("SELECT * FROM postTable").fetchall()
    c.close()
    return all_posts

def getPostByPosterRoles(posterRoles):
    c = conn.cursor()
    post_by_poster_role = c.execute("SELECT * FROM postTable WHERE posterRoles='?'", (posterRoles,)).fetchall()
    c.close()
    return post_by_poster_role

def getPostByLookingForRoles(lookingForRoles):
        c = conn.cursor()
        post_by_looking_for_role = c.execute("SELECT * FROM postTable WHERE lookingforRoles='?'", (lookingForRoles,)).fetchall()
        c.close()
        return post_by_poster_role

def getPostByBothRoles(posterRoles, lookingForRoles):
        c = conn.cursor()
        post_by_both_roles = c.execute("SELECT * FROM postTable WHERE posterRoles='?' AND lookingforRoles='?'",
                                      (posterRoles, lookingForRoles,)).fetchall()
        c.close()
        return post_by_both_roles

def getPostByEitherRole(posterRoles, lookingForRoles):
        c = conn.cursor()
        post_by_either_role = c.execute("SELECT * FROM postTable WHERE posterRoles='?' OR lookingforRoles='?'",
                                       (posterRoles, lookingForRoles,)).fetchall()
        c.close()
        return post_by_either_role

def getPostByTitle(title):
        c = conn.cursor()
        post_by_title = c.execute("SELECT * FROM postTable WHERE title='?'", (title,)).fetchall()
        c.close()
        return post_by_title
