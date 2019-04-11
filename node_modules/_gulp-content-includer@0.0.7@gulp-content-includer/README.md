## gulp-content-includer

a plugin for gulp.js to include files 

## Installation

```bash
npm install gulp-utf8-convert
```

## Options

### includerReg: RegExp of the include expression
Type: `RegExp` 

### baseSrc: basedir of the source
Type: `String` 

### deepConcat concat content recursive
Type: `Boolean` default : false

## Usage

```js
var gulp = require('gulp');
var contentInclude = require('gulp-content-includer');

gulp.task('concat',function() {
    gulp.src("./content.html")
        .pipe(contentInclude({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
        }))
        .pipe(gulp.dest('./'));
});
```
