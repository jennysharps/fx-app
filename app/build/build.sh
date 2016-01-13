node_modules/less/bin/lessc.js --clean-css app/css/style.less app/css/style.min.css
node_modules/requirejs/bin/r.js -o app/build/app.build.js
cd dist
rm -rf build build.txt scripts/views scripts/models scripts/collections