// As funções aqui recebem a requisição (req), processam-na, chamam a camada de serviço para executar a lógica necessária e, por fim, montam a resposta (res). Se a requisição for para adicionar uma marcação, o controlador valida os dados da requisição, chama o serviço para adicionar a marcação no banco de dados, e então envia uma resposta de sucesso ou erro. Controladores não devem conter lógica de negócio. Eles apenas orquestram as ações.



// Recebe a requisição da rota, faz a validação inicial dos dados e, em seguida, chama as funções da camada de serviço para processar a lógica de negócio