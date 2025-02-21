# 🐦 **Twitter Clone (NoSQL Project)**

A full-stack Twitter clone built with **NestJS** for the backend, **MongoDB** for NoSQL data handling, and **React** for the frontend. This project showcases MongoDB's native queries and CRUD operations without using any ORM.

## 📜 **Features**

- 📝 Create, Read, Update, and Delete (CRUD) Tweets
- 💬 Replies and nested comments using MongoDB's aggregation
- ❤️ Like/Unlike tweets and count likes
- 🔐 Authentication with JWT
- 👤 User profiles with tweet history
- 📄 Clean UI using TailwindCSS and ShadCN components

---

## ⚡ **Tech Stack**

- **Backend:** NestJS, MongoDB (Native Driver)
- **Frontend:** React, ShadCN, TailwindCSS
- **Database:** MongoDB (NoSQL)
- **Deployment:** Docker, Google Cloud Run

---

## 🚀 **Getting Started**

### 🔧 **Prerequisites**

- Node.js >= 18.x
- MongoDB >= 6.x (Local or Atlas)
- Docker (optional, for deployment)

### 📥 **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/twitter-clone-nosql.git
   cd twitter-clone-nosql
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file inside the `backend/` directory:

   ```
   MONGO_URL=mongodb://localhost:27017/twitter_clone
   PORT=5000
   ```

4. **Run the backend server**

   ```bash
   npm run start:dev
   ```

5. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

6. **Run the frontend app**

   ```bash
   npm run dev
   ```

---

## 🔥 **CRUD Operations (MongoDB Shell)**

### 📝 **Create a Tweet**

```js
db.tweets.insertOne({
  content: "This is my first tweet!",
  userId: ObjectId("USER_ID_HERE"),
  createdAt: new Date(),
  parentId: null,
});
```

### 📖 **Read a Tweet with Replies & Likes Count**

```js
db.tweets.aggregate([
  { $match: { _id: ObjectId("TWEET_ID_HERE") } },
  {
    $lookup: {
      from: "tweets",
      localField: "_id",
      foreignField: "parentId",
      as: "replies",
    },
  },
  {
    $lookup: {
      from: "likes",
      localField: "_id",
      foreignField: "tweetId",
      as: "likes",
    },
  },
  {
    $addFields: {
      likeCount: { $size: "$likes" },
    },
  },
]);
```

### ✏️ **Update a Tweet**

```js
db.tweets.updateOne(
  { _id: ObjectId("TWEET_ID_HERE"), userId: ObjectId("USER_ID_HERE") },
  { $set: { content: "Updated tweet content!" } },
);
```

### ❌ **Delete a Tweet**

```js
db.tweets.deleteOne({
  _id: ObjectId("TWEET_ID_HERE"),
  userId: ObjectId("USER_ID_HERE"),
});
```

---

## 🔑 **API Endpoints**

### 📍 **Auth**

- `POST /auth/register` → Register a new user
- `POST /auth/login` → Login and get JWT token

### 🐦 **Tweets**

- `GET /tweets` → Get all tweets
- `GET /tweets/:id` → Get a tweet by ID (with replies & likes)
- `POST /tweets` → Create a tweet
- `PUT /tweets/:id` → Update a tweet
- `DELETE /tweets/:id` → Delete a tweet

### 💡 **Likes**

- `POST /likes/:tweetId` → Like a tweet
- `DELETE /likes/:tweetId` → Unlike a tweet

---

## 🎨 **Screenshots**

| 🏠 Home Feed                    | 👤 User Profile                       | 📝 New Tweet                              |
| ------------------------------- | ------------------------------------- | ----------------------------------------- |
| ![Home](./screenshots/home.png) | ![Profile](./screenshots/profile.png) | ![New Tweet](./screenshots/new-tweet.png) |

---

## 🤝 **Contributing**

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

---

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
