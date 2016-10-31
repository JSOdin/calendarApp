Calendar app

Before running tests
-run 'npm install'

Running tests
-there are a couple of tests for the root app and calendarBuilder
-run 'karma start'

Libraries and frameworks used
-bootstrap
-angular
-momentjs

Brief overview of calendar components
-calendarBuilder: the heart of the application. builds the days and weeks for each calendar month
-calendarData: houses the calendar months data
-calendarInterface: communicates with the view, calendarBuilder and calendarData
-events: shows events and weather forecast for a particular day

Reason for including all partial templates onto index.html as ng-templates
-app needs to work by opening index.html
-angular cannot fetch partial html files without a localhost webserver
-however there are separate templates in folders if needed when giving relative paths to templateUrl

Limitations
-each month is an object and has the property "weeks". weeks is an array that contains "week" objects. each week object has a property "days". each day is an object with a
"moment" and "events" property.
-all of the calendar months generated are stored in calendarData as calendarData.months object. each of its properties is an object
with a "timestamp" key made of the month index + that month's year. for ex. October 2015 ==> "92015"
-each month data may not necessarily contain only the month's days. it will contain whichever day is needed to generate the full calendar month view.
-for ex. the "october" month's first week will contain dates from September.
-because of this duplication of weeks, days for only the current calendar month will have event input enabled.
