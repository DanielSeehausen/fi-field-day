# Flatiron Field Day Matrix Manager

Hello and welcome to the first ever Flatiron Field Day! Today, you and your team will have the opportunity to create a mosaic using your programming skills.

Right now, we are hosting a server that stores a board full of tiles, and it is the job of your team to write scripts that will allow you to set the color of individual tiles, thus painting your masterpieces for all the world to see. A local Redis server will be running on your machine that will store a live copy on your machine and will be receive updates everytime the main board is updated. If you have no idea what Redis is, first: look it up!, second: don't worry about it! We've given you some code that will handle this part - you only have to do a few things:

1. Install Redis
* In your terminal, enter `brew install redis`

2. Run Redis
* Once the installation is complete, you can start your Redis server by simply entering into your terminal `redis-server`

3. Install our handy [FFD-Student-Socket](https://github.com/learn-co-curriculum/ffd-student-socket)
* Clone down this repo and `cd` into it. Run `npm install` to install all dependencies.

4. Run our handy [FFD-Student-Socket](https://github.com/learn-co-curriculum/ffd-student-socket)
* To get started, simply run `npm start` in your terminal. This program will automatically update your local Redis database for you, so simply set it and forget it!


Now that you've got that setup, the next step is to install your **Matrix Manager** Ruby client. This piece of code has methods that will allow you to read information from your Redis database, as well as interact with the server that hosts the main board.

To get started, please do the following:

_First, if you would rather use Javascript than Ruby, switch over to [this](https://github.com/learn-co-curriculum/FFD-Student-JS-Client/) repo!_

1. Install our nifty **Matrix Manager**
* Clone down this repo and `cd` into it. There are two important files: `app.rb` and `MatrixManager.rb`, but you will mostly code in `app.rb`. Run `bundle install` to install all dependencies.

2. Set your team ID
* Inside `app.rb`, you will notice a very conspicuous String that says `ENTER TEAM ID HERE`. Do this.


With that all setup, take a look at `app.rb`. Inside, you will notice a space for you to write your code right underneath the instantiation of a `Matrix` object. This `Matrix` object is a package of all methods needed to interact with Redis and the server that hosts the board. A "point" in the following code refers to a coordinate on the board and can be considered a hash with x and y properties. For instance, the point in the upper left hand corner can be thought of as, `{x:0,y:0}` and the point to its right can be considered `{x:1, y:0}`.A list of available methods is as follows:

1. #read

`read` allows you to programatically access information about the colors of tiles on the board. It takes one argument: a single point or an array of points you want to read

```ruby
matrix = MatrixManager.new(teamID)

#Returns a hash containing the color stored at coordinate (0,0)
matrix.read({x:0, y:0})

#Returns an array of the colors stored at coordinates (0,0), (1,1), and (1,2)
matrix.read([{x:0, y:0}, {x:1, y:1}, {x:1, y:2}])
```

2. #read_rect

`read_rect` allows you to read an entire rectangle on the board. It takes two arguments: a start point, an end point. Useful for accessing a whole block or line of the board.

```ruby
matrix = MatrixManager.new(teamID)

#Returns the colors stored in all tiles within the rectangle with an upper left corner at (1,1) and a lower right corner at (4,6)
matrix.read_rect({x:1, y:1}, {x:4, y:6})
```

3. #set

`set` will allow you to write to a single point or many points. It takes two arguments: a point or an array of points as the first and a string representing the color as a hexidecimal as the second. If coloring many tiles, the color given will be applied to all tiles unless the hash specifically has a color property. This allows you to apply a color to many tiles, while selectively applying different colors to others.

```ruby
matrix = MatrixManager.new(teamID)

#Colors the tile at (3,4) white
matrix.set({x:3, y:4}, "FFFFFF")

#Colors tiles at (5,6) and (13,2) white while making the tile at (8,12) blue.
matrix.set([{x:5,y:6}, {x:8, y:12, color:"4286f4"}, {x:13, y:2}], "FFFFFF")

```

4. #set_rect

`set_rect`, you guessed it, allows you to set the color for a rectangle. It takes three arguments: a starting point, an ending point, and a color.

```ruby
matrix = MatrixManager.new(teamID)

#Applies a blue color to all tiles within the rectangle with an upper left corner at (1,1) and a lower right corner at (4,6)
matrix.set_rect({x:1 ,y:1}, {x:4, y:6}, "4286f4")

```

To run the scripts you write in `app.rb`, simply enter `ruby app.rb`, and your code will run!

And that's all you need to interact with the board! Feel free to combine methods, for instance, to selectively change tiles when they meet a certain criteria (e.g. turn all white tiles in an area blue). This action requires both reading from the board **and** writing to it.
