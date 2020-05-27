# MongoScraper
Scrape Media Sources for Desired Content, Save Favorites, and Add Comments in MongoDB Atlas

### Overview
This is a media scraper app that enables the user to search for the most popular books based on the most popular topics found on [GoodReads](https://www.goodreads.com/).  Users can search, save and recall their favorite books, as well as add and delete discussion notes to each of the saved books.

This program was developed by Steven Bowler for the purpose of gaining experience developing a full-stack app employing best-practices for executing the [Model-View-Control](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (MVC) software development pattern.  Additionally, the project provides this programmer the opportunity develop skills in creating and deploying a functional full-stack app on [Heroku](https://www.heroku.com), integrating [Express-Handlebars](https://www.npmjs.com/package/express-handlebars), [ExpressJS](https://www.npmjs.com/package/expressjs),[Mongoose](https://www.npmjs.com/package/mongoose), [Cheerio](https://www.npmjs.com/package/cheerio), and [Axios](https://www.npmjs.com/package/axios). _*`Enjoy`*_.


### User Documentation

First, watch this video: _*[MongoScraper](https://drive.google.com/file/d/1pzUBSZg4KaiCQ60Ek7ZqCRA2339XRa8-/view)*_.

Then, read the instructions and see the clips below

To use the app click [MongoScraper](https://cryptic-brook-08326.herokuapp.com/)
1. User onclick event triggers one of six actions: Scrape, View Saved Books, Delete Saved Book, Add Saved Book, Create Note, Delete Note.
2. "Scrape" dropdown from navbar initiates /scrape/topic route based on choice of topic.
3. User can chose to "Save" a scraped book to the saved list collection in MongoDB Atlas.
4. User can chose to "View Saved" books from the saved list collection in MongoDB Atlas.
5. User can chose to "Delete" a saved book from the saved list collection in MongoDB Atlas.
6. User can chose to view "Notes" for a saved book from the saved note collection in MongoDB Atlas.
7. User can chose to view "Submit" a new note associated with a saved book in MongoDB Atlas.
8. User can chose to view "Delete" a note associated with a saved book in MongoDB Atlas.


### Program Documentation
Program is documented in [JSDOC](https://stevenbowler.github.io/MongoScraper/docs/index.html)

Deploy app thru [Heroku](https://www.heroku.com) with MongoDB Atlas.  

Program requires setting Heroku Environment variable process.env.JAWSDB_URL from Heroku CLI
````
heroku config:set DB_CONNECTION=your_mongodb_atlas_url
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
├── db
│   ├── schema.sql
│   └── seeds.sql
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

