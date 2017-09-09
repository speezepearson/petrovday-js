module.exports = {
  "entry": "./src/index.jsx",
  "output": {
    "path": __dirname,
    "filename": "dist/bundle.js"
  },
  "module": {
    "rules": [
      {
        "test": /\.jsx?$/,
        "exclude": /node_modules/,
        "use": {
          "loader": 'babel-loader'
        }
      }
    ]
  }
}
