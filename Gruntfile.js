module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        src: ['src/getjQuery.js','src/tinysort-1.5.3.min.js','src/comments.js'],
        dest: './sortComments.js'
      }
    },    
    uglify: {
      all: {
        files: {
          './sortComments.min.js': ['./sortComments.js']
        }
      }
    },
    jshint: {
      standard:{
        src: [ './sortComments.js' ],
        options: {
          jshintrc: "./.jshintrc"
        },
        force: true
      } 
    }   
  });

  grunt.registerTask("timer", "inject timer", function( filepath, dest ){

    var file;

    var filepath = filepath || "./sortComments.js";
    var dest = dest || "./sortComments.js";

    file = grunt.file.read( filepath );

    //replace vars
    var timerStart = ["//TIMER START//", "var start = new Date().getTime();"];
    var timerEnd = ["//TIMER END//", "var end = new Date().getTime();\n var time = end - start;\n console.log('It took ' + (time / 1000) + ' sec');"];

    //replacements
    file = file.replace( timerStart[0], timerStart[1] ).replace( timerEnd[0], timerEnd[1] );

    grunt.file.write(dest, file);

  });

  grunt.registerTask("javascript", "add javascript: to convert to bookmarklet", function( filepath, dest ){

    var file;

    var filepath = filepath || "./sortComments.min.js";
    var dest = dest || "./sortComments.min.js";

    file = grunt.file.read( filepath );
    file = "javascript:" + file; 
    grunt.file.write(dest, file);

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask("default", ["concat", "uglify", "javascript"]); 
  grunt.registerTask("time", ["concat", "timer", "uglify", "javascript"]);
  grunt.registerTask("check", ["jshint"]);

};