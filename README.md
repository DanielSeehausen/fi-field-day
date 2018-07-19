# Flatiron Field Day

## General

This repo houses A hackathon-esque application for FI students. Students interface programmatically with some personal, interpersonal, and meatbag v machine competitive programming.

If you are programming for the project, or interested in what it emulates in features (if not implementation and interaction) please check out what this is based off of:
  - **i'm a sloth**: [wiki](https://en.wikipedia.org/wiki/Place_(Reddit)
  - **i'm just lazy**: [the team's blog](https://redditblog.com/2017/04/18/place-part-two/)
  - **i'm a glutton for information**: [the OG /r/place](https://reddit.com/r/place)

If you are programming the **server**, the **user-node-client**, or the canvas on **browser-board-client**, [this is an excellent read and will make your mind dank for programming this project.](https://redditblog.com/2017/04/13/how-we-built-rplace/)

#### When

September 1st

#### Who

**General:** ? Used to be May
**Marketing:** Who wants project lead?
**Programming:** Who wants project lead?
**Operations:** Who wants project lead?

#### History

We did this once in the summer of 2017 for students at the manhattan campus. It was an early and rushed iteration, but a big success in turn out and feedback. We are looking to greatly improve this with a bigger team, better code, and more hype. Ideally, this will be beta for something we extend to all campuses + online in the future. 

## Apps

There are 4 discrete apps that make up the entire experience. They stand alone and, assuming standard I/O for testing, should be able to operate independently. 

#### Browser Achievements/Statistics Client

React client for the users to display:
  - Possible Achievements
  - Awarded achievements (by group)
  - Ongoing game/board statistics


#### Browser Board Client

React client for the users to display:
  - The actual board in real time
  - A simple color picker and click handler to change a tiles color


#### User Node Client

Node client responsible for:
  - connecting to servers ws
  - spinning up in-memory store for board
  - fetching current board state on init
  - handling ws pushes for board updates and updating local store
  - wrapping http requests to server (i.e. setting tiles) in an api
  - providing 'first line of hackathon me please defense' via rate limiting
  - providing instructions and plug and play environment for interacting with the experience

#### Server

Before in node, hopefully 

###### Node (old)

###### Elixir (new)

#### Bots

Simple scripts that will act as clients (perhaps with special permissioning/rate limiting) an automate some action on the board. This is where the meatbag v. machine comes into play.
