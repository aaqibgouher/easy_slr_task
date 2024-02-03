# Project Installation Guide
EasySLR Task

## Video Explanation
[![Assignment Explanation](https://example.com/video-thumbnail.jpg)](https://www.loom.com/share/d30ae106030c4d09b4864c299f67bf54?sid=04f78bb5-dc3d-41bc-a266-91ba286f62e8)


## Server (Node.js)

### 1. Node.js Installation:

- Install node

### 2. Clone repo:
```bash
    git clone <server-repository-url>
    cd server
```

### 3. Install dependencies:
```bash
    npm install
```

### 4. Environment variables & DB Setup:

- Update .env file & configure mongo uri for DB Connection. I have added .env.example, copy all variable create .env file & paste here. It has mongo uri, so good to go.

### 5. Run the server:
```bash
    npm run dev
```

Once, server is started & DB connected, we are good to go. I have also added Postman collection, you can import & make API calls.

## Client (React.js)

### 1. Node.js Installation:

- Install node

### 2. Clone repo:
```bash
    git clone <client-repository-url>
    cd client
```

### 3. Install dependencies:
```bash
    npm install
```

### 4. Run the development server:
```bash
    npm run dev
```

