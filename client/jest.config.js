module.exports = {
 verbose: true,
 moduleFileExtensions: [...defaults.moduleFileExtensions, "js", "jsx"],
 transform: {
    "^.+\\.jsx?$": "babel-jest"
  }, 
"transformIgnorePatterns": [
    "node_modules/*"
  ]
};
