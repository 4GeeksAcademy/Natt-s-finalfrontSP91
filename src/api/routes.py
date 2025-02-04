"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Comments, Followers, Medias,Characters,CharacterFavorites,Planets,PlanetFavorites
import requests
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


#Tokens
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = request.json.get("password", None)
    row = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active==True)).scalar()
    if not row:
        response_body['message'] = 'El usuario no exsiste'
        return response_body, 404
    user = row.serialize()
    access_token = create_access_token(identity={'email ': user['email'], 'is active': user['is_active']})
    response_body['access_token'] = access_token
    response_body['message'] = 'User logged'
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body['message'] = f"Logged in as {current_user}"
    return response_body, 200


#Users
@api.route('/users', methods=['GET'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Listado de Usuarios'
        response_body['results'] = result
        return response_body, 200
    
@api.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def user(id):
    response_body = {}
    row = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
    if not row:
        response_body['message'] =  f'El usuario con id: {id} no existe en nuestro registro'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.user_id = data['user_id']
        row.email = data['email']
        row.first_name = data['first_name']
        row.last_name = data['last_name']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200


# CRUD Posts
@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = f'Listado de todas las publicaciones (de todos los usuarios)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Posts(title=data.get('title'),
                    description=data.get('description'),
                    body=data.get('body', 'body por defecto cuando hay un error'),
                    image_url=data['image_url'],
                    user_id=data['user_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'El post ha sido publicado correctamente'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] =  f'La publicación con id: {id} no existe en nuestro registro'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.title = data['title']
        row.description = data['description']
        row.body = data['body']
        row.image_url = data['image_url']
        row.user_id = data['user_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200

# CRUD Posts Comments
@api.route('/comments', methods=['GET'])
def comments():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Comentarios de usuarios'
        response_body['results'] = result
        return response_body, 200

@api.route('/comments/<int:id>', methods=['POST', 'PUT', 'DELETE'])
def comment(id):
    response_body = {}
    row = db.session.execute(db.select(Comments).where(Comments.id == id)).scalar()
    if request.method == 'POST':
        data = request.json
        row = Comments(body=data.get('body', 'body por defecto cuando hay un error'),
                    user_id=data['user_id'],
                    post_id=data['post_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'El comentario ha sido publicado correctamente'
        response_body['results'] = row.serialize()
        return response_body, 200 
    if request.method == 'PUT':
        data = request.json
        row.body = data['body']
        row.user_id = data['user_id']
        row.post_id = data['post_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200   


# CRUD Followers
@api.route('/followers', methods=['GET'])
def followers():
 response_body = {}
 if request.method == 'GET':
        rows = db.session.execute(db.select(Followers)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Listado de Usuarios'
        response_body['results'] = result
        return response_body, 200

@api.route('/followers/<int:id>', methods=['GET','POST', 'DELETE'])
def follower(id):
  response_body = {}
  row = db.session.execute(db.select(Followers).where(Followers.id == id)).scalar()
  if not row:
        response_body['message'] =  f'El usuario con id: {id} no existe en nuestro registro'
        return response_body, 400
  if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
  if request.method == 'POST':
     data = request.json
     row = Followers(follower_id=data['follower_id'],
                    following_id=data['following_id'])
     db.session.add(row)
     db.session.commit()
     response_body['message'] = f'Siguiendo al usuario con id: {id}'
     response_body['results'] = row.serialize()
     return response_body, 200
  if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
  
# CRUD Medias
@api.route('/medias', methods=['GET', 'POST'])
def medias():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Medias)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Medias'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Medias(media_type = data.get ('media_type'),
                     url = data.get('url', ''),
                     post_id = data.get('post_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Media creada correctamente'
        response_body['results'] = row.serialize()
        return response_body, 200
    
@api.route('/medias/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def media(id):
    response_body = {}
    row = db.session.execute(db.select(Medias).where(Medias.id == id)).scalar()
    if not row:
        response_body['message'] =  f'el aarchivo multimedia con id: {id} no existe en nuestro registos'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.media_type = data.get('media_type')
        row.body = data.get('body')
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200


# Star Wars
@api.route('/characters', methods=['GET'])
def characters():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Characters)).scalars()
        response_body['message'] = 'Personajes'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200


@api.route('/swapi/characters', methods=['GET'])
def characters_swapi():
    response_body = {}
    url = 'https://swapi.tech/api/people'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Personajes importados de la SWAPI'
        next = data.get('next')
        while True:
            results = data['results']
            for result in results:
                character_response = requests.get(result['url'])
                if character_response.status_code == 200:
                    character_data = character_response.json().get('result').get('properties')
                    character = Characters(
                        id = character_data.get('id'),
                        name = character_data.get('name'),
                        height = character_data.get('height'),
                        mass = character_data.get('mass'),
                        eye_color = character_data.get('eye_color'),
                        hair_color = character_data.get('hair_color'),
                        skin_color = character_data.get('skin_color'),
                        birth_year = character_data.get('birth_year'),
                        gender = character_data.get('gender'))
                    db.session.add(character)
                else:
                    response_body['message'] = 'error al importar al personaje desde swapi'
                    db.session.rollback()
            if next is None:
                    break
            else:
                next_response = requests.get(next)
                data = next_response.json()
                next = data.get('next')
        db.session.commit()
        return response_body, 200
    return response_body, 400   


@api.route('/character-favorites', methods=['GET', 'POST'])
def character_favorites():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CharacterFavorites)).scalars()
        response_body['message'] = 'tus personajes favoritos'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        character_favorite = CharacterFavorites(
            user_id = data.get('user_id'),
            character_id = data.get('character_id')
        )
        db.session.add(character_favorite)
        db.session.commit()
        response_body['message'] = 'Personaje favorito creado correctamente'
        response_body['results'] = character_favorite.serialize()
        return response_body, 200


@api.route('/character-favorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def character_favorite(id):
    response_body = {}
    row = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.id == id)).scalar()
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Registro con id: {id}'
        return response_body, 200
    if not row:
        response_body['message'] =  f'El registro con id: {id} no existe'
        return response_body, 400
    if request.method == 'PUT':
        data = request.json
        row.user_id = data.get('user_id')
        row.character_id = data.get('character_id')
        db.session.commit()
        response_body['message'] = f'Actualizado el registro con id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Eliminado el registro con id: {id}'
        return response_body, 200


@api.route('/Planets', methods=['GET'])
def planets():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(planets)).scalars()
        response_body['message'] = 'Planetas'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    

@api.route('/swapi/planets', methods=['GET'])
def planets_swapi():
    response_body = {}
    url = 'https://swapi.tech/api/planets'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Listado de planetas importados de la SWAPI'
        next = data.get('next')
        while True:
            results = data['results']
            for result in results:
                planet_response = requests.get(result['url'])
                if planet_response.status_code == 200:
                    planet_data = planet_response.json().get('result').get('properties')
                    planet = Planets(
                        id = planet_data.get('id'),
                        name = planet_data.get('name'),
                        diameter = planet_data.get('diameter'),
                        rotation_period = planet_data.get('rotation_period'),
                        orbital_period = planet_data.get('orbital_period'),
                        gravity = planet_data.get('gravity'),
                        population = planet_data.get('population'),
                        climate = planet_data.get('climate'),
                        terrain = planet_data.get('terrain'))
                    db.session.add(planet)
                else:
                    response_body['message'] = 'error al importar planetas desde swapi'
                    db.session.rollback()
            if next is None:
                break
            else:
                next_response = requests.get(next)
                data = next_response.json()
                next = data.get('next')
        db.session.commit()
        return response_body, 200
    return response_body, 400

@api.route('/planet-favorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def planet_favorite(id):
    response_body = {}
    row = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.id == id)).scalar()
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Registro con id: {id}'
        return response_body, 200
    if not row:
        response_body['message'] =  f'El registro con id: {id} no existe'
        return response_body, 400
    if request.method == 'PUT':
        data = request.json
        row.user_id = data.get('user_id')
        row.planet_id = data.get('planet_id')
        db.session.commit()
        response_body['message'] = f'Actualizado el registro con id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Eliminado el registro con id: {id}'
        return response_body, 200