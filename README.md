# Tourism_App

## Overview
This is an application for people to see what events are going around in East Village (or further away in NYC area)

## How to use the website 
-click on the Event and the Map with the location will pop up!

*** Make Sure that you have your location services are turned on! ***

## How to Deploy Locally
1. clone the project
2. ```npm init```
3. [Go to the following spot in the code and add your Yelp API Key](https://github.com/traumasv/Tourism_App/blob/e2efbf10cf874bebdf9f0e71e400dcdc254428c7/index.js#L72)
4. [Go to the following spot in the code and add your Google Map API Key](https://github.com/traumasv/Tourism_App/blob/e2efbf10cf874bebdf9f0e71e400dcdc254428c7/index.js#L149)
5. ``` npm i --save ```
6. ``` npm run test ``` (to build with Parcel)
7. ``` npm run start ``` (to run express server)

[Link to Deployed Website](https://whatsupineastvillage.herokuapp.com/)

[Wireframe](https://docs.google.com/document/d/1BDCdZA4ewYOwiy5oX22tFIT31OnX4XFlcClIpfScE-0/edit?usp=sharing)
[Site Map](https://docs.google.com/drawings/d/18bldMvCOfeZZasUu2jpNd1i24B6fxa2MLSWLfDd0fiU/edit?usp=sharing)

## Resources Used:
1. Parcel Package Manager
2. Yelp API Endpoint
3. google-map-react module (for the maps)
4. React

## Coming Soon:
- Improve Visual of Website with Bootstrap
- Improve load time by caching the Yelp API data
- Error Messaging (Making sure that the client has location services turned on / help client turn it on)
