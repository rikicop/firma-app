Si ya lo hiciste antes, simplemente empieza del paso 4, pero primero corre el servidor de docker

1 . Vas a usar el video de PERN y DOCKER como esquema

# docker ps

CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

2. # docker pull postgres:14

14: Pulling from library/postgres
Digest: sha256:4ca68565be94850947b7cdbabf1fe15cceadb7a1d7442aa94903b57be8b16694
Status: Image is up to date for postgres:14
docker.io/library/postgres:14
PS C:\Users\Ricardo> 

docker run --name mi-postgres -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres:14

ca42849848e308b2aabef6e33b4c97eb1262db98c3237be62bb6c1cd9a2ab945

3. # docker ps

CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS          PORTS      NAMES
ca42849848e3   postgres:14   "docker-entrypoint.s…"   17 seconds ago   Up 16 seconds   5432/tcp   mi-postgres

4 . ## Entrar desde el terminal

Acuerdate de checkear el paso 3 para ver como se llama
```
docker exec -it mi-postgres psql -U postgres -W
 ó 
docker exec -it server-mi-postgres-1 psql -U ricardo -W campaign
```

CREATE DATABASE campana;

CREATE TABLE firmas(
id SERIAL PRIMARY KEY,	
enlace VARCHAR(200),	
cc NUMERIC(10,0),                   
name VARCHAR(200),                 
valid_signature VARCHAR(4),   
verified_signature VARCHAR(4),
problem_type VARCHAR(10),         
origin_type VARCHAR(10)           
);               


INSERT INTO firmas (enlace, cc, name, valid_signature, verified_signature, problem_type, origin_type)
VALUES
  ('http://enlace1.com', 1234567890, 'Nombre1', 'SI', 'SI', 'NINGUNO', 'ONLINE'),
  ('http://enlace2.com', 2345678901, 'Nombre2', 'SI', 'NO', 'INVALIDO', 'PRESENCIAL'),
  ('http://enlace3.com', 3456789012, 'Nombre3', 'NO', 'NO', 'FIRMADO', 'ONLINE'),
  ('http://enlace4.com', 4567890123, 'Nombre4', 'SI', 'SI', 'NINGUNO', 'PRESENCIAL'),
  ('http://enlace5.com', 5678901234, 'Nombre5', 'NO', 'NO', 'FIRMADO', 'ONLINE'),
  ('http://enlace6.com', 6789012345, 'Nombre6', 'SI', 'NO', 'INVALIDO', 'PRESENCIAL'),
  ('http://enlace7.com', 7890123456, 'Nombre7', 'SI', 'SI', 'NINGUNO', 'ONLINE'),
  ('http://enlace8.com', 8901234567, 'Nombre8', 'NO', 'SI', 'N/A', 'PRESENCIAL'),
  ('http://enlace9.com', 9012345678, 'Nombre9', 'SI', 'NO', 'INVALIDO', 'ONLINE'),
  ('http://enlace10.com', 1234567891, 'Nombre10', 'NO', 'NO', 'FIRMADO', 'PRESENCIAL'),
  ('http://enlace11.com', 2345678902, 'Nombre11', 'SI', 'SI', 'NINGUNO', 'ONLINE'),
  ('http://enlace12.com', 3456789013, 'Nombre12', 'NO', 'SI', 'N/A', 'PRESENCIAL');



* Esto esta bien , pero deberias usar yaml para poder salvar los cambios de base de datos

* Empezar a crear la Api 
  
 
  - Minuto 48:00 En HolaMundo te da el código, dile a chatgpt que lo transforme a postgresql
    o copiate del alnterior 

  - En el video de PERN También lo debe explicar

