// auto.waitFor();
// console.show();

var workDir = "/sdcard/脚本/src/qqsweetfarm/";
var landstep_offset = new Point(87.6, 43.5);
var topleft_offset = new Point(+83, +29);
var downright_offset = new Point(+0, +43);
var tmp = new Point;

console.log(tmp);


var ptopleft = new Point(724.0, 796.0)
var pdownright = new Point(1420.0, 652.0);
ptopleft.x = ptopleft.x + topleft_offset.x;
ptopleft.y = ptopleft.y + topleft_offset.y;
pdownright.x = pdownright.x + downright_offset.x;
pdownright.y = pdownright.y + downright_offset.y;

var land_path = getLandPath(ptopleft, pdownright);

console.log(land_path);
console.log(land_path[0]);

function Point(_x, _y){
    this.x = _x || 0;
    this.y = _y || 0;
}

function getLandPath(_ptopleft, _pdownright){
    var path = [];
    var _pdownleft = new Point();
    var r = 1;
    var c = 0;
    while(true){
        _pdownleft.x = _ptopleft.x + r * landstep_offset.x;
        _pdownleft.y = _ptopleft.y + r * landstep_offset.y;
        c = (_pdownright.x - _pdownleft.x) / landstep_offset.x;
        if(Math.abs(_pdownleft.y - c * landstep_offset.y - _pdownright.y) <= 10){
            break;
        }
        r = r + 1;
        if(r>5){
            return null;
        }
    }
    for(var i = 0; i <= r; i++){
        if(i % 2 == 0){
            path[i*2] = [_ptopleft.x + i*landstep_offset.x, _ptopleft.y + i*landstep_offset.y];
            path[i*2+1] = [_ptopleft.x + (c+i)*landstep_offset.x, _ptopleft.y + (i-c)*landstep_offset.y];
        }else{
            path[i*2+1] = [_ptopleft.x + i*landstep_offset.x, _ptopleft.y + i*landstep_offset.y];
            path[i*2] = [_ptopleft.x + (c+i)*landstep_offset.x, _ptopleft.y + (i-c)*landstep_offset.y];
        }
    }
    return path;
}