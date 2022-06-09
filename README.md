# Project Overview

## Tracker

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Friday / Saturday / Sunday| Project Worksheet, Wireframes, Time /Priority Matrix | Complete
|Monday| Initialize repos, Create API, Create skeleton React App components | Complete
|Tuesday| Finish API MVP, Build out all React bug bomponents (No styling), Stretch - Get users to reuse bug components  | Complete
|Wednesday| Build out React User components, Style App, Host Back-End and Front-End | Complete
|Thursday| Resolve bugs, More styling, Post MVP goals | Partially Complete
|Friday| Present | Incomplete


## Project Description

An interactive app that tracks bugs/issues and can assign them to users for comments and resolution. A clean, modern interface using MUI components and reactive styling to provide a seamless mobile-first experience.

## Wireframes

Include images of wireframe with a description of the specific wireframe.   

- [Mobile](https://i.imgur.com/P3iBEZf.jpg)
- [Desktop](https://i.imgur.com/xpOWo0E.jpg)

Wireframing Resources:

- [Figma](https://www.figma.com/)


## Time/Priority Matrix 

|  Key | Feature | Time | Priority
|---|---|---|---|
| A | Create React | 30 min | 9
| B | Create skeleton of React components, successful API fetch | 1 hr | 8
| C | React Bug Home component  | 4 hr | 7
| D | React Bug Details component | 4 hr | 7
| E | React User component | 4 hr | 7
| F | React User Details component | 4 hr | 7
| G | React About page with pictures, bios & links | 4 hr | 6
| H | React MVP styling | 8 hr | 6
| I | React Dashboard component | 8 hr | 4
| J | React dynamic styling to color bugs by priority | 2 hr | 5
| K | React Search form | 2 hr | 2
| L | React Comment functionality| 4 hr | 3
| M | React Desktop styling changes | 8 hr | 5
| N | React Sign-In functionality | 4 hr | 1
 

#### MVP

1. Create React
2. Create skeleton of React components, successful API fetch
3. React Bug Home component
4. React Bug Details component
5. React User component
6. React User Details component
7. React About page with pictures, bios & links
8. React MVP styling

#### PostMVP 

1. Add comments to bugs that display in bug details
2. Dashboard page that displays bug metrics
    A. New bugs this week
    B. Bugs closed this week
    C. Bug hours assigned per user
    D. Bug hours by area / subject
3. Add dynamic styling to color bugs by priority
4. Add countdown timer / past due status to bugs -> makes highest priority
5. Add authorization / sign in to require credentials for editing
6. Add search form
7. Add desktop styling changes:
    A. Change from table rows to cards?
    B. Add avatar by user assigned
    C. Link to bug details displays in detail area instead of new page


## Functional Components

About: This component renders pictures and bios of team with links to every member's Personal Portfolio and Github.
BugForm: 
Details: This component contains the code that allows users to read, assign, edit, and close a created bugs details.
Enhanced Table Head: 
Enhanced Table Toolbar:
Filter Menu:
Home: This component renders the Homepage of the Tracker App which contains the Top Nav Bar and Issues table.
Table Config:
Table Controls:
Top Nav Bar: This component contains the code for the Top Nav
Tracker Row:
Users:
Utils: 

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object
