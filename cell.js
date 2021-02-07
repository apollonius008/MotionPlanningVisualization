"use strict";

// a class for storing 2D Lattice Points i.e. Integer points
// The constructor checks if the arguments are integers
// Theres also a function which checks if two point class
// objects are equal. It also checks if the argument to
// equal function is also of type Point
export class Point{

    constructor(_x, _y) {
        this.x = x;
        this.y = y;
    }
    
    equal(p) {
        if (p.constructor === Point) {
            return (p.x == this.x && p.y == this.y);
        }
        
        return false;
    }
}