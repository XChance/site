import p5 from "p5";
import {createUseStyles} from 'react-jss'
import { useRef } from "react";
import { useEffect } from "react";

const useStyles = createUseStyles({
    root: {
      height: "100vh",
      width: "100vw",
      position: "absolute",
      overflow: "hidden",
    },
  });

  type Props = {
    isMobile: boolean,
  };

  export default function Background( { isMobile }: Props ) {
    const classes = useStyles();
    const myRef = useRef<HTMLDivElement>(null);
    const flockSize = isMobile ? 50 : 100;
    

    const sketch = (p: p5) => {
        let flock: Flock;
        //https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight - 4);
            p.background("grey");
            flock = new Flock();
            for (let i = 0; i < flockSize; i++) {
                let b = new Boid(p.random(50, p.width), p.random(50, p.height));
                flock.addBoid(b);
            }
        };
   
        p.draw = () => {
          if(document.visibilityState === "hidden") return;
            p.resizeCanvas(window.innerWidth, window.innerHeight - 4);
            p.background("#151321");
            flock.run();
        };

        class Flock {
            boids: Boid[] = [];
        
            run() {
                for (let i = 0; i < this.boids.length; i++) {
                    this.boids[i].run(this.boids);  
                }
            }
        
            addBoid(b: Boid) {
                this.boids.push(b);
            }
        }
        
        class Boid {
            acceleration = p.createVector(0, 0);
            velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
            position: p5.Vector;
            r = 12.0;
            maxspeed = 3;    // Maximum speed
            maxforce = 0.05; // Maximum steering force

            constructor(x: number, y: number) {
                this.position = p.createVector(x, y);
            }
          
          run (boids: Boid[]) {
            this.flock(boids);
            this.update();
            this.borders();
            this.render();
          }
          
          applyForce (force: p5.Vector) {
            // We could add mass here if we want A = F / M
            this.acceleration.add(force);
          }
          
          // We accumulate a new acceleration each time based on three rules
          flock (boids: Boid[]) {
            let sep = this.separate(boids);   // Separation
            let ali = this.align(boids);      // Alignment
            let coh = this.cohesion(boids);   // Cohesion
            // Arbitrarily weight these forces
            sep.mult(1.5);
            ali.mult(1.0);
            coh.mult(1.0);
            // Add the force vectors to acceleration
            this.applyForce(sep);
            this.applyForce(ali);
            this.applyForce(coh);
          }
          
          // Method to update location
          update () {
            // Update velocity
            this.velocity.add(this.acceleration);
            // Limit speed
            this.velocity.limit(this.maxspeed);
            this.position.add(this.velocity);
            // Reset accelertion to 0 each cycle
            this.acceleration.mult(0);
          }
        
          seek (target: any) {
            let desired = p5.Vector.sub(target, this.position);  // A vector pointing from the location to the target
            // Normalize desired and scale to maximum speed
            desired.normalize();
            desired.mult(this.maxspeed);
            // Steering = Desired minus Velocity
            let steer = p5.Vector.sub(desired,this.velocity);
            steer.limit(this.maxforce);  // Limit to maximum steering force
            return steer;
          }
          
          render () {
            // Draw a triangle rotated in the direction of velocity
            let theta = this.velocity.heading() + p.radians(90);
            p.fill("#151321");
            p.stroke("#d42222");
            p.strokeWeight(2);
            p.push();
            p.translate(this.position.x, this.position.y);
            p.rotate(theta);
            p.beginShape();
            p.vertex(0, -this.r * 2);
            p.vertex(-this.r, this.r * .5);
            p.vertex(this.r, this.r * .5);
            p.endShape(p.CLOSE);
            p.pop();

            // p.fill(0, 0, 0, 0);
            // p.strokeWeight(1);
            // p.ellipse(p.mouseX, p.mouseY, 100, 100);
          }
          
          // Wraparound
          borders () {
            if (this.position.x < -this.r)  this.position.x = p.width + this.r;
            if (this.position.y < -this.r)  this.position.y = p.height + this.r;
            if (this.position.x > p.width + this.r) this.position.x = -this.r;
            if (this.position.y > p.height + this.r) this.position.y = -this.r;
          }
          
          // Separation
          // Method checks for nearby boids and steers away
          separate (boids: Boid[]) {
            let desiredseparation = 40.0;
            let steer = p.createVector(0, 0);
            let count = 0;
            // For every boid in the system, check if it's too close
            let mousePos = p.createVector(p.mouseX, p.mouseY);
            let d = p5.Vector.dist(this.position, mousePos);
            if ((d > 0) && (d < desiredseparation * 5)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.position, mousePos);
                diff.normalize();
                diff.mult(d);        // Weight by distance
                steer.add(diff);
                count++;            // Keep track of how many
            }

            for (let i = 0; i < boids.length; i++) {
              d = p5.Vector.dist(this.position,boids[i].position);
              // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
              if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.position, boids[i].position);
                diff.normalize();
                diff.div(d);        // Weight by distance
                steer.add(diff);
                count++;            // Keep track of how many
              }
            }
            // Average -- divide by how many
            if (count > 0) {
              steer.div(count);
            }
          
            // As long as the vector is greater than 0
            if (steer.mag() > 0) {
              // Implement Reynolds: Steering = Desired - Velocity
              steer.normalize();
              steer.mult(this.maxspeed);
              steer.sub(this.velocity);
              steer.limit(this.maxforce);
            }
            return steer;
          }
          
          // Alignment
          // For every nearby boid in the system, calculate the average velocity
          align (boids: Boid[]) {
            let neighbordist = 100;
            let sum = p.createVector(0,0);
            let count = 0;
            for (let i = 0; i < boids.length; i++) {
              let d = p5.Vector.dist(this.position,boids[i].position);
              if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].velocity);
                count++;
              }
            }
            if (count > 0) {
              sum.div(count);
              sum.normalize();
              sum.mult(this.maxspeed);
              let steer = p5.Vector.sub(sum, this.velocity);
              steer.limit(this.maxforce);
              return steer;
            } else {
              return p.createVector(0, 0);
            }
          }
          
          // Cohesion
          // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
          cohesion (boids: Boid[]) {
            let neighbordist = 50;
            let sum = p.createVector(0, 0);   // Start with empty vector to accumulate all locations
            let count = 0;
            for (let i = 0; i < boids.length; i++) {
              let d = p5.Vector.dist(this.position,boids[i].position);
              if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].position); // Add location
                count++;
              }
            }
            if (count > 0) {
              sum.div(count);
              return this.seek(sum);  // Steer towards the location
            } else {
              return p.createVector(0, 0);
            }
          }
        }
    };

    useEffect(() => {
      new p5(sketch, myRef.current as HTMLElement);
    });

    return (
        <div className={classes.root} ref={myRef}>

        </div>
    );
}