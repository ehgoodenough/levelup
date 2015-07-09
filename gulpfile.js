var gulp = require("gulp")
var gulp_connect = require("gulp-connect")

gulp.task("default", function() {
    gulp.start("build")
})

gulp.task("build", function() {
    gulp.src("./source/**/*")
        .pipe(gulp.dest("./build"))
        .pipe(gulp_connect.reload())
})

gulp.task("watch", function() {
    gulp.start("build")
    gulp.watch("./source/**/*", function() {
        gulp.start("build")
    })
})

gulp.task("server", function() {
    gulp.start("watch")
    gulp_connect.server({
		port: 8080,
		root: "./build",
		livereload: true,
	})
})
