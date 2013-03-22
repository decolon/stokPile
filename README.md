This is the latest stokPile prototype.

See TODO's for planned next steps and fixes

Site Wide TODO:
---------------------------------------------------------
Figure out heroku deployment
Figure out batch upload to server database
Migrate to Postgresql
Figure out how to set primary keys, table joins, and indexing in sequalize
Change Database to better account for auto created fields (id, createdAt, updatedAt)
Build delete/update account functionality into site
Build cookie functionality into site
Make more helpful error messages
Form validation
Look and feel (don't just slap on Bootstrap)
Redesign Logo
Better page navigation (back arrow should always do what you think it will)
More powerful ng-views, possibly use angularjs-ui
Separate users, can currently log in as other user by changing url
More elegant code separation, use angualr services and directives
Seperate controllers more, not all in one file
Load data once and cache it, don't ajax every time
Make investments and sales affect liquid assets
Make investments and sales rely on other users, aka don't make them automatically go through
Compute Net Worth for each user
Change to user the minified jquery and angular (only import what is needed)
Implement tests for everything
Error handling
