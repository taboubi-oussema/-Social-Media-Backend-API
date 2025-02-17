
<div align="center">
<h1>Social-Backend-Api</h1>

![image](https://i.imgur.com/ZKXUbGG.png)
</div>

## 🏃‍♂️ Quick Start
- [Description!](https://github.com/taboubi-oussema/-Social-Media-Backend-API#-description)
- [Technologies!](https://github.com/taboubi-oussema/-Social-Media-Backend-API#-technologies)
- [Features!](https://github.com/taboubi-oussema/-Social-Media-Backend-API#-features)
- [Prerequisites!](https://github.com/taboubi-oussema/-Social-Media-Backend-API#-prerequisites)
- [Installation!](https://github.com/taboubi-oussema/-Social-Media-Backend-API#%EF%B8%8F-installation)
- [API Documentation!](https://github.com/taboubi-oussema/-Social-Media-Backend-API#-api-documentation)
- [Deployment!](https://github.com/taboubi-oussema/-Social-Media-Backend-API#-deployment)


## 📝 Description

This is the backend API for a social media application that provides a range of powerful features to users.  API is designed to provide a seamless and efficient experience, allowing users to interact with the app in meaningful ways.

## 💻 Technologies

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [Nodemon](https://nodemon.io)
- [joi](https://joi.dev)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [jwt](https://jwt.io)
- [multer](https://www.npmjs.com/package/multer)
- [mongoose](https://mongoosejs.com)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)


## 🎉 Features

<h4>1- Authentication and Authorization: </h4>

- Handeling Register , Login , Logout
- Confirmation email via Gmail
- Forget & Reset Password

<h4>2- User Profile Management: </h4>

- user connections ( Get All List ,Get Mutal, Request , Accept , Remove)
- user profile & other's profile
- update user info
- Delete Account 
- recover Account ( 30 day max ) throuh email sent after deleting

<h4>4- Post Management: </h4>

- Crud Posts (soft delete applied)

<h4>5- Comment Management: </h4>

- Crud Comments (soft delete applied)

<h4>5- Message Management: </h4>

- Crud Message (soft delete applied)



## 📋 Prerequisites
Before you begin, make sure that you have the following tools and technologies installed on your machine:
- [Node.js](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/downloads)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/download), [Atom](https://atom.en.uptodown.com/windows), or [Sublime Text](https://www.sublimetext.com/3)
- [Postman](https://www.postman.com/downloads) for API Documentation


## ⚙️ Installation
To install and run your social media backend API, follow these steps:

<h2>1. Clone the repository</h2>

```
git clone https://github.com/taboubi-oussema/-Social-Media-Backend-API.git
cd -Social-Media-Backend-API
```

<h2>2. Install dependencies</h2>

```
npm install

```
<h2>3. Set up environment variables</h2>

> Note: **environment variables(.env) located into config file**

```
PORT=<Your_PORT_Number>
DB_URL=<mongodb_url>
NODE_ENV=development
```

- Replace `<Your_PORT_Number>` with the port number you want your server to listen on , for example (5000)
- Replace `<mongodb_url>` with your MongoDB Cloud URL
> Note: To get `MongoDB` the  Cloud URL, follow these steps through [URL](https://www.mongodb.com/docs/guides/atlas/connection-string)
> Note: In JSON Web Tokens (JWT), the signature is a string of characters that is used to verify the authenticity of the token.
- Replace `<SALT_ROUNDS>` with number between 1-20
> Note: A commonly used hashing algorithm for password storage is bcrypt, and a minimum of 10 salt rounds is generally recommended.
However, some security experts recommend using a higher number of salt rounds
, such as 12 or 14, to provide additional security against brute-force attacks. [Read More...](https://medium.com/coinmonks/to-salt-or-not-to-salt-salting-is-not-the-only-answer-to-securing-passwords-cdab26bd20ad)

<h2>4. Start the server</h2>

```
nodemon [your node app]  or  nodemon
```
or
```
npm run dev
```



## 📖 API Documentation
The API documentation is provided through [Postman JSON File](./Social-Backend-Api.postman_collection.json)

<h3>Follow These Steps</h3>

  1. Click **Download raw file**
  
  ![image](https://github.com/taboubi-oussema/-Social-Media-Backend-API/blob/main/Capture%20d'%C3%A9cran%202025-02-10%20230256.png?raw=true)

  2. open **[Postman Desktop](https://www.postman.com/downloads)** or through **[Postman Browser](https://www.postman.com)**
  
  - Go to File -> import  or press **CTRL+O**
  
  ![image](https://i.imgur.com/dc2pDb8.png)     ![image](https://i.imgur.com/Q6qR6vl.png)
  
  3. You will find six main folders (`AUTH`,`USER`,`POST`,`NOTIFICATIONS`,`COMMENTS`,`MESSAGES`) , each folder contains an API requests. 
    
  
## 🚀 Deployment

>Before you begin, Make sure that you don't have any issues or errors before deploying your project.

>You need to remove `config` or `.env` file before deployment because of the sensitive data.

<h3>What do you need ?</h3>

1. Create a run script in the `package.json` file [Here](./package.json/#L9)

```json
"scripts": {
        "start": "node index.js"
    },
```

2. Add an "engines" section to your `package.json` file [Here](./package.json/#L12)

```json
"engines": {
  "node": "16.14.0"
},
```

>Note : To check the version of Node.js installed on your system, you can use the node -v command.

```
node -v
```

3. Create a `vercel.json` file and put it in the root of your project folder and then add the code below

```json
{
    "version": 2,
    "builds": [
       { "src": "./index.js", "use": "@vercel/node" }
    ],
    "routes": [
        {
          "src": "/(.*)",
          "dest": "/"
        }
      ]
 }
```

## 👍 Contribute
Leave a ⭐ If you think this project is cool.
