const Fighter = {
    width: 66,
    height: 80,
    element: $("#fighter"),
    x: 0,
    y: 0,

    move(x, y) {    //战机移动
        var //传的x, y值是光标的位置
            _left = x - this.width / 2,
            _top = y - this.height / 2;
        //判断是否超出范围
        if(_left < 0)
            _left = 0;
        if(_left > Map.width - this.width)
            _left = Map.width - this.width;
        if(_top < 0) 
            _top = 0;
        if(_top > Map.height - this.height)
            _top = Map.height - this.height;
        //设置战机的css样式
        this.element.style.left = _left + "px";
        this.element.style.top = _top + "px";
        //战机的当前位置
        this.x = _left;
        this.y = _top;
    }
};