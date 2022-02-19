# Aplicativo de Mobile Learning

Esse aplicativo iniciou a partir da ideia de ProjectEDU, e foi evoluído para ensinar não apenas conteúdos na área de gestão de software, mas para funcionar genericamente com qualquer tipo de conteúdo, seguindo uma modelagem de dados.

O repositório em questão contém o código do aplicativo mobile que será usado por aqueles que irão aprender os conteúdos.

O aplicativo foi desenvolvido utilizando tecnologias como Expo e React Native JS.

## Como rodar?
Para roda o código do aplicativo localmente, basta possui node.js instalado, e instalar as dependências por meio de:
```
$ yarn install
```

Então, após instalar as dependências, é preciso buscar os dados do firebase (`firebaseConfig.js`) para realizar a conexão. Para isso, basta seguir [este tutorial](https://firebase.google.com/docs/web/setup?hl=pt-br). Na etapa 2, aparece um comentário `// TODO` em cima de `const firebaseConfig = { ... }`. Basta procurar onde ficam esses dados de configuração da database firebase usada, e salvar essa variável em um arquivo `secret.js` na raiz desse repositório. O arquivo ficará com uma estrutura parecida com essa:

```
// ./secret.js
export const firebaseConfig = {
    apiKey: ...,
    authDomain: ...,
    databaseURL: ...,
    projectId: ...,
    storageBucket: ...,
    messagingSenderId: ...,
    appId: ...,
    measurementId: ...
    ...
};

```

Após configurar o firebase, basta rodar o projeto com:
```
$ npm start
```
ou
```
$ expo start
```

* **Obs:** a versão do node.js na qual o desenvolvimento foi feito é a 16. Pode ser que a transição de versões gere problemas.


## Ideias a serem desenvolvidas
- [ ] Outros tipos de exercícios
    - [ ] Complete a frase
- [ ] Avaliações para tópicos
- [ ] Mais estatísiticas gerais do usuário
- [ ] Diferentes tipos de conquistas