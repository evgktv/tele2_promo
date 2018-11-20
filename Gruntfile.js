module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({

        clean: {
            build: ["build"]
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    src: [
                        "fonts/**/*.{woff,woff2,otf}",
                        "img/**",
                        "js/**",
                        "*.html"
                    ],
                    dest: "build"
                }]
            },

            js: {
                files: [{
                    expand: true,
                    src: ["js/**/*.js"],
                    dest: "build"
                }]
            },

            html: {
                files: [{
                    expand: true,
                    src: ["*.html"],
                    dest: "build"
                }]
            }
        },

        svgstore: {
            options: {
                svg: {
                    style: "display: none",
                    xmlns: "http://www.w3.org/2000/svg"
                }
            },
            symbols: {
                files: {
                    "build/img/symbols.svg": ["img/icons/*.svg"]
                }
            }
        },

        less: {
            style: {
                files: {
                    "build/css/style.css": "less/style.less"
                }
            }
        },

        postcss: {
            options: {
                processors: [
                    require("autoprefixer")({browsers:
                        [
                            "last 2 version",
                            "last 2 Chrome versions",
                            "last 2 Firefox versions",
                            "last 2 Opera versions",
                            "last 2 Edge versions"
                        ]}),
                    require("css-mqpacker")({
                        sort: true
                    })
                ]
            },
            style: {src: "build/css/*.css"}
        },

        csso: {
            style: {
                options: {
                    report: "gzip"
                },
                files: {
                    "build/css/style.min.css": ["build/css/style.css"]
                }
            }
        },

        imagemin: {
            images: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    src: ["build/img/**/*.{png,jpg,gif}"]
                }]
            }
        },



        watch: {
            html: {
                files: ["*.html"],
                tasks: ["copy:html"]
            },

            js: {
                files: ["js/**/*.js"],
                tasks: ["copy:js"]
            },

            style: {
                files: ["less/**/*.less"],
                tasks: ["less", "postcss", "csso"]
            }
        },

        browserSync: {
            server: {
                bsFiles: {
                    src: ["build/*.html", "build/css/*css", "build/js/*.js"]
                },
                options: {
                    watchTask: true,
                    server: "build/"
                }
            }
        }


    });
    grunt.registerTask("serve", ["browserSync", "watch"]);
    grunt.registerTask("symbols", ["svgstore"]);

    grunt.registerTask("build", [
        "clean",
        "copy",
        "less",
        "postcss",
        "symbols",
        "csso",
        "imagemin"
    ]);
};