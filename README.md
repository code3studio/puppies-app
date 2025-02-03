# Puppies List Application

This is a full-stack application built with **NestJS** (backend) and **Angular** (frontend) using **Neo4j** as the database. The application displays a list of puppies and allows filtering based on various attributes.

## Features
- List puppies with details.
- View individual puppy details.
- Filter puppies by pet type, status, location, breed, and gender.
- Add, update, and delete puppies.

## Tech Stack
- **Frontend:** Angular, SCSS
- **Backend:** NestJS, Neo4j
- **Database:** Neo4j
- **Monorepo Management:** Nx

---

## Local Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 16.x)
- **Angular CLI**
- **NestJS CLI**
- **Neo4j Database**

### 1. Clone the Repository
```sh
git clone https://github.com/code3studio/puppies-app.git
cd puppies-app
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Setup Neo4j Database
Ensure you have **Neo4j** running and update the **Neo4j connection settings** in `backend/src/app/neo4j/neo4j.service.ts`:
```ts
  private readonly URI = 'your_neo4j_host';
  private readonly USERNAME = 'neo4j';
  private readonly PASSWORD = 'your_password';
```

### 4. Run Backend (NestJS)
```sh
npx nx serve server
```
The backend will be available at: `http://localhost:3000/api`

### 5. Run Frontend (Angular)
```sh
npx nx serve client
```
The frontend will be available at: `http://localhost:4200`

---

## API Endpoints

### Get All Puppies (with optional filters)

```http
GET /api/puppies?gender=male
```

### Get Single Puppy

```http
GET /api/puppies/:refId
```

### Create a Puppy

```http
POST /api/puppies
Content-Type: application/json
{
  "name": "Buddy",
  "breed": "Golden Retriever",
  "color": "Golden",
  "location": "Naples",
  "gender": "Male",
  "dob": "2023-06-15",
  "image": "url-to-image",
  "contact": "123-456-7890"
}
```

To add a puppy using the frontend, navigate to the application, fill in the puppy details in the provided form, and submit.

### Update a Puppy

```http
PUT /api/puppies/:refId
Content-Type: application/json
{
  "name": "Updated Name"
}
```

### Delete a Puppy

```http
DELETE /api/puppies/:refId
```

---


