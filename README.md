# Jova ToDo App

This is a simple cookie based ToDo list application. Purely developed with ReactJS, HTML and CSS. I am using node and npm to manage packages. Also I am using gulp and browserofy to build and convert JSX into JS.
If you want to modify the code somewhere, you need to install the required packages,
```sh
$ npm install --save
```
and then run
```sh
$ node_modules/gulp/bin/gulp.js
```

All the library used are mentioned in package.json file.
  - Mostly styles are defined as JSON format following ReactJs's standard.
  - HTMLs are written in JSX format following ReactJs's standard.
  - For UI, I am using material UI library for React. http://www.material-ui.com/
  - For references, I followed https://facebook.github.io/react/

Features:
  - One can create a group of task
  - Add task in that group
  - Mark them done or undone
  - Change the order of the task based on priority
  - Delete a task in a group
  - Delete a group of task

Note:
> The entire project is front end based, and there is no use of APIs or backend service anywhere.
> For data storing, I am using browser's cookie with a validity of 365 days.
> Because of this I am limited to these features. Also, I tried to maintain it with git to highlight the progress.

### Version
1.0.0