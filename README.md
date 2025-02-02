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

### Mermaid Diagram

```mermaid
%%{init: {'theme':'dark'}}%%

erDiagram


"wallet(Wallet)" {
  *bigint id    PK
  *timestamp createdAt
  *timestamp updatedAt
  timestamp deletedAt
  *bigint userId    FK
  *int service
  *varchar address    UK
  *numeric amount
}


"wallet(Wallet)"  }o  --  ||  "user(User)":  "user_id"


"trip(Trip)" {
  *bigint id    PK
  *timestamp createdAt
  *timestamp updatedAt
  timestamp deletedAt
  *varchar(255) title
  text description
  *timestamp startDate
  timestamp endDate
  varchar(100) destination
  *numeric cost
  *bigint traveler    FK
}


"trip(Trip)"  }|  --  ||  "user(User)":  "traveler_id"


"user(User)" {
  *bigint id    PK
  *timestamp createdAt
  *timestamp updatedAt
  timestamp deletedAt
  varchar(150) name
  varchar(50) username    UK
  *varchar(255) email    UK
  varchar(255) bio
}
```
