# server

This server takes a PORT environment variable. If not provided, it defaults to 3002.

```shell
PORT=3132 npm start
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Instructions

Implement server-side pagination, i.e. fetch one page of extractions from the server and display it, then when the user clicks next page, get the next page using the continuation token.

The server creates a database of extractions and runs an interval that adds and updates extractions randomly. It exposes an API that takes a limit (page size) and continuation token. Be aware bun is needed to run it.

Bonus challenge: add polling so we receive the updates from the server.

Extra: The API is not well supported for that case, suggest ways in which the API could be improved to make things easier for the UI side.
