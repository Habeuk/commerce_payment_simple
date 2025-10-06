### Explication du fonctionnement

1 - lorsque le client clique sur le bouton payer 
1-1 si l'utilisateur est connecté on verifie s'il a une commande avec ce produit donc l'intention de paye est toujours valide, si cest le cas on utilise cette commande (order).
1-2 on cree sa commande (order).
2 - On cree son intention de payer sur stripe, si l'utilisateur est connecté on l'associe la commande, si non on gere cela via une variable de session.



