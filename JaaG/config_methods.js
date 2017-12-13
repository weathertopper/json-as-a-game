/**
 * CONFIG METHODS:
 * -    Methods for parsing, accessing, and modifying `game_config` object
 * -    Nothing outside of this file should access `game_config` directly
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