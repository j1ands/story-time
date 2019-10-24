# StoryTime
![Badge of Honor](https://img.shields.io/badge/Built%20at-Fullstack-green.svg?style=flat-square)
> StoryTime is a web app that generates New York Times articles with you and your friends as the subjects.

## Table of Contents
- [Screenshots](#screenshots)
- [Usage](#usage)
- [Installation](#installation)
- [Roadmap](#roadmap)
- [Features](#features)
- [Known Bugs](#bugs)
- [Roadmap](#roadmap)
- [Contributors](#contributors)
- [License](#license)

##Screenshots
- 1st Tile ![Example0](https://cloud.githubusercontent.com/assets/8934559/6364932/fa0355a2-bc7b-11e4-8948-c0154229a78c.png)
- Story Type ![Example1](https://cloud.githubusercontent.com/assets/8934559/6364933/fb505d4c-bc7b-11e4-99b4-6b0ddf4d3332.png)
- Story Cover ![Example1](https://cloud.githubusercontent.com/assets/8934559/6364934/fc5233b4-bc7b-11e4-8130-bcbc250d8353.png)
- Inside Story ![Example1](https://cloud.githubusercontent.com/assets/8934559/6364936/fd14c3c0-bc7b-11e4-8a86-f806a8cc3e24.png)

##Usage

1. Make sure that you have MongoDB installed correctly and running on your machine

  ```
  mongod
  ```
2. Rename local.env.sample.js to local.env.js within `server/config`
3. Register an app on the Facebook API. Enter the generated ID and SECRET in local.env.js.
4. Run the app with `grunt`.

	```
	grunt serve
	```

## Installation
__Note:__ If you encounter errors in the installation process for npm, it is recommended that you try running the install command with `sudo`

1. First, clone the repository to your local machine.

	```
	git clone https://github.com/j1ands/story-time.git
	```
2. Next, `bower` and `npm` install.

	```
	npm install
	bower install
	```
3. StoryTime is installed!

#### Roadmap
- Google and Twitter integration
- 1-click share to Facebook, Google+, and Twitter
- Host on Heroku

#### Features

- Fun, entertaining experience in just three button clicks 
- Choose between military/action, comedic, or romantic articles
- View original New York Times article

#### Known bugs

- Clicking publish generates a blank page. Refreshing will load the content.

## Contributors
*  __Jordan Landau__ -  [LinkedIn](http://www.linkedin.com/in/jordanlandau) | [GitHub](https://github.com/j1ands)

## License

This projected is licensed under the terms of the [MIT license](http://opensource.org/licenses/MIT)

[1]:http://SwiftCard.herokuapp.com
