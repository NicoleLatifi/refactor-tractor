# Refactor-tractor FitLit
#### Mod-2 Group Project by Aaron Burris-DeBoskey, Nicole Latifi & Naomi Ware.

In this project, we refactored a pre-existing codebase that displays a users sleep, activity and hydration data and compare it to the data from other users.

### Learning Goals

For this project, our learning goals were to:
* take an app that was created by other students and refactor that app to create DRY code that aligned with SRP.
* organize existing files to be compatible with `Webpack`.
* ensure that the code meets ARIA accessibility standards.
* use `fetch` API to import data from a server rather than using the datafiles included with the code.
* utilize `chai-spies` to test DOM manipulation.
* refactor the existing `CSS` into `SCSS`.

### View the app in action!
![Profile button is clicked and dropdown is displayed; step card buttons are clicked and step data is displayed](src/images/refactor-tractor.gif)

### Setup/Install:

* open your terminal and clone the repo using `git clone git@github.com:NicoleLatifi/refactor-tractor.git`.
* `cd` into the repository and open it in your favorite text editor.
* from the root of this directory, run `npm install` to download the dependencies.
* to get dependencies for testing with chai-spies, run `npm install chai-spies`.
* if you would like to run tests, run `npm test` from the root directory in your terminal.
* to launch the application run `npm start` and navigate to `http://localhost:8080/` in your favorite browser.

### Wins:

* utilizing debugger in DevTools rather than console log for troubleshooting problems with the codebase.
* using the Lighthouse extension to audit the app and improve the accessibility rating from a score of 35 to a score of 100.
* learning how to use fetch to obtain data from an API and managing asynchronous function calls.
* employing `chai-spies` to test DOM manipulation.
* strong teamwork in the face of adversity.


### Challenges

* early in our process, during an attempted git merge, differing dependency files created a disasterous conflict that forced us to abandon the repo and start over.
* working entirely remotely, with strong time constraints during the global pandemic and civil unrest of 2020 presented unique difficulties.
* although we were ultimately successful, while trying to implement the `fetch` web API, we ran into difficulties in managing asynchronous operation, which took us longer than expected.



#### Contributers

* [Aaron Burris-DeBoskey](GitHub.com/Abdeboskey)
* [Nicole Latifi](GitHub.com/NicoleLatifi)
* [Naomi Ware](GitHub.com/nware1066)
