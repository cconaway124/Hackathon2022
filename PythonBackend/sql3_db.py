import sqlite3 as sql3

def openDB(filename):
    global conn
    global c
    conn = sql3.connect(filename)
    c = conn.cursor()
    if ("SELECT name FROM sqlite_master WHERE type='table' AND name='users'" == 0):
        createUsersTable()


def closeDB():
    conn.close()

def createUser(first, last, email, password):
    userID = c.execute("INSERT INTO userTable(first, last, email, password) VALUES (?, ?, ?, ?)", (first, last, email, password))
    conn.commit()
    return userID

def createUsersTable():
    c.execute("""CREATE TABLE userTable (
                first text,
                last text,
                email text,
                password text,
                userID integer primary key
                )""")

def createPostTable():
    c.execute("""CREATE TABLE postTable (
                 posterID integer,
                 postID integer primary key,
                 title text,
                 description text,
                 postertag text,
                 lookingfortag text,
                 replyingToID integer,
                 foreign key (replyingToID) references postTable(postID),
                 foreign key (posterID) references userTable(userID)
                 )""" )

#c.execute("INSERT INTO users VALUES ('Chase', 'Conaway', 'chase.conaway@wsu.edu', '1234')")
def getUser(email):
    return c.execute("SELECT * FROM userTable WHERE email='?'", (email,))

def getUserByID(userID):
    return c.execute("SELECT * FROM userTable WHERE userID='?'", (userID,))

def getPost(postID):
    return c.execute("SELECT * FROM postTable WHERE postID='?'", (postID,))

def createPost(posterID, postID, title, description, postertag, lookingfortag):
    postID = c.execute("INSERT INTO postTable(posterID, title, description, postertag, lookingfortag, replyingToID) VALUES (?, ?, ?, ?, ?, ?)",
                (posterID, title, description, postertag, lookingfortag, replyingToID))
    conn.commit()
    return postID
