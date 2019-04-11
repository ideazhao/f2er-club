        var gulp = require('gulp');
            var contentIncluder = require('gulp-content-includer');
            var rename = require('gulp-rename');

            gulp.task('default', function() {
                gulp.src("index_src.html")
                    .pipe(contentIncluder({
                        includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
                    }))
                    .pipe(rename('index.html'))
                    .pipe(gulp.dest('./'));
            });

  
  


        


        
