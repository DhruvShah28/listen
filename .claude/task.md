we will create a class called intent to catch the intent of the user and from the voice input we will break dowwn what he wants (for now only weather and temprature in future we may add more)

I also want to break the core logic and keep it simple for the call statement.

for the temprature we can catch for the phreses like tonight, afternoon, evening and all other and based on that show temperature

now for each and every logic we will have either a function or what ever you create to get the details based on the input once all the info has been gather we will only have 1 call funtion with multiple parametters where all the parameters will be filled based on the user input

for eg if the user asks for "what will be the temprature tonight" 1 function will get the time, another will select temprature card and then based on that the parameterwill change and call from the api

## Changes

changes required are if we ask for the weather dont show the tempreature first show other relevant details and then the min temp and max tempreature
