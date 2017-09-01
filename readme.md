## What is this?

Just you wait folks!

## Sample Data

To load sample data, run the following command in your terminal:

```bash
npm run sample
```

If you have previously loaded in this data, you can wipe your database 100% clean with:

```bash
npm run blowitallaway
```

That will populate 16 stores with 3 authors and 41 reviews. The logins for the authors are as follows:

|Name|Email (login)|Password|
|---|---|---|
|Wes Bos|wes@example.com|wes|
|Debbie Downer|debbie@example.com|debbie|
|Beau|beau@example.com|beau|

## Learning Notes

### Set-up

|Online service|Local|
|---|---|
|DataBase as a Service(DBaaS), like [mLab](https://mlab.com)|MongoDB|

Inside the start.js file:

1. Use [dotenv](https://www.npmjs.com/package/dotenv) package so that we can import sensitive information stored in environmental variables from our variables.env file
2. Connect to the database and handle an bad connections
3. Start the app and listen on port 7777

### Core concept

**Routing**

```javascript
const express = require('exporess');
const router = express.Router();

// res.send / res.json / res.render / res.redirect
router.get('/', (req, res) => {
  // we can pull data from the URL, like www.domain.com?name=kevin%age=30
  res.json({
    name: req.query.name,
    age: req.query.age,
  });
});

// or put variables in the routes, like www.domain.com/reverse/kevin
router.get('/hello/:name', (req, res) => {
  res.send(req.params.name);
});
```

**Templating**

1. Set up templating engine

```javascript
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

2. :fire: Sometimes we need to use some *data*, *function* or *libraries* for every single request. So we can put all of them inside helper.js. Then, inside the app.js we can use middleware to pass certain information to *res.locals* for every single request.

```javascript
// middleware in app.js
const helpers = require('./helpers');

app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});
```

4. callback, promise and async / await

  ```javascript
  // callback
  Todo.create(req.body, (err, todo) => {
    if(err) throw new Error(err);
    Store.find({}, (err, todos) => {
      if(err) throw new Error(err);
      res.render('todoList', { todos });
    })
  });

  // promise
  Todo.create(req.body)
    .then(() => Store.find())
    .then(todos => res.render('todoList', { todos }))
    .catch(err => throw new Error(err));

  // async & await
  try {
    await Todo.create(req.body);
    const todos = await Todo.find();
    res.render('todoList', { todos });
  } catch(err) {
    throw new Error(err);
  }
  ```

5. Flash messages: flash always show on the next request.

```javascript
const flash = require('connect-flash');
app.use(flash());

app.use((req, res, next) => {
  // pull out the flashes and then put into the locals
  // What are locals?
  // locals are the variables that are available to you in the templates
  res.locals.flashes = req.flash();
  next();
});

// success, error, warning, info
req.flash('success', `Successfully Created ${todo.title}`);
```

6.
