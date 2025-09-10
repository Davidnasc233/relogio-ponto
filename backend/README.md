# Relógio de Ponto - Documentação das APIs

## Sumário
- [Autenticação](#autenticação)
- [Usuários](#usuários)
- [Jornada de Trabalho](#jornada-de-trabalho)
- [Marcações de Ponto](#marcações-de-ponto)
- [Cálculo de Horário de Saída](#cálculo-de-horário-de-saída)


## Autenticação

### POST `/api/auth/login`
Autentica o usuário e retorna um token JWT.

**Request Body**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Response**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com"
  }
}
```
**Headers**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Erros**
```json
{
  "error": "Credenciais inválidas."
}


### POST `/api/auth/forgot-password`
Envia e-mail para recuperação de senha.

**Request Body**
```json
{
  "email": "usuario@exemplo.com"
}
```

**Response**
```json
{
  "message": "E-mail de recuperação enviado."
}
```
**Erros**
```json
{
  "error": "Usuário não encontrado."
}


### POST `/api/auth/reset-password`
Redefine a senha do usuário.

**Request Body**
```json
{
  "token": "token_recebido_por_email",
  "newPassword": "novaSenha123"
}
```

**Response**
```json
{
  "message": "Senha redefinida com sucesso."
}
```
**Erros**
```json
{
  "error": "Token inválido ou expirado."
}


## Usuários

### POST `/api/users`
Cria um novo usuário.

**Request Body**
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Response**
```json
{
  "id": "uuid",
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com"
}
```
**Erros**
```json
{
  "error": "E-mail já cadastrado."
}


## Jornada de Trabalho

### GET `/api/work-schedule/:userId`
Busca a jornada de trabalho do usuário.

**Response**
```json
{
  "userId": "uuid",
  "schedule": {
    "monday": 9,
    "tuesday": 9,
    "wednesday": 9,
    "thursday": 9,
    "friday": 8,
    "saturday": 0,
    "sunday": 0
  }
}
```
**Headers**
```
Authorization: Bearer <jwt_token>
```

**Erros**
```json
{
  "error": "Usuário não encontrado."
}


### PUT `/api/work-schedule/:userId`
Atualiza a jornada de trabalho do usuário.

**Request Body**
```json
{
  "schedule": {
    "monday": 9,
    "tuesday": 9,
    "wednesday": 9,
    "thursday": 9,
    "friday": 8,
    "saturday": 0,
    "sunday": 0
  }
}
```

**Response**
```json
{
  "message": "Jornada de trabalho atualizada."
}
```
**Headers**
```
Authorization: Bearer <jwt_token>
```

**Erros**
```json
{
  "error": "Dados inválidos."
}


## Marcações de Ponto

### POST `/api/work-entries/:userId`
Adiciona uma marcação de ponto.

**Request Body**
```json
{
  "datetime": "2025-09-10T08:00:00"
}
```

**Response**
```json
{
  "id": "uuid",
  "datetime": "2025-09-10T08:00:00"
}
```
**Headers**
```
Authorization: Bearer <jwt_token>
```

**Erros**
```json
{
  "error": "Formato de data inválido."
}


### GET `/api/work-entries/:userId?date=2025-09-10`
Busca todas as marcações de um usuário em um dia.

**Response**
```json
[
  {
    "id": "uuid",
    "datetime": "2025-09-10T08:00:00"
  },
  {
    "id": "uuid",
    "datetime": "2025-09-10T12:00:00"
  }
]
```
**Headers**
```
Authorization: Bearer <jwt_token>
```

**Erros**
```json
{
  "error": "Usuário não encontrado."
}


### DELETE `/api/work-entries/:userId/:entryId`
Remove uma marcação de ponto.

**Response**
```json
{
  "message": "Marcação removida."
}
```
**Headers**
```
Authorization: Bearer <jwt_token>
```

**Erros**
```json
{
  "error": "Marcação não encontrada."
}


## Cálculo de Horário de Saída

### POST `/api/departure-time/:userId`
Calcula o horário de saída do usuário para o dia.

**Request Body**
```json
{
  "date": "2025-09-10",
  "entries": [
    "2025-09-10T08:00:00",
    "2025-09-10T12:00:00",
    "2025-09-10T13:00:00"
  ]
}
```

**Response**
```json
{
  "departureTime": "17:00",
  "message": "Seu horário de saída é: 17:00"
}
```
Se não houver jornada prevista:
```json
{
  "departureTime": null,
  "message": "Não há jornada de trabalho prevista para hoje."
}
```
Se jornada já completa:
```json
{
  "departureTime": null,
  "message": "Jornada de trabalho completa!"
}
```
**Headers**
```
Authorization: Bearer <jwt_token>
```

**Erros**
```json
{
  "error": "Dados insuficientes para cálculo."
}