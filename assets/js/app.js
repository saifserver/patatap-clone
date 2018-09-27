// make the paper scope global, by injecting it into window
paper.install(window);

// alert information to user on how it works.
alert(`This is an attempt to make a basic structure of patatap.(for more info visit patatap.com).
Every (keyboard) key has a unique sound. Combination of them creates fantastic tunes.
Go ahead and try!!!`);

// Only executed our code once the DOM is ready.
window.onload = function() {
    // get a reference object of the canvas element and set view for paper
    const CANVAS = document.getElementById("canvas");
    paper.setup(CANVAS);

    // path object to represent path in a Paper.js project
    let circles = [];

    // tool object to refer to a script for handling user events in a paper.js project
    let tool = new Tool();

    /*
	 *	Note: Cannot using Point and Size object for operators when using paper.js directly in javascript; instead use Math functions
	 */

    // key press event function provided in paper.js
    tool.onKeyDown = function(event) {
        if (KEY_DATA[event.key]) {
            // maximum width and height of the viewport containing all HTML elements
            let maxHeight = window.innerHeight;
            let maxWidth = window.innerWidth;

            // generate x and y points by multiplying viewport width and Math.random()
            let xPoint = Math.random() * maxWidth;
            let yPoint = Math.random() * maxHeight;

            // draw a circle
            let newCircle = new Path.Circle(new Point(xPoint, yPoint), 400);
            newCircle.fillColor = KEY_DATA[event.key].color;

            // add circle to array
            circles.push(newCircle);

            // play sound for specific key press
            KEY_DATA[event.key].sound.play();
        }
    };

    // animate circle
    view.onFrame = function(event) {
        for (let i = 0; i < circles.length; i++) {
            // scale down circle at every frame
            circles[i].scale(0.9);

            // change color at every frame
            circles[i].fillColor.hue += 1;

            // delete circle from array after its no more visible on canvas
            if (circles[i].area < 1) {
                // remove the circle from the canvas
                circles[i].remove();

                // remove the circle from the array
                circles.splice(i, 1);

                // decrement i so that the loop doesn't skip a circle because of .splice()
                i--;
            }
        }
    };
};
