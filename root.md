# root

## Table Of Contents

1. 1.0.0 Entities
   1. wallet(Wallet)
   2. trip(Trip)
   3. user(User)
2. ER Diagram

## 1.0.0 Entities

### wallet(Wallet)

#### wallet(Wallet) columns

| Database Name | Property Name | Attribute | Type        | Nullable | Charset | Comment |
| ------------- | ------------- | --------- | ----------- | -------- | ------- | ------- |
| id            | id            | PK        | \*bigint    |          |         |         |
| created_at    | createdAt     |           | \*timestamp |          |         |         |
| updated_at    | updatedAt     |           | \*timestamp |          |         |         |
| deleted_at    | deletedAt     |           | timestamp   | Nullable |         |         |
| user_id       | userId        | FK        | \*bigint    |          |         |         |
| service       | service       |           | \*int       |          |         |         |
| address       | address       | UK        | \*varchar   |          |         |         |
| amount        | amount        |           | \*numeric   |          |         |         |

#### wallet(Wallet) indices

| Database Name                  | Property Name                  | Unique | Columns |
| ------------------------------ | ------------------------------ | ------ | ------- |
| UQ_1dcc9f5fd49e3dc52c6d2393c53 | UQ_1dcc9f5fd49e3dc52c6d2393c53 | Unique |         |

### trip(Trip)

#### trip(Trip) columns

| Database Name | Property Name | Attribute | Type           | Nullable | Charset | Comment |
| ------------- | ------------- | --------- | -------------- | -------- | ------- | ------- |
| id            | id            | PK        | \*bigint       |          |         |         |
| created_at    | createdAt     |           | \*timestamp    |          |         |         |
| updated_at    | updatedAt     |           | \*timestamp    |          |         |         |
| deleted_at    | deletedAt     |           | timestamp      | Nullable |         |         |
| title         | title         |           | \*varchar(255) |          |         |         |
| description   | description   |           | text           | Nullable |         |         |
| start_date    | startDate     |           | \*timestamp    |          |         |         |
| end_date      | endDate       |           | timestamp      | Nullable |         |         |
| destination   | destination   |           | varchar(100)   | Nullable |         |         |
| cost          | cost          |           | \*numeric      |          |         |         |
| traveler_id   | traveler      | FK        | \*bigint       |          |         |         |

### user(User)

#### user(User) columns

| Database Name | Property Name | Attribute | Type           | Nullable | Charset | Comment |
| ------------- | ------------- | --------- | -------------- | -------- | ------- | ------- |
| id            | id            | PK        | \*bigint       |          |         |         |
| created_at    | createdAt     |           | \*timestamp    |          |         |         |
| updated_at    | updatedAt     |           | \*timestamp    |          |         |         |
| deleted_at    | deletedAt     |           | timestamp      | Nullable |         |         |
| name          | name          |           | varchar(150)   | Nullable |         |         |
| username      | username      | UK        | varchar(50)    | Nullable |         |         |
| email         | email         | UK        | \*varchar(255) |          |         |         |
| bio           | bio           |           | varchar(255)   | Nullable |         |         |

#### user(User) indices

| Database Name                  | Property Name                  | Unique | Columns |
| ------------------------------ | ------------------------------ | ------ | ------- |
| UQ_78a916df40e02a9deb1c4b75edb | UQ_78a916df40e02a9deb1c4b75edb | Unique |         |
| UQ_e12875dfb3b1d92d7d7c5377e22 | UQ_e12875dfb3b1d92d7d7c5377e22 | Unique |         |

## ER Diagram

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
