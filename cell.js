"use strict";

// a class for storing 2D Lattice Points i.e. Integer points
// The constructor checks if the arguments are integers
// Theres also a function which checks if two point class
// objects are equal. It also checks if the argument to
// equal function is also of type Point
export class Point{

    constructor(_x, _y) {
        if (Number.isInteger(_x)) {
            this.x = _x;
        }
        else{
            console.error("_x is not a Integer. Value :", _x, "Type :", typeof(x));
        }
        
        if (Number.isInteger(_y)) {
            this.y = _y;
        }
        else{
            console.error("_y is not an integer. Value :", _y, "Type :", typeof(_y));
        }
    }
    
    equal(p) {
        if (p.constructor.name === "Point") {
            return (p.x == this.x && p.y == this.y);
        }
        
        return false;
    }
}