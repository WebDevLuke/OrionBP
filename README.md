<h1>
	 <img height="67" width="391" src="https://cdn.rawgit.com/WebDevLuke/Orion-Framework/master/misc/orion-logo.svg">
</h1>

OrionBP is a simple front-end boilerplate for projects using [OrionCSS](https://github.com/WebDevLuke/OrionCSS). It includes a suite of useful Gulp tasks allowing you to compile, compress and concatenate your SASS, JS and image assets.

## Getting Started
OrionBP uses [Gulp](http://gulpjs.com/) as its build system. If you've never used Gulp before, you need to first install its client using NPM:-

```
npm install --global gulp-cli
``` 

Next you need to install OrionBP's dependencies, which includes [OrionCSS](https://github.com/WebDevLuke/OrionCSS):-

```
npm install
```

Finally, run the below command:-

```
gulp setup
```

This command:-

1. Generates all required [OrionCSS](https://github.com/WebDevLuke/OrionCSS) directories in your dev directory.
2. Adds an [OrionCSS](https://github.com/WebDevLuke/OrionCSS) compatible `main.scss` to your SASS dev directory, though if you've modified the default SASS directory structure you may then need to edit the `@import` paths to correctly point to `node_modules`.
3. Adds a sample SASS component `sample.component.mycomponent` to the `06 - components` directory.

## Configuration

In `gulpfile.js` you can configure various options to tweak the behaviour of gulp tasks.

`minify` - if `true` then CSS & JS will be minified once compiled and will have a .min suffix before the file extension. For example `style.min.css`.

`lint` - If `true` then SASS will be linted by [stylelint](https://github.com/stylelint/stylelint) to enforce style guidelines. These rules can be tweaked in `.stylelintrc`.

You can also configure the paths used by Gulp to align with your project's directory structure. By default, these paths are:-

```js
// Source code root
const dev = "dev";

// Compiled code root
const dist = "dist";

// HTML directories
const htmlDev = "dev/html";
const htmlDist = dist;

// Image directories
const imgDev = "dev/img";
const imgDist = "dist/img";

// SASS directories
const sassDev = "dev/sass";
const sassDist = "dist/css";

// JS directories
const jsDev = "dev/js";
const jsDist = "dist/js";
```

## Gulp Tasks

A breakdown of the production Gulp tasks included with OrionBP can be found below:-

### Build

`gulp build` generates a freshly compiled build of your project in your compiled code root directory (default: `dist`).

During a build, the following happens:-

#### Cleanup
- Any existing builds are deleted

#### SASS
- SASS is compiled, minified (if `minifiy` is true)
- It is then autoprefixed using [autoprefixer](https://github.com/postcss/autoprefixer)
- It is then linted for errors using [stylelint](https://github.com/stylelint/stylelint)
- Unused CSS classes are removed using [UNCSS](https://github.com/giakki/uncss)
- A compiled CSS file is created in the sass dist folder (default: `dist/css`).

#### Images
- Bitmap images are copied to the image dist folder (default: `dist/images`) and optimised using [imagemin](https://github.com/imagemin/imagemin).
- SVG images are concatenated into one and embed directly in the HTML as an icon system. [More info](https://css-tricks.com/svg-sprites-use-better-icon-fonts/)

#### JS


#### HTML


#### PHP / SQL


#### Misc








- Build
- Watch
- sass-debug
- sass-build-debug

## About the Developer
I'm Luke Harrison, a Sheffield-based Web Designer &amp; Developer from the UK, currently working at [Evolution Funding](https://github.com/EvolutionFunding). Read more about me at [lukeharrison.net](http://www.lukeharrison.net) and/or follow me on twitter at [@WebDevLuke](https://twitter.com/WebDevLuke).
