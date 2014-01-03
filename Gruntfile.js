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
      my_target: {
        files: {
          'js/app.min.js': ['js/app.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['react', 'browserify', 'uglify']);
};