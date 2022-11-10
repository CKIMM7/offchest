***Assignment title***<br>
OffChest

***Installation & usage***<br>
Clone or download the repo.
Open terminal and navigate to the root directory

To Install
npm install

To Run
npm run start or
nodemon server.js

***log***<br>
started with a barebone with express with some existing functions,
frontend logic was rewritten for the project


***Bugs***<br>
its not a bug but would like to user inputs to be cleared when going back.
ive tried .textcontent = ''; does not work
htmlelement.reset(); does not work 


***Wins & Challenges***<br>
wins:
all the functions work as in:

When a user hits ‘publish’, the post should be stored in a database and the client redirected to a show path

backend logic is the same as our previous projects

challenges:
had trouble matching the path with the server&client side using displayGlobal function

questions:
why json files get greyed out if folder name is db, which is why i changed to db
heroku somehow thinks this is a node module...



