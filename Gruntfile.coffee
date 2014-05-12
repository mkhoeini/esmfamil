


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
        cwd: 'src/coffee/'
        src: '**/*.coffee'
        dest: 'www/js/'
        ext: '.js'
      modified:
        expand: true
        cwd: 'src/coffee/'
        src: '**/*.coffee'
        dest: 'www/js/'
        ext: '.js'
        filter: isModified

    coffeelint:
      options:
        force: true
      all:
        expand: true
        cwd: 'src/coffee/'
        src: '**/*.coffee'
      modified:
        expand: true
        cwd: 'src/coffee/'
        src: '**/*.coffee'
        filter: isModified

    jade:
      options:
        pretty: true
      all:
        expand: true
        cwd: 'src/template/'
        src: '**/*.jade'
        dest: 'www/'
        ext: '.html'
      modified:
        expand: true
        cwd: 'src/template/'
        src: '**/*.jade'
        dest: 'www/'
        ext: '.html'
        filter: isModified

    watch:
      coffeescript:
        files: ['src/coffee/**/*.coffee']
        tasks: ['coffeelint:modified', 'coffee:modified']
      jade:
        files: ['src/template/**/*.jade']
        tasks: ['jade:modified']

  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jade'

  grunt.registerTask 'default', ['coffeelint:all', 'coffee:all', 'jade:all', 'watch']
