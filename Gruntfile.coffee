


module.exports = (grunt) ->

  fs = require 'fs'
  isModified = (filepath) ->
    now = new Date()
    modified =  fs.statSync(filepath).mtime
    return (now - modified) < 10000

  grunt.initConfig

    coffee:
      options:
        sourceMap: true
        bare: true
        force: true # needs to be added to the plugin
      all:
        expand: true
        cwd: 'www/coffeescript/'
        src: '**/*.coffee'
        dest: 'www/js/'
        ext: '.js'
      modified:
        expand: true
        cwd: 'www/coffeescript/'
        src: '**/*.coffee'
        dest: 'www/js/'
        ext: '.js'
        filter: isModified

    coffeelint:
      options:
        force: true
      all:
        expand: true
        cwd: 'www/coffeescript/'
        src: '**/*.coffee'
      modified:
        expand: true
        cwd: 'www/coffeescript/'
        src: '**/*.coffee'
        filter: isModified

    watch:
      coffeescript:
        files: ['www/**/*.coffee']
        tasks: ['coffeelint:modified', 'coffee:modified']

  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffeelint:all', 'coffee:all', 'watch']
