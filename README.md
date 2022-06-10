# Project Overview

## Tracker App - Front-End

Link: (https://team2-tracker.github.io/tracker-client/)

## Prerequisites

    - Your front-end must use React and leverage the backend API.

    - You must use React Router to handle multiple views.

    - You must communicate with the back-end API RESTfully to Create

    - Read, Update, and Destroy resources (using either fetch or axios).
    
    - Your frontend must be responsive and work on mobile phones, tablets, and desktops


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

An interactive app that tracks Bugs/Issues and can assign them to users for comments and resolution. A clean, modern interface using MUI components and reactive styling to provide a seamless mobile-first experience.

## Wireframes
  
- [Mobile] (https://imgur.com/4FrNkU9) 
- [Desktop] (https://imgur.com/WnY3u33)
- [Time/Priority] (https://imgur.com/4CeQsy2)

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

#### MVP Goals

1. Create client repository
2. A home page that displays a table of bugs filtered by a query (All, Active, Closed)

        A. The table should sort the bugs by name, status, date, etc

        B. Each row on the table is a link to bring the user to a bug details page

        C. A + icon opens a form to add a new bug

        D. A button inside the row allows marking a bug complete

3. A bug details page displays all the details of the selected bug

        A. An edit button opens a form to edit any of the bug’s attributes

        B. A close button marks the bug closed

        C. An assign button brings up a list of users that can be assigned to this bug

4. User homepage/dashboard that displays all the users in a table with relevant information like number of bugs assigned, bug hours, etc
        A. Each user row in the table is a link to the user details page

        B. A + icon opens a form to add a new user (post MVP)

        C. A remove button for each user allows a user to be removed (post MVP)

5. A user details page displays all the details of the selected user
        A. An edit button to edit the user fields (postMVP)

        B. A delete button to remove the user - if admin, disable remove button (post MVP)

        C. An assign button brings up a list of unassigned bugs and will assign them to this user. (postMVP)

6. About page

        A. Headshots and bio details about each team member

        B. A link to each team-members portfolio website



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

        A. Change from table rows to cards
    
        B. Add avatar by user assigned
    
        C. Link to bug details displays in detail area instead of new page


## Functional Components

#### About: 

This component renders pictures and bios of team with links to every member's Personal Portfolio and Github.

#### Bug Form: 

This component contains the code that allows users to add and edit issues in the Tracker app. 

#### Details: 

This component contains the form's code that allows users to read, assign, edit, and close a created bugs details.

#### Enhanced Table Head: 

This component contains the code to map through the headCells array to create each header, sort when/where/what direction, the actual name of the heading, and creates the Table Heading with sort and list functionality.

#### Enhanced Table Toolbar: 

This component contains the code for the toolbar which contains the table header OR the selected bugs feature.

#### Filter Menu: 

This component contains the code for the filtering menu. It allows users to filter through all of the bugs and choose to show the following: All Bugs, Active Bugs, Closed Bugs, Assigned Bugs, and Unassigned Bugs.

#### Home: 

This component renders the Homepage of the Tracker App which contains the Top Nav Bar and Issues table.

#### Table Config: 

This component contains the code for the Column Names for Bugs and Users, starting with 3 of each to display at mobile, Issues, Dates Created.

#### Table Controls:

This component contains the code to Send PATCH requests to DB to change active status to FALSE, and GET requests to update all bugs.

#### Top Nav Bar: 

This component contains the code for the Top Nav which consists of the menu to navigate to the Bugs, Users and About pages.

#### Tracker Row: 

This component contains the codes which sets whichever row is selected by ID, and populate issues.

#### Users: 

This component renders a Log that provides information on all of the bugs assigned to specific users. 

#### Utils: 

This component contains CRUD functions.

## Code Snippet

This code snippet filters through bugs and selects only the unassigned bugs to be displayed on the table.

```js
if (menuType === 'unassignedBugs') {
		const unassignedBugs = allBugs.filter((bug) => !bug.assigned)
		menuArray = unassignedBugs.map((bug) => {
			return {
				id: bug._id,
				name: bug.bugName,
				userId: selected._id,
				bugId: bug._id
			}
		})
	}
```

## Issues and Resolutions

**ERROR**: Issue running npm run deploy. It was not working correctly. All it was displaying was the README.md.

                              
**RESOLUTION**: There were typos in package.json that caused the error. The changes were made, switched to main then ran npm run deploy. The following step was to check that our repositories "Settings" that the "Pages" branch is set to gh-pages. We were then able to successfully deploy.
