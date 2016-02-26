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

* [Getting started](#getting-started)
* [Framework configuration](#framework-configuration)
* [Creating builds](#creating-builds)
* [Grid system](#grid-system)
* [Breakpoint usage in SASS](#breakpoint-usage-in-sass)
* [Breakpoint usage in JavaScript](#breakpoint-usage-in-javascript)
* [About the developer](#about-the-developer)

## Getting started
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
#### Choosing a grid system
Orion allows you to define a grid system of your choice using variables. SASS then generates all the required CSS classes and media query mixins automatically. To locate these variables open `/dev/sass/partials/_config.scss`.

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

#### Defining your breakpoints
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
Give each breakpoint a name and order them from smallest to largest. How these breakpoints can be used in SASS and JS is explained under [Grid System](#grid-system)


#### Gulp
To tweak the settings for what happens during the build process open '/gulpfile.js'

```sh
var minify = true;
```
If set to `true`, all concatenated CSS and JavaScript will then be minified to reduce files sizes.

If you wish to add any JS libraries such as jQuery, simply add these to `/dev/js/vendor/` and they will automatically be concatenated with the rest of the framework JS.

The same goes for polyfills, but add them to `/dev/js/polyfills/` instead. 


## Creating builds

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

After your initial build, it's a good idea to run `gulp watch`. This will tell Gulp to watch for any changes you make to individual files and upon detection will process those individual files in the same manner as they would be during `gulp build`. So if you're working on the SASS there's no need to re-run `gulp build` after every change as `gulp watch` will have already picked the change up and acted accordingly.


## Grid system

On build SASS auto generates all the required classes you will need to construct grids. Below are a few practical examples using the grid outlined in [Framework Configuration](#framework-configuration)

#### Basic grid

```sh
<div class="container">
  <div class="clear grid4"></div>
  <div class="grid4"></div>
  <div class="grid4"></div>
</div>
```
This is a basic 4/4/4 grid which doesn't change. When starting a new row, you need to add a `clear` class. 

[[View this example]](http://codepen.io/lukedidit/pen/pyzdXx)

#### Basic grid w. breakpoint classes

```sh
<div class="container">
  <div class="clear grid4 med-clear med1"></div>
  <div class="grid4 med5"></div>
  <div class="grid4 med6"></div>
</div>
```
Here we introduce breakpoint classes which have been automatically created by SASS using the data entered in `/dev/js/partials/config.js`. As this is a mobile-first framework, we start off with a basic 4/4/4 grid and as we scale up and hit the med breakpoint at 640px it will change to 1/5/6.

[[View this example]](http://codepen.io/lukedidit/pen/grYoPX)

#### Advanced grid w. breakpoint classes

```sh
<div class="container">
  <div class="sml-clear sml4 med-full lrg-clear lrg4 xlrg-clear xlrg6"></div>
  <div class="sml-offset4 sml4 med-clear med6 lrg-offset4 lrg-clear lrg4 xlrg6"></div>
  <div class="sml-hide med-show med6 lrg-clear lrg-offset8 lrg4 xlrg-full"></div>
</div>
```
Here is an advanced example of how we can combine breakpoint classes to significantly alter our columns as we increase our browser resolution. 

[[View this example]](http://codepen.io/lukedidit/pen/QNLapz)

#### List of breakpoint classes

- Column: `.grid{num}` *Example: .grid4*

- Breakpoint column: `.{bpName}{num}` *Example: .xlrg4*

- Offset column: `.offset{num}` *Example: .offset4*

- Breakpoint offset column: `.{bpName}-offset{num}` *Example: .xlrg-offset4*

- Clear : `.clear`

- Breakpoint clear : `.{bpName}-clear` *Example: .xlrg-clear*

- Hide/Show/Show inline : `.hide` or `.show` or `.show-inline`

- Breakpoint Hide/Show/Show inline : `.{bpName}-hide` or `.{bpName}-show` or `.{bpName}-show-inline` *Example: .xlrg-hide, .xlrg-show, .xlrg-show-inline*


## Breakpoint usage in SASS

#### SASS
When writing SASS, you also have access to breakpoints which allow you to generate media queries using the data entered in `/dev/js/partials/config.js`. Like with breakpoint slasses, these are automatically generated on `gulp build`.

**HTML**
```sh
<div class="container">
  <div class="clear grid4"></div>
  <div class="grid4"></div>
  <div class="grid4"></div>
</div>
```

**SASS**
```sh
.container div {
  &:before {
    content:"default";
  }
  @include bp(sml){
    &:before{
      content:"sml";
    }
  }
  @include bp(med){
    &:before{
      content:"med";
    }
  }
  @include bp(lrg){
    &:before{
      content:"lrg";
    }
  }
  @include bp(xlrg){
    &:before{
      content:"xlrg";
    }
  }
}
```
In the above, we give each div within the container a pseudo element and then change its content at different breakpoints. Like in the example above you can group these breakpoint mixins within the element they're modifying or you can define them seperately like in the next example.

[[View this example]](http://codepen.io/lukedidit/pen/RabmxE)

**HTML**
```sh
<div class="container">
  <div class="sml-clear sml4 med-full lrg-clear lrg4 xlrg-clear xlrg6"></div>
  <div class="sml-offset4 sml4 med-clear med6 lrg-offset4 lrg-clear lrg4 xlrg6"></div>
  <div class="sml-hide med-show med6 lrg-clear lrg-offset8 lrg4 xlrg-full"></div>
</div>
```

**SASS**
```sh
.container div {
  &:before {
    content:"default";
  }
}

@include bp(sml) {
  .container div:before {
    content:"sml";
  }
}

@include bp(med) {
  .container div:before {
    content:"med";
  }
}

@include bp(lrg) {
  .container div:before {
    content:"lrg";
  }
}

@include bp(xlrg) {
  .container div:before {
    content:"xlrg";
  }
}
```
Here we have seperated the breakpoint mixins from the element they're modifying. This is useful if a breakpoint needs to effect multiple elements on your page as you now have one use of a breakpoint mixin effecting many elements rather then many uses of the same breakpoint mixin. On large projects with lots of SASS this method is preferred as it allows better tracking of what elements are being changed at which breakpoints.

[[View this example]](http://codepen.io/lukedidit/pen/qZWGaV)

#### List of breakpoint mixins

- Create a min-width mobile-first breakpoint: `@include bp($bp)` *Example: @include bp(sml)*

- Create a max-width desktop-first breakpoint: `@include bpMax($bp)` *Example: @include bpMax(sml)*

- Create a breakpoint which only triggers inbetween 2 breakpoints: `@include bpBetween($from, $to)` *Example: @include bpBetween(sml, med)*

## Breakpoint usage in JavaScript
Within JavaScript it's also possible to check if a breakpoint has been reached using a function. As with SASS, the breakpoints are pulled directly from the data in `/dev/js/partials/config.js`

```sh
if(bp("med")){
	console.log("med hit");
	// Do other stuff
}
```
The above is a simple check to see if the browser window is wide enough to hit the 'med' breakpoint.

#### List of breakpoint functions

- Check if a min-width mobile-first breakpoint has been hit: `if(bp("$bp"))` *Example: if(bp("sml"))*
- Check if a max-width desktop-first breakpoint has been hit: `if(bpMax("$bp"))` *Example: if(bpMax("sml"))*
- Check if your window is currently inbetween 2 breakpoints: `if(bpBetween("$from, $to"))` *Example: if(bpBetween("sml", "med"))*

[[View this example]](http://codepen.io/lukedidit/pen/JXPgdo)

## About the developer
I'm Luke Harrison, a Sheffield-based Web Designer &amp; Developer from the UK. I currently work at internet service provider Plusnet and when I'm not there I work on interesting side projects such as this very framework. Read more about me at [lukeharrison.net](http://www.lukeharrison.net) or follow me on twitter at [@silveredge9](https://twitter.com/Silveredge9).