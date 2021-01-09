# Generate File System

Generates a file system for JS projects.

You will need to `npm link` to create the `generate` command.

`generate PROJECTNAME` will create a simple JS directory of that name, generate a `package.json`, `git init`, `.gitignore`, `README.md`, `esintrc.json` and `__tests__` directory.

`generate PROJECTNAME -s` will create an express server file directory, along with the above will add `listen.js`, `server.js` files, and `controllers`, `routers`, `models`, `db` directories along with seed files, sql and test.sql files.

Also adds some relevant dependencies to the `package.json`, run `npm install` to install.
