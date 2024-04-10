# Server

No specific order is required to start the servers. The app will work with either both or no servers running.

```shell
VITE_EXERCISE_1_API_URL=http://localhost:3001/ VITE_EXERCISE_2_API_URL=http://localhost:3002/ npm run dev # Start the app
PORT=3001 npm start --prefix ./exercise1 # Start the exercise 1 server
PORT=3002 npm start --prefix ./exercise2 # Start the exercise 2 server
```

To shorten the app command, you can run set the following in a `.env`:

```
VITE_EXERCISE_1_API_URL=http://localhost:3001/ 
VITE_EXERCISE_2_API_URL=http://localhost:3002/
```

Then you can run the app with `npm run dev`.
