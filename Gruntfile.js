module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    react: {
      files: {
        expand: true,
        cwd: 'js/jsx',
        src: ['*.jsx'],
        dest: 'js/compiled',
        ext: '.js'
      }
    },
    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ],
        shim: {
          Utils: {
            path: './js/vendor/utils.js',
            exports: 'Utils'
          },
          Zepto: {
            path: './js/vendor/zepto.js',
            exports: '$'
          }
        }
      },
      app: {
        src: ['js/compiled/*.js', 'js/src/*.js'],
        dest: 'js/app.js'
      }
    },
    uglify: {
      production: {
        files: {
          'js/app.min.js': ['js/app.js']
        }
      }
    },
    less: {
      development: {
        files: {
          "css/app.css":"less/main.less"
        }
      },
      production: {
        options: {
          cleancss: true,
          sourceMap: true,
          sourceMapFilename: "css/app.css.source"
        },
        files: {
          "css/app.css":"less/main.less"
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/jsx/*.jsx'],
        tasks: ['react', 'browserify']
      },
      les: {
        files: ['less/*.less'],
        tasks: ['less:development']
      }
    }
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['react', 'browserify', 'less:development']);
  grunt.registerTask('production', ['react', 'browserify', 'uglify:production', 'less:production']);
};