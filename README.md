# millhouse

A place to browse and buy your favorite Cheerios products
You can view the website [here](https://millhouse.herokuapp.com)!

## Running the app

Make sure you have Postgres running!

```
$ git clone https://github.com/jennyrchan/millhouse
$ cd millhouse
$ npm install
$ npm run seed
$ npm run build-watch
```

And then in another terminal window, run:

```
$ npm start
```

`npm start` doesn't build, so watch out for that. The reason it doesn't build is because you probably want to watch the build and run me in separate terminals. Otherwise, build errors get all mixed in with HTTP request logging.
