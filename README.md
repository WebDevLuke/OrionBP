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


## Table of contents

* [Getting Started](#getting-started)
* [Framework configuration](#framework-configuration)

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

## Framework configuration
#### 1) Choosing a grid system
Orion allows you to define a grid system of your choice with SASS then generating all the required CSS classes and media query mixins automatically. To locate these variables open `/dev/sass/partials/_config.scss`.

```sh
$responsive: true;
```
If set to `true` the container will have a max-width CSS property instead of just a standard width CSS property and will respond as you scale down the browser window.

```sh
$fullWidth: false;
```
If set to `true`, the max-width on the contrainer is set to 100% and will stretch the full width of the window.

```sh
$columnWidth: 70px;
$gutter: 30px;
$columns: 12;
$padding: $gutter / 2;
```
Here you set the variables which will create your grid system. By default this is set to a **1170px 12 column grid system**.

#### 2) Defining your breakpoints
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
Give each breakpoint a name and order them from smallest to largest. How these breakpoints can be used in SASS and JS is explained under [Breakpoint Usage](#breakpoint-usage)


#### 3) Gulp
To tweak the settings for what happens during the build process open '/gulpfile.js'

```sh
var minify = true;
```
If set to `true`, all concatenated CSS and Javascript will then be minified tor reduce files sizes.

If you wish to add any JS libararies such jQuery, simply add these to `/dev/js/vendor/` and they will automatically be concatenated with the rest of the framework JS.

The same goes for polyfills, but add them to `/dev/js/polyfills/` instead. 


## Creating Builds

```sh
Orion-Framework/
├── dev/
├── dist/ **Appears following a successful Gulp build**
└── misc/
```

`/dev/` (short for development) should be where you do all of your dev work. `/dist/` (short for distribution) is where the web-ready version of your project sits. The distribution version is created when you run `gulp build`. This processes all the config variables you've defined and builds a version of the framework which will work correctly in your browser.

More specifically `gulp build` outputs the following in `/dist/`:
- HTML (unmodified)
- Compiled &amp; minified CSS
- Concatenated &amp; minified JS
- Compressed Images
- Any misc files you have in the root of `/dev/` (unmodified)


## Grid system

On build SASS auto generates all the required classes you will need to construct grids. Below are a few practical examples using the grid outlined in [Framework configuration](#framework-configuration)

#### Basic Grid

```sh
<div class="container">
  <div class="clear grid4"></div>
  <div class="grid4"></div>
  <div class="grid4"></div>
</div>
```
This is a basic 4/4/4 grid which doesn't change. When you start a new row, you need to add a `clear` class. 

[[View this example]](http://codepen.io/lukedidit/pen/pyzdXx)

#### Basic Grid w. Breakpoint Classes

```sh
<div class="container">
  <div class="clear grid4 med-clear med1"></div>
  <div class="grid4 med5"></div>
  <div class="grid4 med6"></div>
</div>
```
Here we introduce breakpoint classes which have been automatically created by SASS using the data entered in `/dev/js/partials/config.js`. As this is a mobile-first framework, we start off with a basic 4/4/4 grid and as we scale up and hit 640px it will change to 1/5/6.

[[View this example]](http://codepen.io/lukedidit/pen/grYoPX)

#### Advanced Grid w. Breakpoint Classes

```sh
<div class="container">
  <div class="sml-clear sml4 med-full lrg-clear lrg4 xlrg-clear xlrg6"></div>
  <div class="sml-offset4 sml4 med-clear med6 lrg-offset4 lrg-clear lrg4 xlrg6"></div>
  <div class="sml-hide med-show med6 lrg-clear lrg-offset8 lrg4 xlrg-full"></div>
</div>
```
Here is an advanced example of how we can combine breakpoint classes to significantly alter our columns as we increase our browser resolution. 

[[View this example]](http://codepen.io/lukedidit/pen/QNLapz)

#### List of Breakpoint Classes

- Column: `.grid{num}` *(Example .grid4}*
- Breakpoint column: `.{bpName}{num}` *(Example .xlrg4}*


- Offset column: `.offset{num}` *(Example .offset4}*
- Breakpoint offset column: `.{bpName}-offset{num}` *(Example .xlrg-offset4}*


- Clear : `.clear`
- Breakpoint clear : `.{bpName}-clear` *(Example .xlrg-clear}*


- Hide/Show/Show inline : `.hide` or `.show` or `.show-inline`
- Breakpoint Hide/Show/Show inline : `.{bpName}-hide` or `.{bpName}-show` or `.{bpName}-show-inline` *(Example .xlrg-hide, .xlrg-show, .xlrg-show-inline}*


## Breakpoint Mixin Usage
More to come

## Other Mixins
More to come

## About the Developer
I'm Luke Harrison, a Sheffield-based Web Designer &amp; Developer from the UK. I currently work at internet service provider Plusnet and when I'm not there I work on interesting side projects such as this very framework. Read more about me at [lukeharrison.net](http://www.lukeharrison.net) or follow me on twitter at [@silveredge9](https://twitter.com/Silveredge9).