
class Sensor{
  constructor(x, y,sensorType, sensorInput, sensorOutput){
    this.pos = createVector(x,y);
    this.x = x;
    this.y = y;
    this.sensorType = sensorType;
    this.sensorInput = sensorInput;
    this.sensorOutput = sensorOutput;
  }

  // Calculate the sensor's influence on the vehicle's behavior
 calculateInfluence(vehicle, lightSources) {
   // Implement your sensor logic here
   // Example: Calculate the influence of the closest light source
   let closestDist = Infinity;
   let closestSource = null;

   for (let source of lightSources) {
     let d = p5.Vector.dist(this.pos, source);
     if (d < closestDist) {
       closestDist = d;
       closestSource = source;
     }
   }


  // Return a vector representing the influence on the vehicle's acceleration
if (closestSource) {
  let desired = p5.Vector.sub(closestSource, vehicle.pos);
  let steer = p5.Vector.sub(desired, vehicle.vel);
  steer.limit(vehicle.maxForce);
  return steer;
} else {
  return createVector(); // No influence
}
  }

}
