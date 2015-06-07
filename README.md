# Aswat Project | Bags shop
This is the repository of my Aswat test project.<br/>
You can see a demo online, on : http://www.thelink.com
The website is reponsive, so you also can test it on your phone.
If you are located in Dubaï, try your city name to have a reduction ;)

## How to run it locally
#### Install dependencies

To run this project, you first need to install node.js, npm and bower
  - Node : https://nodejs.org/download/
  - Npm : https://github.com/npm/npm#super-easy-install
  - Bower : http://bower.io/#install-bower

#### Build
#####- On Linux & MacOs

Once you have node and npm install, you can eather run the buildAswatApp script :
```sh
$ ./buildAswatApp
```

or install dependencies and build manually :

```sh
$ cd ./front && npm install && bower install
$ gulp
$ cd ../back && npm install
```

#####- On Windows

Install Linux ;)

####Launch the API

First of all, you need to launch the API
```sh
$ cd ./back
$ node server.js
```

####Launch the server
#####- Nginx

If you have a local nginx server installed, you can add this simple configuration to it

```sh
server {
	listen       80;
	server_name  aswat.com.anas-mbp.lan; # change it correctly

	set $home /Your/Path/To/The/Project/front/dist;

	location / {
		root $home;
		  index  index.html;
	}
}
```

Then, just reload nginx, and use the url defined in server_name;

####- Simple Python Http Server

If you have Python installed, you can launch a simple http server with this command:
```sh
$ cd ./front/dist
$ python -m SimpleHTTPServer [PORT_NUMBER]
```

Then, just open a web broswer, and go to http://localhost:[PORT_NUMBER]