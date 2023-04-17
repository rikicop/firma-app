# Recuerda que esto está configurado para internet normal por defecto y no de Mobile

## Inicializar Docker

Primero Inicializa docker desktop

$ docker compose up -- Dentro de la carpeta donde está el docker-compose.yml

## Como conectarme a la BD creada en Docker y Postgres

$ docker exec -it server-mi-postgres-1 psql -U ricardo postgres
psql (15.2 (Debian 15.2-1.pgdg110+1))
Type "help" for help.

postgres=# \l
                                                    List of databases
        Name         |  Owner  | Encoding |  Collate   |   Ctype    | ICU Locale | Locale Provider |  Access privileges
---------------------+---------+----------+------------+------------+------------+-----------------+---------------------
 campaign            | ricardo | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |
 musical_ethnography | ricardo | UTF8     | en_US.utf8 | en_US.utf8 |            | libc            |


# Run The Server

$  npm run start


# Verifica que este funcionando con Insomnia



