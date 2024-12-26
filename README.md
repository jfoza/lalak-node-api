<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# App

Lalak app.

## RFs

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Qualquer usuário deve poder recuperar sua senha para acessar o sistema.

## RNs

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] Deve haver dois tipos de usuáios: Admins e Clientes.
- [ ] Cada usuário deve ter um perfil.
- [ ] Cada perfil deve ter um grupo de regras para acessar as funcionalidades do sistema.
- [ ] Ao cadastrar um novo Cliente, os dados de autenticação devem ser enviados por e-mail.
- [ ] Os dados de cada autenticação, devem ser cadastrados em uma tabela no banco de dados.

- [ ] Deve haver um CRUD de Temas.
- [ ] Deve haver um CRUD de Categorias com um tema_id.
- [ ] Cada categoria deve pertencer a apenas um tema.
- [ ] Deve haver um CRUD de Produtos.
- [ ] Um produto pode estar vinculado a uma ou mais categorias.

- [ ] Deve haver um CRUD de eventos.
- [ ] Um produto pode estar vinculado a uma ou mais eventos.

- [ ] Os clientes devem poder armazenar seus produtos favoritos.
- [ ] Deve haver uma área de ajuda e suporte com envio de e-mails para os Clientes.

- [ ] Na área pública, ao escolher um produto, o usuário deve ser redirecionado para o whatsapp da empresa, contendo link do produto na mensagem.

## RNFs

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação, precisam estar persistidos em um banco de dados postgresql;
- [ ] Todas as listas de dados, precisam estar paginadas com 20 itens por página;
- [ ] Deve haver uma área administrativa reservada a usuários específicos.
- [ ] Deve haver uma área pública para qualquer usuário se cadastrar.
- [ ] O usuário deve ser identficado por um JWT(JSON Web Token);