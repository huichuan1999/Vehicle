
class Vehicle {

    constructor(pos1, springLength, maxSpeed, maxForce, jitter, shouldFlee) {
        this.motors = [];
        this.physics = new toxi.physics2d.VerletPhysics2D();
        //一个布尔值，true是逃离，false是跟随
        this.shouldFlee = shouldFlee;
        this.jitter = jitter;

        // 创建两个motor对象

        this.motors[0] = new Motor(pos1.x, pos1.y,maxSpeed,maxForce);
        this.motors[1] = new Motor(pos1.x + springLength/2, pos1.y + springLength/2,maxSpeed, maxForce);

        // 将motor的粒子添加到物理世界中
        this.physics.addParticle(this.motors[0].particle);
        this.physics.addParticle(this.motors[1].particle);

        // 创建一个spring，连接两个motor的粒子，并添加到物理世界中
        let spring = new toxi.physics2d.VerletSpring2D(
            this.motors[0].particle,
            this.motors[1].particle,
            springLength,
            0.1
        );
        this.physics.addSpring(spring);
    }

    // 单独的方法用于更新和渲染 Vehicle
    run(target) {
        this.physics.update();
        fill(255,100);
        //circle(target.pos.x, target.pos.y, 16);
        for (let motor of this.motors) {
            let force;
            if (this.shouldFlee * target.targetType) {
                
                force = motor.flee(target.pos);
                fill(0,100);
            } else {
              fill(255,100);
                force = motor.seek(target.pos);
            }
            motor.applyForce(force);
            motor.update();
            motor.randomSwing(this.jitter);
            //motor.show();
            stroke(0,20);
            point(motor.pos.x, motor.pos.y);
        }

        stroke(0,20);
        line(this.motors[0].pos.x, this.motors[0].pos.y, this.motors[1].pos.x, this.motors[1].pos.y);

        // noStroke();
        // text(
        //     "Motor 0 velocity: (" + this.motors[0].vel.x.toFixed(2) + ", " + this.motors[0].vel.y.toFixed(2) + ") " + "  " +
        //     "Motor 1 velocity: (" + this.motors[1].vel.x.toFixed(2) + ", " + this.motors[1].vel.y.toFixed(2) + ")",
        //     100,
        //     50
        // );
    }
}
