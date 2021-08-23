auto.waitFor();
// console.show();
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
 }
 if(files.isDir("/storage/emulated/0/Pictures/qqsweetfarm/")){
    log("src exists!");
    sleep(1000);
}else{
    toast("src lost!");
    exit();
}

// variables
var landstep_offset = new Point(87.6, 43.5);
var topleft_offset = new Point(+83, +29);
var downright_offset = new Point(+0, +43);
var workDir = "/storage/emulated/0/Pictures/qqsweetfarm/";

// load sources
var all_pictures = files.listDir(workDir);
var all_imgs = {};

for(var key in all_pictures){
    all_imgs[all_pictures[key]] = images.read(workDir+all_pictures[key]);
}
toast("脚本启动成功");


//toast("load images done!");


// launch App
var appName = "情侣空间";
launchApp(appName);

// skip the ad
sleep(2000);
var skip_btn = id("tt_splash_skip_btn").findOnce();
if(skip_btn){
    skip_btn.click();
}
sleep(1000);
toast("App 启动成功");

var wmdxsj;
while(true){
    wmdxsj = text("我们的小世界").findOnce();
    if(wmdxsj){
        wmdxsj.click();
        sleep(1000);
        break;
    }
    sleep(1000);
}


var wmdnc;
while(true){
    wmdnc = text("我们的农场").findOnce();
    if(wmdnc){
        clickObject(wmdnc);
        sleep(1000);
        break;
    }
    sleep(1000);
}
sleep(1000);

while(true){
    var img = rootGetScreen();
    // img = images.rotate(img, 270);
    // images.save(img, "/sdcard/Android/cap.png");
    // images.save(all_imgs["home_loading_rtn.png"], "/sdcard/Android/btn.png");
    var point = findImageInRegion(img, 
                    all_imgs["home_loading_rtn.png"],
                    0,0,200,200,0.8
                );
    img.recycle();
    if(!point){
        toast("farm setup done!");
        break;
    }
    sleep(1000);
    toast("waiting farm setup...");
}


sleep(2000);
// close the notice

var img = rootGetScreen();
var point = findImageInRegion(img, all_imgs["notice_close_btn.png"],
                1000,0,1000,1000,0.8);
img.recycle();
if(point){
    clickImage("notice_close_btn.png", point);
    sleep(1000);
}else{
    log("notice not found!");
}
sleep(1000);
// close the ads
img = rootGetScreen();

point = findImage(img, all_imgs["warehouse_upgrading_ad_close_btn.png"], {threshold: 0.8});
img.recycle();
if(point){
    clickImage("warehouse_upgrading_ad_close_btn.png", point);
    sleep(1000);
}else{
    log("upgrade not found!");
    sleep(1000);
}

// center the lands by topping the delivery truck
img = rootGetScreen();
point = findImage(img, all_imgs["delivery_truck.png"], {threshold: 0.8});
img.recycle();
if(point){
    swipe(point.x+100, point.y+100, 1115, 100, 2000);
    sleep(1000);
} else{
    log("truck not found!");
    sleep(1000);
}

var flag = true;
while(true){
    img = rootGetScreen();
    var ptopleft = findImage(img, all_imgs["topleft.png"], 
                        {threshold: 0.9});
    img.recycle();
    if(!ptopleft){ 
        toast("find point of topleft land failed!");
        sleep(10000);
        continue;
    }else{

    }
    swipe(ptopleft.x, ptopleft.y, 
        1115, 645, 2000);
    img = rootGetScreen();
    ptopleft = findImage(img, all_imgs["topleft.png"], 
                        {threshold: 0.9});
    var pdownright = findImage(img, all_imgs["downright.png"], 
                        {threshold: 0.9});
    if(!pdownright){
        pdownright = findImage(img, all_imgs["downright.png"], 
                        {threshold: 0.8});
    }
    img.recycle();
    if((!ptopleft) || (!pdownright)){ 
        toast("find point of downright land failed!");
        break; 
    }
    ptopleft.x = ptopleft.x + topleft_offset.x;
    ptopleft.y = ptopleft.y + topleft_offset.y;
    pdownright.x = pdownright.x + downright_offset.x;
    pdownright.y = pdownright.y + downright_offset.y;

    clickImage("single_land_wheat_mature.png", ptopleft);
    
    img = rootGetScreen();
    var point_sickle = findImage(img, all_imgs["sickle.png"], {threshold: 0.8});
    if(!point_sickle){
        toast("find sickle failed!");
        point_sickle = new Point(950, 430);
    }
    var land_path = getLandPath(ptopleft, pdownright);
    if(land_path == null){
        continue;
    }
    multiSwipe([point_sickle.x, point_sickle.y], land_path);

    var point_openspace = findImage(img, all_imgs["open_space.png"], {threshold: 0.8});
    if(point_openspace){
        click(point_openspace.x, point_openspace.y);
        sleep(500);
    }
    clickImage("single_land_none_wheat.png", ptopleft);
    img = rootGetScreen();
    var point_wheat = findImage(img, all_imgs["sow_wheat_src.png"], {threshold: 0.8});
    if(!point_wheat){
        toast("find wheat src failed!");
        point_wheat = new Point(680, 470);
    }
    img.recycle();
    multiSwipe([point_wheat.x, point_wheat.y] ,land_path);

    sellWheat();
    sellWheat();

    sleep(115000);
    // sleep(120000);
    if(!flag){
        break;
    }
}



for(var key in all_pictures){
    all_imgs[all_pictures[key]].recycle();
}

toast("脚本运行结束！");


function clickImage(path, point){
    var pixels = images.readPixels(workDir + path);
    var width = pixels.width;
    var height = pixels.height;
    return click(point.x + width/2, point.y + height/2);
}


// click an object
function clickObject(obj, xoffset, yoffset){ 
    var b = obj.bounds();
    var x = Number(xoffset) || 0;
    var y = Number(yoffset) || 0;
    return click(b.centerX() + x, b.centerY() + y);
}

function rootGetScreen() {
    shell("screencap -p " + workDir +"sc.png", true);
    sleep(100);
    return images.read(workDir + 'sc.png');
}

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

function multiSwipe(_pstart, _land_path){
    switch(_land_path.length){
        case 6:
            gesture(6000, _pstart,_land_path[0],_land_path[1],_land_path[2],
                    _land_path[3],_land_path[4],_land_path[5]);
            break;
        case 8:
            gesture(8000, _pstart,_land_path[0],_land_path[1],_land_path[2],
                    _land_path[3],_land_path[4],_land_path[5],_land_path[6],_land_path[7]);
            break;
        case 10:
            gesture(8000, _pstart,_land_path[0],_land_path[1],_land_path[2],
                    _land_path[3],_land_path[4],_land_path[5],_land_path[6],
                    _land_path[7],_land_path[8],_land_path[9]);
            break;
        default:
            toast("mutiswipe failed!");
            break;
    }
}

function sellWheat(){
    var _img = rootGetScreen();
    var _point = findImage(_img, all_imgs["warehouse.png"], 
                        {threshold: 0.9});
    if(_point){
        clickImage("warehouse.png", _point);
        sleep(500);
        click(630, 555);    // position of wheat in warehouse
        sleep(500);
        click(600, 1050);   // sell btn in warehouse
        sleep(500);
        click(1110, 760);   // OK btn
        sleep(500);
        click(1700, 230);   // close btn
        click(500);
        return true;
    }
    return false;
}