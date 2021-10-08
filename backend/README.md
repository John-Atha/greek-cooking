## API SPECS

* base URL: http://127.0.0.1:8000
* all the GET requests support pagination, using the `start` and `end` query parameters
* the login and register (POST /users) endpoints receive their body in x-www-form-urlencoded shape
* all the other POST and PUT requests receive their body in form-data shape
* authentication uses a bearer token

* POST `/login`: receives username, and password
* POST `/token_refresh`: requires original token
* GET `/users`
* POST `/users`: receives username, email, password and confirmation
* GET `/users/id`
* PUT `/users/id`: receives (partial) username, email, first_name, last_name, requires authentication
* DELETE `/users/id`: requires authentication
* GET `/recipes`
* POST `/recipes`: receives title, description, image (optionally), requires authentication
* GET `/recipes/id`
* PUT `/recipes/id`: receives (partial) title, description, image, requires authentication
* DELETE `/recipes/id`: requires authentication
* GET `users/:id/recipes`
* GET `users/:id/favourites`
* POST `users/:id/favourites`: receives recipe_id on body, requires authentication
* DELETE `users/:id/favourites`: receives recipe_id on body, requires authentication
* GET `recipes/:id/fans`