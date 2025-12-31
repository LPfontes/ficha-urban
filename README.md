Este documento cobre as funcionalidades, tecnologias e instruções de instalação, adaptado para o contexto de fichas de RPG do sistema Urban Shadows.

---

# Fichas de Personagem - Urban Shadows

Este projeto é uma aplicação web desenvolvida com **React** e **Vite** para a criação, visualização e gestão de fichas de personagem para o RPG de fantasia urbana **Urban Shadows**.

A aplicação permite aos jogadores selecionarem diferentes arquétipos (Playbooks) e preencherem as suas fichas digitalmente, com funcionalidades de exportação.

## 🚀 Funcionalidades

* **Seleção de Arquétipos**: Alternância dinâmica entre diferentes tipos de fichas de personagem.
* **Arquétipos Disponíveis**:
* Caçador
* Desperto
* Diabrete
* Espectro
* Feérico
* Juramentado
* Lobo
* Maculado
* Mago
* Oráculo
* Sanguessuga
* Veterano


* **Exportação**: Ferramentas integradas para gerar ficheiros PDF ou imagens das fichas (via `jspdf` e `html-to-image`).

## 🛠️ Tecnologias Utilizadas

* **[React](https://react.dev/)**: Biblioteca JavaScript para construção da interface.
* **[Vite](https://vitejs.dev/)**: Ferramenta de *build* rápida e ambiente de desenvolvimento.
* **html-to-image**: Para converter os componentes da ficha em imagens.
* **jspdf**: Para geração de documentos PDF a partir das fichas.

## 📦 Instalação e Configuração

Para executar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** instalados na sua máquina.

### Passos

1. **Clone o repositório**
```bash
git clone https://seu-repositorio/ficha-urban.git
cd ficha-urban

```


2. **Instale as dependências**
```bash
npm install

```


3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev

```



A aplicação ficará disponível, geralmente, em `http://localhost:5173`.

## 📜 Scripts Disponíveis

No diretório do projeto, pode executar:

* `npm run dev`: Inicia a aplicação em modo de desenvolvimento.
* `npm run build`: Compila a aplicação para produção.
* `npm run lint`: Executa o ESLint para verificar a qualidade do código.
* `npm run preview`: Pré-visualiza a versão de produção localmente.

## 📂 Estrutura do Projeto

A estrutura principal da aplicação está organizada da seguinte forma:

* `src/App.jsx`: Componente principal que gere a navegação entre as diferentes fichas.
* `src/components/`: Contém os componentes individuais para cada arquétipo (ex: `CaçadorSheet.jsx`, `MagoSheet.jsx`, etc.).
* `src/assets/`: Imagens e recursos estáticos.

---

*Desenvolvido para fãs de Urban Shadows.*
