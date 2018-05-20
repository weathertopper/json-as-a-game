# JaaG (JSON as a Game)

Instead of building a Résumé-as-a-Game (as I originally planned), I will take the easier route and build a full-out side-scroller game 'engine'. 

I say 'engine'... but that's a little strong. I will define a list of possibilities, actions, roles, etc. Then, a game can be created with nothing but a JSON configuration file (a BIG configuration file). 

I will keep the `game_config.js` template here for reference.

```js
let game_config = {
  'hero': `{game_object}`,
  'playing_level': str,
  'frame_rate': num,
  'movement': {
    'actions' : { 
      'left' : num,  
      'right': num,
      'jet'  : num,
      'jump' : num,
      'duck' : num,
      'shoot': num
    },
    'jet' : {
      'start_vel' : num,
      'delta_factor': num, // not currently used
      'vel_cap': num,
      'timeout': num
    },
    'jump' : {
      'start_vel' : num,
      'delta_factor': num,
      'vel_cap': num,
      'timeout': num
    },
    'apex' : {
      'frame_count' : num,
      'timeout': num
    }, 
    'fall' : {
      'start_vel' : num,
      'delta_factor': num,
      'vel_cap': num,
      'timeout': num
    },
    'x_interval' : num
  },
  'levels' : {
    '{level_id}' : {
      'objects' : {
        'background' : {
          '{game_object_id}': '{game_object}',
          '{game_object_id}': '{game_object}',
          ...
        },
        'arena' : {
          '{game_object_id}': '{game_object}',
          '{game_object_id}': '{game_object}',
          ...
        }
      }
    },
    ...
  }
}
```

## `game_config` Notes
- `hero` : This is you! See below
- `playing_level`:`level_id` referencing the level where `hero` should spawn. *DEFAULT VALUE: FIRST LEVEL IN SET* **NOT IMPLEMENTED YET**
- `frame_rate` :  Time (in ms) between refreshes 
- `movement.actions` : `keyCode`s, found [here](http://keycode.info/). Set any undesired actions to `null` (i.e. no shooting? `shooting:null`). *KEYCODES MUST BE UNIQUE*
- `movement.jump.start_vel` : Pixel count moved on first frame after `jump` action
- `movement.jump.delta_factory` : Factor (< 1) at which `jump` velocity slows 
- `movement.jump.vel_cap` : Minimum pixel count allowed, triggers end of `jump`
- `movement.apex.frame_count`: Number of frames without vertical change between `jump` and `fall`
- `movement.fall.start_vel` : Pixel count moved on first frame after `fall` action
- `movement.fall.delta_factory` : Factor (> 1) at which `fall` velocity speeds up
- `movement.fall.vel_cap` : Maximum pixel count allowed during `fall`
- `movement.x_interval` : Pixel count moved on `left` or `right` action
- `levels`: set of `level` objects
- `{level_id}`: Arbitrary string name of level (must be unique)
- `levels.{level_name}.objects.background`: Set of `game_object`s within given level that cannot interact with `hero`, surroundings, and enemies
- `levels.LEVEL_NAME.objects.arena`: Set of `game_object`s within given level that can interact with `hero`, surroundings, and enemies
- `{game_object_id}`: Arbitrary string name of `game_object` (must be unique)
- `{game_object}`: See below

## game_object Notes

### Possible Attributes
- `color`: Any color allowed in HTML
- `lives`: *`hero` ONLY* number of lives `hero` has before end of game. Use `-1` for infinite lives **NOT IMPLEMENTED YET**
- `in_relation`: *OPTIONAL*- `game_object_id` reference to another `game_object` within the same level. Used for relative positioning. The `game_object` referenced must be listed before the `game_object` referencing it. Assume the `hero` `game_object` is the last object in the set. **NOT IMPLEMENTED YET**
- `bottom`: Pixel count from bottom of object to bottom of window (or object, if `in_relation` defined
- `left`: Pixel count from left of object to left of window (or object, if `in_relation` defined
- `width`: Width of object in pixels,
- `height`: Height of object in pixels,
- `static_position`: *OPTIONAL*- Boolean determining if object moves when hero moves. *DEFAULT VALUE: `false`*
- `has_gravity`: *OPTIONAL*- Boolean determining if object affected by gravity. *ONLY VALID FOR OBJECTS INSIDE `arena`. DEFAULT VALUE: `false`*

  // jumping: false, // add this at start up for all objects in arena w/ `has_gravity` = true (then remove here)
  // falling: false // add this at start up for all objects in arena w/ `has_gravity` = true (then remove here)

### CONSTANTS

The object `CONSTANTS` will have a set of values usable in `game_config`. `CONSTANTS` is as follows: 

- `CONSTANTS.WINDOW_HEIGHT` : height of window at page load
- `CONSTANTS.WINDOW_WIDTH` : width of window at page load
```

### Mutator Methods

```js
getConfig(...args)
```
returns attribute value found at `game_config[args[0]][args[1]]...[args[n]]`

```js
setConfig(updated_val, ...args)
```
sets `updated_val` at `game_config[args[0]][args[1]]...[args[n]]`



**README UPDATES TO MAKE:**
- adding explaination for id-ing for win/lose animation
- setting keyframes as big string
- adding '`moveable` to objects in arena
- only covers Logitech Gamepad F310 
