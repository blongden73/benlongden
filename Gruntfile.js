


module.exports = function(grunt) {

  grunt.initConfig({
        sass: {
          dist: {
            files: [{
              expand: true,
              cwd: 'style',
              src: ['*.scss'],
              dest: 'style',
              ext: '.css'
            }]
          }
      },
      watch: {
        css: {
          files: '**/*.scss',
          tasks: ['sass'],
          options: {
            livereload: true,
            port: 9000
          },
        },
      },
      serve: {
          options: {
              port: 9000
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass', 'watch']);
  grunt.registerTask('server', ['serve']);
};
