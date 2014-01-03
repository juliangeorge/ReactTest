module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    react: {
      files: {
        expand: true,
        cwd: 'src',
        src: ['**/*.jsx'],
        dest: 'js/app',
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
          }
        }
      },
      app: {
        src: 'js/app/*.js',
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