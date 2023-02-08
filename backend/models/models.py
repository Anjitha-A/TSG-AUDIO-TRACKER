# create a class Category which have the details of categories of songs
class Category:
    def __init__(self, id: str, category: str):
        self.id = id
        self.category = category
# creating a class Audio which have all the audio details
class Audio:
    def __init__(self, trackid: str, title: str, artist: str, category_id: int, album: str):
        self.trackid = trackid
        self.title = title
        self.artist = artist
        self.category_id = category_id
        self.album = album
       
# create role class
class Role:
    def __init__(self, id: str, role: str):
        self.id = id
        self.role = role
#create user class
class User:
    def __init__(self, id:str, fullname:str, username:str, password:str, usertype: str):
        self.id = id
        self.fullname = fullname
        self.username = username
        self.password = password
        self.usertype = usertype
# create class for ratings
class Rating :
    def __init__(self, rateid:str, userid:str, trackid:str, rating:str):
        self.rateid = rateid
        self.userid = userid
        self.trackid = trackid
        self.rating = rating

        
