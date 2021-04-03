# Yellow team
## Level B
### Opzetten API
Er is een API opgezet met Express, deze heeft de endpoint members en poem om respectievelijk de leden van het team en een gedichtje terug te geven.
### Opzetten https
De communicatie met de API verloopt volledig over https. Dit is gedaan door een selfsigned certificaat toe te voegen aan de API.
### Autorisatie
De autorisatie verloopt via de endpoint auth, deze verwacht een secret string en een scope en geeft een JWT Bearer token terug. Via checks in de code van de API wordt bepaalde inhoud alleen getoond voor bepaalde scopes.