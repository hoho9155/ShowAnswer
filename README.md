# show-answer
Chatbot
**Domain:**
Domain for all calls is: https://api.silo.host

**Get knowledge worker: **

GET "{accountName}/bots/{knowledgeWorkerId}" 

(variables coming from querystring) 

Example: 

GET ”gyxi-exclusive/bots/ aab24263-0cc6-4bef-b96f-5bac95495420" 

The call is for now just to check that the bot exists so we don’t need to use the response for anything. 

**Prepare Ask **

POST "{accountName}/temp" 

Example: 

GET ”gyxi-exclusive/temp”

{ 

    "id": "491f2cd7-4707-421e-b4f9-0000b8e80563", 
    
    "param1": "What is the experiment?", 
    
    "param2" : "null" 
    
} 

id should be a new unique guid for every call param1 is the text that the user enters as a question in the field. 

**Ask **

GET ”gyxi-exclusive/bots/{knowledgeWorkerId}/ask/{tempId}" 

Example: 

GET ”gyxi-exclusive/bots/aab24263-0cc6-4bef-b96f-5bac95495420/ask/491f2cd7-4707421e-b4f9-0000b8e80563" 

The response is a STREAM of json and it is essential that the responses are shown to the user AS they are received from the API and not waiting till the end. 
 

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
