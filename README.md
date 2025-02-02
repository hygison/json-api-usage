Using https://github.com/klerick/nestjs-json-api

# Getting started (Docker)

Make sure to download Docker before.

- Create `.evn` as a copy of `.env.example`
- run `make` and the containers will be build and the API will be available at port 3000

# Generate Mermaid For Database

- Start the app with `make`
- Enter in app container `make app`
- Create the Mermaid Diagram with `npm run mermaid`.
- A `.md` file will be created
- The name of the file depends on your database name on your `.env`
