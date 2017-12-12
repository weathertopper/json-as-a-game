/**
 * CONFIG METHODS:
 * -    Methods for parsing, accessing, and modifying `game_config` object
 * -    Nothing outside of this file should access `game_config` directly
 */

 /**
  * parse_token: used locally
  */
 const parse_token = '>'

 /**
  * Called on start-up
  */
 const collapseGameConfig = () => {
    console.log('before ', JSON.stringify(game_config));
    let updated_config = {};
    collapseRecursive(updated_config, '', game_config);
    game_config = updated_config;
    console.log('after ', game_config);
 }

 /**
  * Recursive- called locally
  */
 const collapseRecursive = (updated_config, parent_key, json_config) => {
     const config_keys = Object.keys(json_config);
     config_keys.forEach( (key) => {
         const parse_key = buildParseKey(parent_key, key);
         if( typeof json_config[key] === 'object'){
            collapseRecursive(updated_config, parse_key, json_config[key]);
         }
         else{
            updated_config[parse_key] = json_config[key];
         }
     })
 }

 /**
  * Called locally
  */
 const buildParseKey = (existing_key, key_addition) => {
    const token = (existing_key.length > 0) ? parse_token : ''; // don't start with parse_token
    return existing_key + token + key_addition;
 }

/**
 * MUTATION METHODS- CALLED EXTERNALLY
 */

 const getGC = (...args) => {
    const parse_key = args.join(parse_token);
    return (game_config[parse_key])? game_config[parse_key] : null;
 }

 const setGC = (set_val, ...args) => {
    const parse_key = args.join(parse_token);
    game_config[parse_key] = set_val;
 }