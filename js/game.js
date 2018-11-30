/* 游戏引擎 */
const Game = {
    bullets: [], //用一个数组存放所有子弹
    enemies: [], //用一个数组存放所有敌机
    init() {
        this.addListener();
    },

    addListener() {
        //点击开始页面开始游戏
        on(Map.startElement, "click", () => {
            Map.startElement.style.display = "none";
            //开始游戏创建子弹
            this.genBulletEnemy();
        });

        //设置战机的移动
        on(Map.gameElement, "mousemove", (event) => {
            //光标在文档中的坐标
            var 
                _pageX = event.pageX,   
                _pageY = event.pageY;
            //光标在游戏中的定位
            var
                x = _pageX - offset(Map.gameElement).left,
                y = _pageY - offset(Map.gameElement).top;
            //战机移动
            Fighter.move(x, y);
        });

        // on(Map.overElement, "click", () => {
        //     Map.startElement.style.display = "block";
        // });
    },

    genBulletEnemy(){   //生成子弹并且随机生成敌机
        let count = 0;
        var id = setInterval(() => {
            count++;
            if(count % 10 === 0) {  //一秒60次，30次即500ms生成一颗子弹
                let bullet = new Bullet();  //生成一个子弹
                bullet.createDom(); 
                this.bullets.push(bullet); //把子弹存放到数组中
            }

            if(count % 30 === 0) {
                let enemy = EnemyFactory.createEnemy("small");    //创建一个小敌机
                // enemy.createDom();
                this.enemies.push(enemy);
            }

            if(count % 60 === 0) {
                let enemy = EnemyFactory.createEnemy("middle");    //创建一个中敌机
                // enemy.createDom();
                this.enemies.push(enemy);
            }

            if(count % 120 === 0) {
                let enemy = EnemyFactory.createEnemy("big");    //创建一个大敌机
                // enemy.createDom();
                this.enemies.push(enemy);
            }

            //让子弹移动
            for(let i = this.bullets.length - 1; i >= 0; i--) {
                this.bullets[i].move();
                if(!this.bullets[i].isAlive) {
                    this.bullets.splice(i, 1);
                }
            }

            //让敌机移动
            for(let i = this.enemies.length - 1; i >= 0; i--) {
                this.enemies[i].move();
                if(!this.enemies[i].isAlive) {
                    this.enemies.splice(i, 1);
                }
            }

            //碰撞检测
            // for(let i = this.bullets.length - 1; i >= 0; i--) {
            //     let bullet = this.bullets[i];
            //     for(let j = this.enemies.length - 1; j >= 0; j--) {
            //         let enemy = this.enemies[j];
            //         if(this.check(bullet, enemy)) {
            //             bullet.element.parentNode.removeChild(bullet.element);
            //             this.bullets.splice(i, 1);
            //             enemy.element.parentNode.removeChild(enemy.element);
            //             this.enemies.splice(j, 1);
            //             break;
            //         }
            //     }
            // }

            /*碰撞检测*/
            for(let i = this.bullets.length - 1; i >= 0; i--) {
                let bullet = this.bullets[i];
                for(let j = this.enemies.length - 1; j >= 0; j--) {
                    let enemy = this.enemies[j];
                    if(this.check(bullet, enemy)) {
                        bullet.element.parentNode.removeChild(bullet.element);
                        this.bullets.splice(i, 1);
                        enemy.crash--;
                    }
                    if(this.check(Fighter, enemy)) {
                        Map.gameElement.style.display = "none";     //战机与敌机相撞，结束游戏
                        clearInterval(id);
                        // this.enemies = [];
                        // this.bullets = [];
                    }
                    if(enemy.crash == 0) {
                        enemy.element.parentNode.removeChild(enemy.element);
                        this.enemies.splice(j, 1);
                        break;
                    }
                }
            }
        }, 1000 / 60);
    },

    //碰撞检测
    check(role1, role2) {
        return !(//战机的右侧不碰撞敌机的左侧
        role1.x + role1.width < role2.x ||
        //战机的左侧不碰撞敌机的右侧
        role1.x > role2.x + role2.width ||
        //战机的下侧不碰撞敌机的上侧
        role1.y + role1.height < role2.y ||
        //战机的上侧不碰撞敌机的下侧
        role1.y > role2.y + role2.height);
    }

    // check(role1, role2) {
    //     let count = 0;
    //     if(!(//战机的右侧不碰撞敌机的左侧
    //     role1.x + role1.width < role2.x ||
    //     //战机的左侧不碰撞敌机的右侧
    //     role1.x > role2.x + role2.width ||
    //     //战机的下侧不碰撞敌机的上侧
    //     role1.y + role1.height < role2.y ||
    //     //战机的上侧不碰撞敌机的下侧
    //     role1.y > role2.y + role2.height)) {
    //         count++;
    //     }
    //     return count;
    // }
}

Game.init();