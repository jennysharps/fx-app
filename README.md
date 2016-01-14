# fx-app
FX Currency Matrix

## Basic Structure
    /app
        /build
        /css
            /less
        /scripts
            /collections
            /libs
            /models
            /views
            main.js
        /vendor
        config.json (shared between server & client)
        index.html
        fx-stream.js
        serve.js
    bower.json
    package.json
    
## Requirements

- Install Node
    - on OSX install [home brew](http://brew.sh/) and type `brew install node`
    - on Windows install [chocolatey](https://chocolatey.org/) and type `choco install nodejs`
- On OSX you can alleviate the need to run as sudo by [following these instructions](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md). I highly recommend this step on OSX
- Open terminal
- Type `npm install`
- Type `npm start`
- Navigate to [http://localhost:3000](http://localhost:3000) in your browser window