# RaaG (Résumé as a Game)

I want to host a client-side side-scroller game on a Raspberry Pi that functions as my résumé.

I just bought my domain, so that's good.

There are two parts to this- game mechanics and content.

## Game mechanics

  I'd like to avoid using HTML5 Canvas to build the game (because it would be way cooler). That would involve lots more work though, and I doubt there would be any cross-browser compatibility.  So I'll use HTML Canvas. 

  It's been a few years since I've messed with Canvas, so I'll need to start from scratch. 

### Gameplay
  
  I see this as a side-scroller similar to _Super Mario Bros_. The game will involve multiple levels that share the same gameplay.
  
  Unfortunately, I don't want this game to be difficult because I want people to actually get through my résumé. So I've got some decisions to make: 

  - Will 'death' be possible? 
    - Will there be NPCs/bots that can hurt the player? 
    - Can the playing field cause death (ie Pit of Doom, etc)? 
    - How many lives? Would death restart the game or the level?

  - Answering the above question, I think death should be possible, but only if levels are short enough to reset without being too big of a hassle. THe hero should have infinite lives. 

### Actions

  Actions will include `left`,  `right`, `duck`,and `jump`. 

  Obviously I'll bind key-presses. I think sideways movements should happen in intervals, so a single key-press will move a considerable predefined distance. Think _Pokémon_ more than _Super Mario Bros_, but we'll have to see. 

### Levels

  Levels are exactly what you think- individual parts of the same game. The only real question to answer is how to transition between levels. 

  If there will be more than one level, then user 'death' should be possible. Once at a certain level 'start point' has been reached, it will become the new hero spawn point. Then there will need to be some transition to reset the screen to this point. 

### Canvas

  I reckon the canvas will need to be the entire size of the browser. All other information can probably be laid over top of the canvas

## Content

  The game is a progression through my life. But should it follow the entirety of my life, or my life since I started CS? Not sure. 

  I'm currently leaning towards entire life (just so I can include non-CS events, like getting married).

  I've got notes for this, but I'm not going to include them now. 