module.exports = function(grunt) {
  //Load up all the grunt tasks.
  require('load-grunt-tasks')(grunt);

  //Initialize Grunt config
  grunt.initConfig({
    //Connect Task
    connect: {
      serve: {
        options: {
          port: process.env.PORT || 3000,
          hostname: '*',
          base: ['app'],
          open: {
            target: 'http://localhost:3000'
          },
          livereload: true,
          keepalive: true
        }
      }
    },

    //Bower Dependency Injector
    wiredep: {
      task: {
        options: {
          directory: '.bowerrc'.directory,
          bowerJson: require('./bower.json')
        },
        src: [
          'app/index.html'
        ]
      }
    },

    //Watch Task
    watch: {
      sass: {
        files: 'app/styles/sass/**/*.{scss,sass}',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['app/src/**/*.js', 'app/src/**/**/*.js'],
        tasks: ['injector:js'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['app/styles/**/*.css'],
        tasks: ['injector:css'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['app/views/**/*.html'],
        options: {
          livereload: true
        }
      }
    },

    //SASS Task
    sass: {
      build: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'app/styles/sass',
          src: ['*.scss'],
          dest: 'app/styles',
          ext: '.css'
        }]
      }
    },

    //Injector Task
    injector: {
      options: {
        addRootSlash: false,
        ignorePath: ['app/']
      },
      js: {
        files: {
          'app/index.html': ['app/src/*.js', 'app/src/**/*.js']
        }
      },
      css: {
        files: {
          'app/index.html': ['app/styles/**/*.css']
        }
      }
    },

    //Concurrent task
    concurrent: {
      watch: {
        tasks: ['watch', 'connect:serve'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });
  
  //Registering Tasks
  grunt.registerTask('build', ['wiredep', 'sass', 'injector']);

  grunt.registerTask('serve', ['build', 'concurrent:watch']);


};