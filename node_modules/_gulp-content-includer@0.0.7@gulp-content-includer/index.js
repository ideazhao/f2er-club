var path = require('path');
var util = require('util');
var fs = require('fs');

var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-content-includer';

module.exports = function(options) {
    return through.obj(function(file, enc, cb) {
        var self = this;

        options = options || {};

        var showLog = options.showLog;

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        var includerReg = options.includerReg;

        if (!util.isRegExp(includerReg)) {
            gutil.log(gutil.colors.red('[ERROR] includerReg is required'));
            this.push(file);
            return cb();
        }

        var content = file.contents.toString();
        
        var replaceContent = function (content,dir){
            content = content.replace(includerReg, function(str, src) {
                if (/^[\\\/]/.test(src)) {
                    if (options.resolvePath && typeof options.resolvePath === "function") {
                        src = options.resolvePath(src);
                    } else {
                        src = path.join(options.baseSrc || "",src);
                    }                 
                } else {
                    src = path.join(path.dirname(dir),src);   
                }                  
                
                try {
                    var fileContent = fs.readFileSync(src,'utf8');    
                    
                    if (options.deepConcat && includerReg.test(fileContent)) {
                        return replaceContent(fileContent,src);
                    }          
                    return fileContent;
                } catch (err) {
                    gutil.log(gutil.colors.red('[ERROR] the file %s required by %s is not exsist'),src,dir);
                    return str;
                }
            
            });
            return content;
        }
        
        content = replaceContent(content,file.path);
        
        file.contents = new Buffer(content);
        this.push(file);
        cb();
    });
};
