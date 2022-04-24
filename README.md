# CRUD APPLICATION  "My movie librairy"

My movie librairy has been created with a MERN stack application (Mongo, Express, React, NodeJS).
On the movies page, it display your full list of movies.
For each movie you can see the title, the main actor, the genres, movie's description and the picture.
You can update, delete and add all the movies you want to keep in the librairy.

## Install

In each directory, run
```
npm install
```
## Run
On Client
```
npm start
```
On Server
```
npm run dev
```

## The Server app expose with those following routes

SERVER Routes / Endpoints	
movie routes/ endpoints	

| HTTP verb | URL                  | Request body | Action                      |
|-----------|----------------------|--------------|-----------------------------|
| POST      | /api/movies          | JSON         | Creates a new movie         |
| GET       | /api/movies          | (empty)      | Returns all the movies      |
| GET       | /api/movies/:movieId | (empty)      | Returns the specified movie |
| PUT       | /api/movies/:movieId | JSON         | Edits the specified movie   |
| DELETE    | /api/movies/:movieId | (empty)      | Deletes the specified movie |

genre routes/ endpoints	
| HTTP verb | URL                  | Request body | Action                      |
|-----------|----------------------|--------------|-----------------------------|
| POST      | /api/genres          | JSON         | Creates a new movie         |
| GET       | /api/genres          | (empty)      | Returns all the movies      |
| GET       | /api/genres/:genreId | (empty)      | Returns the specified movie |
| PUT       | /api/genres/:genreId | JSON         | Edits the specified movie   |
| DELETE    | /api/genres/:genreId | (empty)      | Deletes the specified movie |

CLIENT Routes Endpoints	
| Route       | HTTP Verb | Component       | Action               |
|-------------|-----------|-----------------|----------------------|
| /movies     | GET       | MoviesListPage  | Get all movies       |
| /movies     | POST      | AddMoviePage    | Create a movie       |
| /movies/:id | GET       | MovieDetailPage | Get a movie by id    |
| /movies/:id | DELETE    | MovieDetailPage | Delete a movie by id |
| /movies/:id | PUT       | UpdateMoviePage | Update a movie by id |

