<p align="center">
   <img height="84" width="429" src="https://raw.githubusercontent.com/Silveredge9/Orion-Framework/master/misc/orion-logo.png">
  <p align="center">A simple mobile-first HTML/CSS/JS framework</p>
</p>

## What is Orion Framework?
Orion is a mobile-first HTML/CSS/JS framework in the tradition of Bootstrap and Foundation but without any of the bloat. It's a simple, easy to use and quick way of getting your responsive web project off the ground. 

- **SASS Powered** - Choose the column width, number, gutter and padding of a grid system of your choice and SASS will automatically generate all the CSS classes and media query mixins for you.
- **Share Breakpoints** - Manage your media query breakpoints in one file which then automatically filter into both the SASS framework and JS.
- **Build with Gulp** - Orion comes with pre-built Gulp tasks allowing you to compress and concatenate your CSS, JS and image assets automatically.
- **Bloat-free** - Orion comes packaged with just a SASS framework, a few handy mixins and a Gulp setup for building and watching. Meaning you don't have to spend time removing all the styles and components you know you won't use.

## Getting Started
#### 1) Install Gulp
Orion uses Gulp as it's build system. If you've never used Gulp before, you need to first install its client globally using NPM:

```sh
npm install --global gulp-cli
```

#### 2) Install dependancies
```sh
npm install
```

**That's it!**

## Usage
#### Framework configuration
##### 1) Choosing a grid system
Orion allows you to define a grid system of your choice with SASS then generating all the required CSS classes and media query mixins automatically. To locate these variables open `/dev/sass/partials/_config.scss`.

```sh
$responsive: true;
```
If set to true the container will have a max-width CSS property instead of just a standard width CSS property and will respond as you scale down the browser window.

```sh
$fullWidth: false;
```
If set to true, the max-width on the contrainer is set to 100% and will stretch the full width of the window.

```sh
$columnWidth: 70px;
$gutter: 30px;
$columns: 12;
$padding: $gutter / 2;
```
Here you set the variables which will create your grid system. By default this is set to a **1170px 12 column grid system**.

##### 2) Defining your breakpoints
To define the framework breakpoints open `/dev/js/partials/config.js`.

```sh
var breakpoints = {
	xsml: 370,
	sml: 480,
	med: 640,
	lrg: 925,
	xlrg: 1280,
	xxlrg: 1366
};
```


##### 3) Gulp

#### Grid system
More to come

#### Breakpoint Usage
More to come

#### Mixins
More to come

#### Examples
More to come

## About the Developer
I'm Luke Harrison, a Sheffield-based Web Designer &amp; Developer from the UK. I currently work at internet service provider Plusnet and when I'm not there I work on interesting side projects such as this very framework. Read more about me at [lukeharrison.net](http://www.lukeharrison.net) or follow me on twitter at [@silveredge9](https://twitter.com/Silveredge9).