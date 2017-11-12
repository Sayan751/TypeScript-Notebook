export class Vec2 {
    // public static abc: string = "Vector2 abc";
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(vec: Vec2) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    }
    // static printStatic() {
    //     console.log(`in point printStatic: ${this.abc}`);
    // }
}

export class Vec3 extends Vec2 {
    z: number;
    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }
    add(vec: Vec3) {
        const vec2 = super.add(vec);
        return new Vec3(vec2.x, vec2.y, this.z + vec.z);
    }
}

// Vec3.printStatic();