/* 敌机 */
function Enemy({width, height, x, y, speed, img}) { //参数是解构赋值
    Role.call(this, {width, height, x, y, speed, img});   //参数是对象的简写，比如width:width简写为width
}

Enemy.prototype = Object.create(Role.prototype);

//一个敌机工厂
const EnemyFactory = {
    createEnemy(type) {
        let enemy;
        if(type === "small") {
            enemy = new Enemy({
                width: 34,
                height: 24,
                x: Math.floor(Math.random() * (Map.width - 34)),
                y: 0,
                speed: 5,
                img: "images/small_fly.png"
            });
            enemy.crash = 1;
        } else if(type === "middle") {
            enemy = new Enemy({
                width: 46,
                height: 60,
                x: Math.floor(Math.random() * (Map.width - 46)),
                y: 0,
                speed: 3,
                img: "images/mid_fly.png"
            });
            enemy.crash = 3;
        } else if(type === "big") {
            enemy = new Enemy({
                width: 110,
                height: 164,
                x: Math.floor(Math.random() * (Map.width - 110)),
                y: 0,
                speed: 1,
                img: "images/big_fly.png"
            });
            enemy.crash = 5;
        }

        if(enemy) {     //在生成敌机的时候就在文档中新建一个DOM元素,在引擎中生成敌机的时候就不用再创建一次
            enemy.createDom();
        }
        return enemy;
    }
}