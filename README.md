
# Iaçá App

Este é um aplicativo mobile desenvolvido em React Native com Expo, voltado para conectar feirantes que vendem caroço de açaí com empresas interessadas na compra.

## Requisitos

Antes de iniciar, é necessário ter instalado:

- Node.js (versão recomendada: LTS)
- Expo CLI (`npm install -g expo-cli`)
- Git (opcional, para clonar repositórios)
- Um emulador Android configurado ou o aplicativo Expo Go no celular

## Instalação

1. Clone o repositório ou baixe os arquivos.

2. Navegue até a raiz do projeto:

```bash
cd iaca-frontend
````

3. Instale as dependências:

```bash
npm install
```

## Como rodar

Você pode rodar o aplicativo de três formas:

### Via Expo Go (recomendado para testes rápidos)

```bash
npm start
```

Depois disso, escaneie o QR code que aparece no terminal com o aplicativo **Expo Go** no seu celular.

### Emulador Android

Certifique-se de que seu emulador esteja aberto e configurado corretamente. Em seguida, execute:

```bash
npm run android
```

### Modo Web

Para testar o layout via navegador:

```bash
npm run web
```

## Estrutura do Projeto

```
yaca-app/
├── App.tsx
├── package.json
└── src/
    ├── api/                  # Comunicação com backend
    ├── screens/              # Telas separadas por função
    ├── types/                # Tipagens globais
    └── styles/               # Estilos compartilhados
```

## Observações

* As telas já estão separadas em arquivos próprios dentro da pasta `src/screens`.
* O projeto está pronto para ser conectado com um backend via HTTP utilizando `fetch`.

## Licença

Este projeto é livre para uso e modificação com fins acadêmicos ou educacionais.

```

