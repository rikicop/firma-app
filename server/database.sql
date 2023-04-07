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

