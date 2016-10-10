# simple-redux-movies
A simple redux tech demo allows for searching an external API and returning movie information

## Execution
After downloading, run the following commands
```
npm install
npm start
```
Go to http://localhost:3000/ in a browser to see the application

## Architecture
This Redux app is designed to reduce the number of calls to the 3rd party API. It tries to avoid hitting any rate limits by storing retrieved movies as part of an evolving result set. If a search is re-run, the existing results (and their last updated date) are displayed.
The application attempts to further reduce traffic overhead by 'debouncing' as the search term is typed. Only after a brief pause in typing will the search begin.
Toggling the full details of each result is handled by the component holding the individual item, using a local state, rather than utilizing Redux's global states. This makes for a cleaner & leaner code base, with less dependencies
Sorting is currently only handled on demand, but could be easily updated to store the users choices between searches.
