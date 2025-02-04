from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model): #hacer GET users , GET PUT DELETE user
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return { "id": self.id,
                 "email": self.email,
                 "is_active": self.is_active,
                 "first_name": self.first_name,
                 "last_name": self.last_name}
    
#Instagram
class Posts(db.Model): #hacer CRUD
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=True)
    description = db.Column(db.String(120), unique=False, nullable=True)
    body = db.Column(db.String(), unique=False, nullable=True)
    date = db.Column(db.DateTime, unique=False, nullable=False, default=datetime.utcnow) 
    image_url = db.Column(db.String(), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users' , foreign_keys=[user_id], backref=db.backref('posts_to'), lazy='select')

    def __repr__(self):
        return f'<Post: {self.id} - {self.title}>'
    
    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'body': self.body,
                'date': self.date,
                'image_url': self.image_url,
                'user_id': self.user_id}



class Comments(db.Model): #hacer CRUD
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users' , foreign_keys=[user_id], backref=db.backref('comments'), lazy='select')
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts' , foreign_keys=[post_id], backref=db.backref('comments'), lazy='select')

    def __repr__(self):
        return f'<Comments: {self.id} - {self.title}>'

    def serialize(self):
            return {
                'id': self.id,
                'body': self.body,
                'user_id': self.user_id,
                'post_id': self.post_id}


class Followers(db.Model): #hacer CRUD
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('followers_to', lazy='select'))
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('followings_to', lazy='select'))

    def __repr__(self):
        return f'following: {self.following_id} - follower: {self.follower_id}'  
    
    def serialize(self):
        return {
            'id': self.id,
            'follower_id': self.follower_id,
            'following_id': self.following_id} 


class Medias(db.Model): #hacer CRUD
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum('video' , 'image' , 'podcast' , name= 'media_type'), unique=False, nullable=False)
    url = db.Column(db.String(), unique=False, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts' , foreign_keys=[post_id], backref=db.backref('medias_to'), lazy='select')

    def __repr__(self):
        return f'<Medias: {self.id} - {self.title}>'

    def serialize(self):
        return {'id': self.id,
                'media_type': self.media_type,
                'url': self.url,
                'post_id': self.post_id}


#Star wars
class Characters(db.Model): #hacer GET
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    heigth = db.Column(db.String(), unique=False, nullable=True)
    mass = db.Column(db.String(), unique=False, nullable=True)
    hair_color = db.Column(db.String(), unique=False, nullable=True)
    skin_color = db.Column(db.String(), unique=False, nullable=True)
    eye_color = db.Column(db.String(), unique=False, nullable=True)
    birth_year = db.Column(db.String(), unique=False, nullable=True)
    gender = db.Column(db.String(), unique=False, nullable=True)


class CharacterFavorites(db.Model): #hacer CRUD
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('user_to', lazy='select'))
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    character_to = db.relationship('Characters', foreign_keys=[character_id], backref=db.backref('character_to', lazy='select'))


class Planets(db.Model): #hacer GET
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    diameter = db.Column(db.String(), unique=False, nullable=True)
    rotation_period = db.Column(db.String(), unique=False, nullable=True)
    orbital_period = db.Column(db.String(), unique=False, nullable=True)
    gavity = db.Column(db.String(), unique=False, nullable=True)
    population = db.Column(db.String(), unique=False, nullable=True)
    climate = db.Column(db.String(), unique=False, nullable=True)
    terrain = db.Column(db.String(), unique=False, nullable=True)

    
class PlanetFavorites(db.Model): #hacer CRUD
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('planet_favorites', lazy='select'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
    planet_to = db.relationship('Planets', foreign_keys=[planet_id], backref=db.backref('planet_to', lazy='select'))