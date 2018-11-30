//子弹
function Bullet() {
    Role.call(this, {
        width: 6,
        height: 14,
        img: "images/bullet.png",
        x: Fighter.x + Fighter.width / 2,
        y: Fighter.y - 14,
        speed: -5,
    })
}

Bullet.prototype = Object.create(Role.prototype);