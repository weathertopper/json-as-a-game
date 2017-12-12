# JaaG (JSON as a Game)

Instead of building a Résumé-as-a-Game (as I originally planned), I will take the easier route and build a full-out game 'engine'. 

I say 'engine'... but that's a little strong. I will define a list of possibilities, actions, roles, etc. Then, a game can be created with nothing but a JSON configuration file (a BIG configuration file). 

I will keep the `game_config.js` template here for reference.

```js
let game_config = {
  'hello': 'world'
}
```

### Configuration Parsing

At startup, the `game_config` object will be flattened (for lack of a better word) into a 1-D object where attributes are delimited by `>`. This will allow mutation methods to access inifinitly 'deep' attributes.

For example,  
```js
{
  'never': {
    'gonna': {
      'give_you_up': true,
      'let_you_down': true
    }
  },
  'rick_rolled': true
}
```
becomes
```js
{
  'never>gonna>give_you_up': true,
  'never>gonna>let_you_down': true,
  'rick_rolled': true
}
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

