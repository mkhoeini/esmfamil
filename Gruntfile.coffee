


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

    stylus:
      all:
        expand: true
        cwd: 'src/style/'
        src: '**/*.styl'
        dest: 'www/css/'
        ext: '.css'
      modified:
        expand: true
        cwd: 'src/style/'
        src: '**/*.styl'
        dest: 'www/css/'
        ext: '.css'
        filter: isModified

    connect:
      options:
        livereload: 35729
        port: 8000
        hostname: 'localhost'
      livereload:
        options:
          open: true
          base: ['www/', './']

    watch:
      options:
        livereload: true
      coffeescript:
        files: ['src/coffee/**/*.coffee']
        tasks: ['coffeelint:modified', 'coffee:modified']
      jade:
        files: ['src/template/**/*.jade']
        tasks: ['jade:modified']
      stylus:
        files: ['src/style/**/*.styl']
        tasks: ['stylus:modified']
      livereload:
        options:
          livereload: '<%= connect.options.livereload %>'
        files: ['www/**/*']

  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.registerTask 'default', [
    'coffeelint:all'
    'coffee:all'
    'jade:all'
    'stylus:all'
    'connect:livereload'
    'watch']
