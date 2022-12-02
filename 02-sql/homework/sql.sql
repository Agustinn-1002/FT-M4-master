-- 1 Buscá todas las películas filmadas en el año que naciste.

SELECT * 
FROM movies
WHERE year = 2000;

-- 2 Cuantas películas hay en la DB que sean del año 1982?

SELECT COUNT(*) as Total
FROM movies
WHERE year = 1982;

-- 3 Buscá actores que tengan el substring stack en su apellido.

SELECT * FROM actors
WHERE last_name LIKE '%stack%'; -- con el like y los porcentajes indicamos que busque en cualquier parte del string sierta palabra

-- 4 Buscá los 10 nombres y apellidos más populares entre los actor_es. Cuantos actores tienen cada uno de esos nombres y apellidos?

SELECT first_name, last_name , COUNT(*) AS Total
FROM actors
GROUP BY lower(first_name),lower(last_name)
ORDER BY Total DESC
LIMIT 10;

-- 5 Listá el top 100 de actores más activos junto con el número de roles que haya realizado.

SELECT first_name, last_name, COUNT(*) AS total
FROM actors as a
JOIN roles as r ON a.id = r.actor_id
GROUP BY a.id
ORDER BY total DESC
LIMIT 100;

-- 6 Cuantas películas tiene IMDB por género? Ordená la lista por el género menos popular.

SELECT genre, COUNT(*) as total
FROM movies_genres
GROUP BY genre
ORDER BY total;

-- 7 Listá el nombre y apellido de todos los actores que trabajaron en la película "Braveheart" de 1995, ordená la lista alfabéticamente por apellido.

SELECT first_name, last_name
FROM actors as a
JOIN roles as r ON a.id = r.actor_id
JOIN movies as m ON r.movie_id = m.id
WHERE m.name = 'Braveheart' AND m.year = 1995
ORDER BY a.last_name;

-- 8  Listá todos los directores que dirigieron una película de género 'Film-Noir' en un año bisiesto (para reducir la complejidad, asumí que cualquier año divisible por cuatro es bisiesto). Tu consulta debería devolver el nombre del director, el nombre de la peli y el año. Todo ordenado por el nombre de la película.

SELECT d.first_name, d.last_name, m.name , m.year
FROM directors as d
JOIN movies_directors as md ON d.id = md.movie_id
JOIN movies as m on md.movie_id = m.id
JOIN movies_genres as mg ON m.id = mg.movie_id
WHERE mg.genre = 'Film-Noir' and m.year % 4 = 0
ORDER BY m.name;

-- 9 Listá todos los actores que hayan trabajado con Kevin Bacon en películas de Drama (incluí el título de la peli). Excluí al señor Bacon de los resultados.

SELECT DISTINCT a.first_name , a.last_name
FROM actors as a 
JOIN roles as r ON a.id = r.actor_id
JOIN movies as m ON r.movie_id = m.id
JOIN movies_genres as mg ON m.id = mg.movie_id
WHERE mg.genre = 'Drama' AND m.id IN(
    SELECT m.id
    FROM movies as m
    JOIN roles as r ON m.id = r.movie_id
    JOIN actors as a ON r.actor_id = a.id 
    WHERE a.first_name = 'Kevin' AND a.last_name = 'Bacon'
) and (a.first_name || a.last_name != 'KevinBacon')
ORDER BY a.last_name DESC;