Link to presentation <https://www.canva.com/design/DAGfqGSyCes/0Asvfif9L30gq_kkzRTctg/edit?utm_content=DAGfqGSyCes&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton>

About our project

Our project focuses on building a scalable and efficient social media platform, implemented using a MongoDB database with three primary collections: tweets, users, and likes. The system is designed to handle real-time interactions, manage user-generated content, and support seamless engagement between users.
Data and user text are stored in the tweet collection. The user collection represents platform members, storing profile details and user activity. All interactions are recorded by the likes collection, which shows which users have interacted with a given tweet.
This structure is optimized through indexing for fast data retrieval and ensures efficient relationships between collections. The project leverages real-world data simulations to test scalability, query performance, and high availability, making it a robust foundation for modern social media applications.

UML
Make tweets: The user can create and post tweets using the Scalora system.
Like tweets: The user can like tweets that are part of the Scalora system.
Reply to the tweets: The user can respond to tweets by replying to them within the Scalora system.
ERD
An Entity-Relationship Diagram (ERD) represents the database structure, including entities, attributes, and relationships between them. This helps visualize how data is organized and how collections interact with each other in our NoSQL-based system.
Entities
🔹 Users: Represents the users of the platform, including attributes like username, email, password, and registration date. Users can follow other users and interact with tweets.
🔹 Tweets: Represents user-generated posts, containing attributes like content, and user_id (referencing the author). Tweets can be liked by multiple users.
🔹 Likes: Tracks interactions where users like tweets, linking users to the tweets they engage with. Attributes include user_id, tweet_id, and timestamp.
Relationships in the ERD
The relationships in our NoSQL-based system define how entities interact within the database. These relationships ensure efficient data retrieval and user interactions.
🔹 Users & Tweets (One-to-Many)
A User can create multiple Tweets, but each Tweet belongs to only one User (user_id references Users).
🔹 Users & Users (Many-to-Many, Self-Referencing)
Users can follow multiple other Users, and they can also be followed by others.
This creates a self-referencing many-to-many relationship stored in an array field (followers and following).
🔹 Users & Likes (One-to-Many)
A User can like multiple Tweets, but each Like is linked to one User (user_id references Users).
🔹 Tweets & Likes (One-to-Many)
A Tweet can receive multiple Likes, but each Like references only one Tweet (tweet_id references Tweets).
CRD
Models collections (groups of data) and their relationships in non-relational or hierarchical systems.
Focuses on flexible schemas, nested data, or unstructured relationships.
Used for NoSQL databases (e.g., MongoDB), APIs, or graph databases (e.g., Neo4j).
