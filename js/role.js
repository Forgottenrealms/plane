//敌机和子弹的父类
function Role({width, height, x, y, speed, img}) {
    this.width = width;
    this.height = height;
    this.element = null;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.img = img;
    this.isAlive = true; //判断子弹是否超出范围
};
//动态创建Dom元素
Role.prototype.createDom = function() {
    //创建img元素
    const img = this.element = document.createElement("img");
    //设置src属性
    this.element.src = this.img;
    //设置img的属性
    img.style.width = this.width + "px";
    img.style.height = this.height + "px";
    img.style.position = "absolute";
    img.style.left = this.x + "px";
    img.style.top = this.y + "px";
    //添加到游戏界面
    Map.gameElement.appendChild(img);
};

Role.prototype.move = function() {
    //敌机和子弹运动,speed传正值是敌机向下运动，传负值是子弹向上运动
    this.y += this.speed;
    //设置敌机或子弹的定位属性
    this.element.style.top = this.y + "px";
    //判断是否超出范围
    if(this.y < 0 || this.y > Map.height) {
        //移除这个元素
        Map.gameElement.removeChild(this.element);
        this.isAlive = false;
    }
}