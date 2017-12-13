/**
 * CONFIG METHODS:
 * -    Methods for parsing, accessing, and modifying `game_config` object
 * -    Nothing outside of this file should access `game_config` directly
 *      (although some methods might `get` sub-objects of `game-config` directly)
 */

const getGCRecursive = (obj, args) => {
    if (args.length == 1){
        return obj[args[0]];
    }
    return getGCRecursive(obj[args[0]], args.slice(1));
}

const setGCRecursive = (set_val, obj, args) => {
    if (args.length ==1){
        obj[args[0]] = set_val;
    }
    else{
        setGCRecursive(set_val, obj[args[0]], args.slice(1));
    }
}

/**
 * MUTATION METHODS- CALLED EXTERNALLY
 */

 const getGC = (...args) => {
    return getGCRecursive(game_config, args);
 }

 const setGC = (set_val, ...args) => {
    setGCRecursive(set_val, game_config, args);
 }

 const getObject = (level_name, area, object_name, ...args) => {
     return getGC('levels', level_name, 'objects', area, object_name, ...args);
 }

 const setObject = (set_val, level_name, area, object_name, ...args) => {
     setGC(set_val, 'levels', level_name, 'objects', area, object_name, ...args);
 }

 /**
  * Deletes shallow copy of hero from start_level, updated start_level to be new_level, and makes 
  * a shallow copy of hero at new_level.
  * Shallow copy means any changes to the hero object by one reference changes all references.
  */
 const heroLevelUp = (new_level) => {
    delete game_config['levels'][getGC('hero', 'start_level')]['objects']['arena']['hero'];
    setGC(new_level, 'hero', 'start_level');
    setGC(getGC('hero'), 'levels', getGC('hero', 'start_level'), 'objects', 'arena', 'hero')
 }

 /**
  * Called on start-up to init additional attributes
  */
 const fillOutGC = () => {
    for (let level_name in getGC('levels')) {
        const arena_set = getGC('levels', level_name, 'objects', 'arena');
        for (let object_name in arena_set) {   
            //  add `jumping` and `falling` attributes to any obj w/ `has_gravity`
            if (getObject( level_name, 'arena', object_name, 'has_gravity')){
                setObject(false, level_name, 'arena', object_name, 'jumping');
                setObject(false, level_name, 'arena', object_name, 'falling');
            }
        }
    }
    if (getGC('hero', 'has_gravity')){
        setGC(false, 'hero', 'jumping');
        setGC(false, 'hero', 'falling');
    }
 }