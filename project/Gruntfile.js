module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			my_target: {
				files: {
					'app.min.js': 
						[
							'app.js',
							'serverCode/sLoadData.js'
						],
					'public/_release/cJS.min.js': ['public/javascripts/*.js']
				}
			}
		},
		cssmin: {
			combine: {
				files: {
				  'public/_release/cStyle.min.css': ['public/stylesheets/*.css']
				}	
			}
		}
		//,imagemin: {                         
		//	dynamic: {                        
		//		options: {                    
		//			optimizationLevel: 7
		//		},
		//		files: [{
		//			expand: true,       
		//			cwd: 'public/images/',
		//			src: ['**/*.{png,jpg,gif}'],   
		//			dest: 'public/_release' 
		//		}]
		//	}
		//}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'cssmin']);//,'imagemin'
};