<p align="center">
   <img height="84" width="429" src="https://raw.githubusercontent.com/Silveredge9/Orion-Framework/master/misc/orion-logo.png">
  <p align="center">A simple mobile-first HTML/CSS/JS framework</p>
</p>

## What is Orion Framework?
Orion is a mobile-first HTML/CSS/JS framework. It's a simple, easy to use and quick way of getting your responsive web project off the ground. 

- **SASS Powered** - Choose the column width, number, gutter and padding of a grid system of your choice and SASS will automatically generate all the CSS classes and media query mixins for you.
- **Share Breakpoints** - Manage your media query breakpoints in one file which then automatically filter into both the SASS framework and JS.
- **Build with Gulp** - Orion comes with pre-built Gulp tasks allowing you to compress and concatenate your CSS, JS and image assets automatically.
- **Bloat-free** - Orion comes packaged with just a SASS framework, a few handy mixins and a Gulp setup for building and watching.


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
#### Defining your breakpoints
To define the framework breakpoints open `/dev/data/config.js` and edit the config object.

```sh
"breakpoints": {
    "xsm": "370px",
    "sm": "480px",
    "md": "640px",
    "lg": "925px",
    "xlg": "1280px",
    "xxlg": "1366px"
}
```
Give each breakpoint a name and order them from smallest to largest. How these breakpoints can be used in SASS and JS is explained under [Grid System](#grid-system)

#### Choosing a grid system
Orion allows you to define a grid system of your choice using a config object. SASS then generates all the required CSS classes and media query mixins automatically. To locate this config object open `/dev/data/config.js`.

```sh
"grid": {
  "default" : {
    "responsive": true,
    "full width": false,
    "column width": "70px",
    "gutter": "30px",
    "columns": 12,
    "padding": "15px"
  },
  "morph": {
  }
}
```

`responsive`: If set to `true` the container will have a max-width CSS property instead of just a standard width CSS property and will respond as you scale down the browser window.

`full width`: If set to `true`, the max-width on the contrainer is set to 100% and will stretch the full width of the window.

```sh
"column width": "70px",
"gutter": "30px",
"columns": 12,
"padding": "15px"
```
Here you set the variables which will create your grid system. By default this is set to a **1170px 12 column grid system**.

You can also reshape the grid at any of your defined breakpoints by creating entries within the `morph` property.

```sh
"grid": {
  "default" : {
    "responsive": true,
    "full width": false,
    "column width": "70px",
    "gutter": "30px",
    "columns": 12,
    "padding": "15px"
  },
  "morph": {
    "xlg": {
      "column width": "70px",
      "gutter": "30px",
      "columns": 16,
      "padding": "15px"
    }
  }
}
```

The above example defines a **1170px 12 column grid system** which morphs into a **1600px 16 column grid system** once the `xlrg` breakpoint has been hit.


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

On build SASS auto generates all the required classes you will need to construct grids to your specification as per `/dev/data/config.js`. Below are a few practical examples using the grid outlined in [Framework Configuration](#framework-configuration). If you've used bootstrap, the syntax here is almost identical.

#### Basic grid

```sh
<div class="o-container">
  <div class="o-col-4"></div>
  <div class="o-col-4"></div>
  <div class="o-col-4"></div>
</div>
```
This is a basic 4/4/4 grid which doesn't change.

<!-- [[View this example]](http://codepen.io/lukedidit/pen/pyzdXx) -->

#### Basic grid w. breakpoint classes

```sh
<div class="o-container">
  <div class="o-col-4 o-col-1@md"></div>
  <div class="o-col-4 o-col-5@md"></div>
  <div class="o-col-4 o-col-6@md"></div>
</div>
```
Here we introduce breakpoint classes which have been automatically created by SASS using the data entered in `/dev/js/partials/config.js`. As this is a mobile-first framework, we start off with a basic 4/4/4 grid and as we scale up and hit the med breakpoint at 640px it will change to 1/5/6.

<!-- [[View this example]](http://codepen.io/lukedidit/pen/grYoPX) -->

#### Advanced grid w. breakpoint classes

```sh
<div class="o-container">
  <div class="o-col-4@sm o-col-full@md o-col-4@lg o-col-6@xlg"></div>
  <div class="u-col-offset-4@sm o-col-4@sm o-col-6@md u-col-offset-4@lg o-col-4@lg o-col-6@xlg"></div>
  <div class="u-hide@sm u-show@md o-col-6@md u-col-offset-8@lg o-col-4@lg o-col-full@xlg"></div>
</div>
```
Here is an advanced example of how we can combine breakpoint classes to significantly alter our columns as we increase our browser resolution. 

<!-- [[View this example]](http://codepen.io/lukedidit/pen/QNLapz) -->

#### List of breakpoint classes

- Column: `.o-col-{num}` *Example: .o-col-4*

- Breakpoint column: `.o-col-{num}@{bpName}` *Example: .o-col-4@xlg*

- Offset column: `.u-col-offset-{num}` *Example: .u-col-offset-4*

- Breakpoint offset column: `.u-col-offset-{num}@{bpName}` *Example: .u-col-offset-4@xlg*

- Clear float : `.u-clear`

- Breakpoint clear float : `.u-clear@{bpName}` *Example: .u-clear@xlg*

- Hide/Show/Show inline : `.u-hide` or `.u-show` or `.u-show-inline`

- Breakpoint Hide/Show/Show inline : `.u-hide@{bpName}` or `.u-show@{bpName}` or `.u-show-inline@{bpName}` *Example: .u-hide@xlg, .u-show@xlg, .u-show-inline@xlg*


## Breakpoint usage in SASS

#### SASS
When writing SASS, you also have access to breakpoints which allow you to generate media queries using the data entered in `/dev/js/partials/config.js`. Like with breakpoint slasses, these are automatically generated on `gulp build`.

**HTML**
```sh
<div class="o-container">
  <div class="o-col-4"></div>
  <div class="o-col-4"></div>
  <div class="o-col-4"></div>
</div>
```

**SASS**
```sh
.o-container div {
  &:before {
    content:"default";
  }
  @include bp(sm){
    &:before{
      content:"sm";
    }
  }
  @include bp(md){
    &:before{
      content:"md";
    }
  }
  @include bp(lg){
    &:before{
      content:"lg";
    }
  }
  @include bp(xlg){
    &:before{
      content:"xlg";
    }
  }
}
```
In the above, we give each div within the container a pseudo element and then change its content at different breakpoints. Like in the example above you can group these breakpoint mixins within the element they're modifying or you can define them seperately like in the next example.

<!-- [[View this example]](http://codepen.io/lukedidit/pen/RabmxE) -->

**HTML**
```sh
<div class="o-container">
  <div class="o-col-4@sm o-col-full@md o-col-4@lg o-col-6@xlg"></div>
  <div class="u-col-offset-4@sm o-col-4@sm o-col-6@md u-col-offset-4@lg o-col-4@lg o-col-6@xlg"></div>
  <div class="u-hide@sm u-show@md o-col-6@md u-col-offset-8@lg o-col-4@lg o-col-full@xlg"></div>
</div>
```

**SASS**
```sh
.o-container div {
  &:before {
    content:"default";
  }
}

@include bp(sm) {
  .o-container div:before {
    content:"sm";
  }
}

@include bp(md) {
  .o-container div:before {
    content:"md";
  }
}

@include bp(lg) {
  .o-container div:before {
    content:"lg";
  }
}

@include bp(xlg) {
  .o-container div:before {
    content:"xlg";
  }
}
```
Here we have seperated the breakpoint mixins from the element they're modifying. This is useful if a breakpoint needs to effect multiple elements on your page as you now have one use of a breakpoint mixin effecting many elements rather then many uses of the same breakpoint mixin. On large projects with lots of SASS this method is preferred as it allows better tracking of what elements are being changed at which breakpoints.

<!-- [[View this example]](http://codepen.io/lukedidit/pen/qZWGaV) -->

#### List of breakpoint mixins

- Create a min-width mobile-first breakpoint: `@include bp($bp)` *Example: @include bp(sm)*

- Create a max-width desktop-first breakpoint: `@include bpMax($bp)` *Example: @include bpMax(sm)*

- Create a breakpoint which only triggers inbetween 2 breakpoints: `@include bpBetween($from, $to)` *Example: @include bpBetween(sm, md)*

## Breakpoint usage in JavaScript
Within JavaScript it's also possible to check if a breakpoint has been reached using a function. As with SASS, the breakpoints are pulled directly from the data in `/dev/js/partials/config.js`

```sh
if(bp.min("md")){
	console.log("med hit");
	// Do other stuff
}
```
The above is a simple check to see if the browser window is wide enough to hit the 'med' breakpoint.

#### List of breakpoint functions

- Check if a min-width mobile-first breakpoint has been hit: `if(bp.min("$bp"))` *Example: if(bp.min("sm"))*
- Check if a max-width desktop-first breakpoint has been hit: `if(bp.max("$bp"))` *Example: if(bp.max("sm"))*
- Check if your window is currently inbetween 2 breakpoints: `if(bp.between("$from, $to"))` *Example: if(bp.between("sm", "md"))*

<!-- [[View this example]](http://codepen.io/lukedidit/pen/JXPgdo) -->

## About the developer
I'm Luke Harrison, a Sheffield-based Web Designer &amp; Developer from the UK. I currently work at internet service provider Plusnet and when I'm not there I work on interesting side projects such as this very framework. Read more about me at [lukeharrison.net](http://www.lukeharrison.net) or follow me on twitter at [@WebDevLuke](https://twitter.com/WebDevLuke).