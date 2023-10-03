
class Vehicle {
    constructor(pos1, pos2, springLength, springStrength, shouldFlee) {
        this.motors = [];
        this.physics = new toxi.physics2d.VerletPhysics2D();
        //一个布尔值，true是逃离，false是跟随
        this.shouldFlee = shouldFlee;

        // 创建两个motor对象
        this.motors[0] = new Motor(pos1.x, pos1.y);
        this.motors[1] = new Motor(pos2.x, pos2.y);

        // 将motor的粒子添加到物理世界中
        this.physics.addParticle(this.motors[0].particle);
        this.physics.addParticle(this.motors[1].particle);

        // 创建一个spring，连接两个motor的粒子，并添加到物理世界中
        let spring = new toxi.physics2d.VerletSpring2D(
            this.motors[0].particle,
            this.motors[1].particle,
            springLength,
            springStrength
        );
        this.physics.addSpring(spring);
    }

    // 单独的方法用于更新和渲染 Vehicle
    run(target) {
        this.physics.update();

        for (let motor of this.motors) {
            let force;
            if (this.shouldFlee) {
                force = motor.flee(target);
            } else {
                force = motor.seek(target);
            }
            motor.applyForce(force);

            motor.update();
            motor.randomSwing(0.5);
            motor.show();

            pg.point(motor.pos.x, motor.pos.y);
        }

        stroke(0);
        line(this.motors[0].pos.x, this.motors[0].pos.y, this.motors[1].pos.x, this.motors[1].pos.y);

        noStroke();
        text(
            "Motor 0 velocity: (" + this.motors[0].vel.x.toFixed(2) + ", " + this.motors[0].vel.y.toFixed(2) + ") " + "  " +
            "Motor 1 velocity: (" + this.motors[1].vel.x.toFixed(2) + ", " + this.motors[1].vel.y.toFixed(2) + ")",
            100,
            50
        );
    }
}