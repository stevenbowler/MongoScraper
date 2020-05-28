# MongoScraper
Scrape Media Sources for Desired Content, Save Favorites, and Add Comments in MongoDB Atlas

### Overview
This is a media scraper app that enables the user to search for the most popular books based on the most popular topics found on [GoodReads](https://www.goodreads.com/).  Users can search, save and recall their favorite books, as well as add and delete discussion notes to each of the saved books.

This program was developed by Steven Bowler for the purpose of gaining experience developing a full-stack app employing best-practices for executing the [Model-View-Control](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (MVC) software development pattern.  Additionally, the project provides this programmer the opportunity develop skills in creating and deploying a functional full-stack app on [Heroku](https://www.heroku.com), integrating [Express-Handlebars](https://www.npmjs.com/package/express-handlebars), [ExpressJS](https://www.npmjs.com/package/expressjs),[Mongoose](https://www.npmjs.com/package/mongoose), [Cheerio](https://www.npmjs.com/package/cheerio), and [Axios](https://www.npmjs.com/package/axios). _*`Enjoy`*_.


### User Documentation

First, watch this video: _*[MongoScraper](https://drive.google.com/file/d/1pzUBSZg4KaiCQ60Ek7ZqCRA2339XRa8-/view)*_.

Then, read the instructions and see the clips below

To use the app click [MongoScraper](https://cryptic-brook-08326.herokuapp.com/)

User can trigger one of seven actions: 

1. _*`Scrape`*_ dropdown from navbar initiates /scrape/topic route based on choice of topic.
2. _*`Save`*_ button to save a scraped book to the saved list collection.    
3. _*`View Saved`*_ from navbar to view books from the saved list collection.
4. _*`Delete`*_ button to delete a saved book from the saved list collection.
5. _*`Notes`*_ button to view notes associated with a saved book.
6. _*`Submit`*_ button to add a new note associated with a saved book.
7. _*`Delete`*_ button to delete a note associated with a saved book.


### Program Documentation
[Click here](https://stevenbowler.github.io/MongoScraper/docs/index.html) to see full program documentation in [JSDOC](https://www.npmjs.com/package/dotenv).

Deploy app thru [Heroku](https://www.heroku.com) with MongoDB Atlas.  

Program requires setting Heroku Environment variable process.env.DB_CONNECTION for connection to Mongo DB Atlas in Production.  Recommend use [dotenv](https://www.npmjs.com/package/dotenv) package and in project root directory `.env` file should have this: 
````
DB_CONNECTION=your_mongo_db_access_URL
````


App executes the MVC software pattern in the following manner:
1. Initiate _*`server.js`*_
2. Serve _*`index.handlebars`*_ with current saved books collection from MongoDB Atlas.
3. Everything is event driven from events in [scraper module](https://stevenbowler.github.io/MongoScraper/docs/module-public_assets_js_scraper.html).



Main module documentation and references can be accessed [here](https://stevenbowler.github.io/sequelizedBurger/docs/index.html).  Global scope variables can be accessed [here](https://stevenbowler.github.io/sequelizedBurger/docs/global.html), 



Directory structure is as follows:

```
.
│ 
├── controller
│   └── routes.js
│
├── docs
│
├── models
│   └── index.js
│         └── Book.js
│         └── Note.js
│ 
├── node_modules
│ 
├── package.json
│ 
├── jsdoc.json
│
├── public
│   └── assets
│       ├── css
│       │   └── reset.css
│       └── img
│       │   └── none
│       └── js
│           └── scraper.js
│
├── server.js
│
└── views
    ├── index.handlebars
    ├── scrape.handlebars
    └── layouts
        └── main.handlebars
```

