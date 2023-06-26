# URL-Shortener

## Project Description
URL-Shortener is a project that focuses on URL shortening and search optimization. It provides two main features:
1. **URL Shortening:** Users can input a full URL along with an optional note, and the program will generate a shortened URL for the input. This allows for easy sharing and tracking of URLs.
2. **Search Optimization:** Users can input a text that can be a full URL, a shortened URL, or a note. The program will search its database and display information such as the full URL, short URL, note, and the number of clicks on the shortened URL associated with the input.

## Project Dependencies and Usage
This project relies on the following dependencies:
* express
* mongoose
* ejs
* shortid

These can be installed by running the command:
`npm i express mongoose ejs shortid`

The project also uses a development dependecy **nodemon** in conjunction with the **devStart** script in the **package.json** file.
It can be installed by: `npm i --save-dev nodemon`

To start the program, run the command: `npm run devStart`

The application is running on port 5000, and can be accessed by the link [http://localhost:5000](http://localhost:5000)

## References
This project was completed by referring the following sources:
* YouTube Channel- [Web Dev Simplified](https://www.youtube.com/@WebDevSimplified) (For the basic working of an url-shortener)
* YouTube Channel- [United Top Tech](https://www.youtube.com/@unitedtoptech6288) (For setting up the MongoDB server)
