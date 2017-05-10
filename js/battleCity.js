/**
 * Created by zdy on 2017/5/9.
 */
"usr strict!"
var Tank = function (type,x,y,state,to) {//前三个参数必选
    var tank = {
        type: type,//0自己，1一级敌人，2二级敌人，3三级敌人
        state: state?state:1,//0死亡，1存活，2无敌
        towards: to?to:3,//0上 1下 2左 3右
        speed: 1,//每次移动的距离
        bulletSpeed: 3,//子弹移动的速度
        pos: {x: x, y: y}
    };
    tank.move = function () {
        console.log(this);
        var self = this;
        switch (self.towards) {
            case 0:
                self.pos.y -= self.speed;
                if(self.pos.y<0){
                    self.pos.y=0
                    self.towards=Math.floor(Math.random()*4);
                }
                //if()
                break;
            case 1:
                self.pos.y += self.speed;
                if(self.pos.y>24){
                    self.pos.y=24
                    self.towards=Math.floor(Math.random()*4);
                }
                break;
            case 2:
                self.pos.x -= self.speed;
                if(self.pos.x<0){
                    self.pos.x=0
                    self.towards=Math.floor(Math.random()*4);
                }
                break;
            case 3:
                self.pos.x += self.speed;
                if(self.pos.x>24){
                    self.pos.x=24
                    self.towards=Math.floor(Math.random()*4);
                }
                break;
            default:
                break;
        }
    };
    tank.shoot = function () {
        var self = this, bulletPos = {};
        switch (self.towards) {
            case 0:
                bulletPos.y = self.pos.y - 1;
                break;
            case 1:
                bulletPos.y = self.pos.y + 1;
                break;
            case 2:
                bulletPos.x = self.pos.x - 1;
                break;
            case 3:
                bulletPos.x = self.pos.x + 1;
                break;
            default:
                break;
        }
        var bullet = new Bullet(self.bulletSpeed, self.towards, self.bulletPos);
    }

    return tank;
}
var Bullet = function (bulletSpeed, towards, bulletPos) {
    var bullet = {
        speed: bulletSpeed,
        towards: towards,
        pos: bulletPos,//{x:pos.x,y:pos.y}
    }
    bullet.move = function () {
        var self = this;
        switch (self.towards) {
            case 0:
                this.pos.y -= self.speed;
                break;
            case 1:
                this.pos.y += self.speed;
                break;
            case 2:
                this.pos.x -= self.speed;
                break;
            case 3:
                this.pos.x += self.speed;
                break;
            default:
                break;
        }
    }
    return bullet;
}

var maps = [];//26*26矩阵，0是路，1是可打破的墙，2是不可打破的墙，9老巢
maps[0] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var fillColor = ["#F0FFFF", "#EE7942", "#FFFFFF"];
fillColor[9] = "#C6E2FF";
var canvas = document.getElementById("canvas");
var tanks=[],bullets;
var ctx = canvas.getContext("2d");
var blockSize = canvas.width / 26;
var level=0;//当前关卡
function drawMap() {
    var map = maps[level];
    for (var i = 0, l = map.length; i < l; i++) {
        for (var j = 0, len = map[i].length; j < len; j++) {
            ctx.fillStyle = fillColor[map[i][j]];
            ctx.fillRect(blockSize * j, blockSize * i, blockSize, blockSize);
            ctx.strokeStyle="#F4F4F4"
            ctx.strokeRect(blockSize * j, blockSize * i, blockSize, blockSize)
        }
    }
}
function drawTank(tank) {
    var img=new Image;
    img.src="img/tank.jpg";
    img.onload=function () {
        ctx.drawImage(img,tank.pos.x*blockSize,tank.pos.y*blockSize,blockSize*2,blockSize*2)
    }
}
function draw() {
    drawMap();
    for(var i in tanks){
        drawTank(tanks[i]);
    }
}
function start(pass) {
    level=pass;
    var tank1 = new Tank(1,0,0);
    tanks.push(tank1);
    var tank2 = new Tank(1,24,24);
    tanks.push(tank2);
    // my.move();
    setInterval(function () {
        for(var i in tanks){
            tanks[i].move();
        }
        draw();
    },300)
    draw()
}
start(0)