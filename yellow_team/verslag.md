# Yellow team
## Level C
### Manuele authenticatie
Om te beginnen heb ik de STS discovery document geopend, hierin stonden de api endpoints die nodig zijn voor de authenticatie. Vervolgens heb ik in Postman
een request gedaan naar de token endpoint met als body x-www-formurlencoded, in deze nody stonden de gegeven client id, client secret, scope en de grant type.
Deze grant type staat vermeld in het discovery document, als waarde heb ik 'client_credentials' gebruikt om aan te geven dat dit is waarmee ik een token wil krijgen.
In de response stond dan de access token die gebruikt kon worden om toegang te krijgen to de WebAPI. Dit werd gedaan door in de request headers een key 'Bearer' toe
te voegen met als value 'Bearer ' + de access token.

### Authenticatie via code
Dit proces heb ik geprogrammeerd in JavaScript met 2 simpele fetch requests.

### Veranderen en testen van token
Wanneer de iss van een token wordt aangepast in jwt.io is deze token niet meer te gebruiken, de WebAPI moet natuurlijk weten van welke issuer een token komt aangezien 
deze tokens door veel websites gebruikt worden. Wanneer de client_id en/of de scope aangepast wordt kan dit wel nog aangezien de WebAPI niet weet welke id's en 
secrets geldig zijn.
