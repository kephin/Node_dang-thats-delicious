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

Notes:
1. Use [dotenv](https://www.npmjs.com/package/dotenv) package for storing sensitive information.
2. Create a helpers.js file to pass certain information to res.locals
3. There are route-specific middleware and global middleware

  ```javascript
  // route-specific middleware:
  router.get('/', storeController.middleware, storeController.homepage);
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

5. Flash messages

```javascript
const flash = require('connect-flash');
app.use(flash());

// success, error, warning, info
req.flash('success', `Success Create ${todo.text}`);
```


