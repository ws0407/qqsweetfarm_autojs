/**
 * device:      Redmi K20 Pro
 * resolution:  2340 x 1080
 * DPI:         unknown
 * farm shape:  rectangles
 * 
 */
 auto.waitFor();
// console.show();

var workDir = "/sdcard/脚本/src/qqsweetfarm/";
var landstep_offset = new Point(73, 36.3);
var topleft_offset = new Point(+172,+143);
var downright_offset = new Point(+4,+123);
var topleft_true_point = new Point(661,570)
var downright_true_point = new Point(1830,352)
var warehouse_true_point = new Point(1600,645);
var wheat_sow_true_point = new Point(760,360);
var delivery_truck_true_point = new Point(1152,552);
var sickle_true_point = new Point(990,320);
var home_rtn_btn_true_point = new Point(153, 53);
var warehouse_wheat_true_point = new Point(698.0, 396.0);

if(!requestScreenCapture()){
    toastLog("request screen capture failed!");
    exit();
 }
 if(files.isDir(workDir)){
    log("src exists!");
    sleep(1000);
}else{
    toastLog("src lost!");
    exit();
}

// load sources
var all_pictures = files.listDir(workDir);
var all_imgs = {};

for(var key in all_pictures){
    all_imgs[all_pictures[key]] = images.read(workDir+all_pictures[key]);
}
toastLog("script setup done!");

// launch App
var appName = "情侣空间";
launchApp(appName);
sleep(3000);

// Determine whether it is vertical screen
var img = images.captureScreen();
if(img.getWidth() < img.getHeight()){
    var skip_btn = id("tt_splash_skip_btn").findOnce();
    if(skip_btn){
        skip_btn.click();
        sleep(1000);
    }
    toastLog("App setup done");
}
img.recycle();

// begin working
var flag = true;
var times = 1;
var status = 1;     // 1:harvest, 2:sow, 3:sell, 4:wrong
var is_crashed = 0;
while(flag){
    // prevent application jamming
    launchApp(appName);
    sleep(1000);
    var img = images.captureScreen();
    if(img.getWidth() < img.getHeight()){
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
            var img = images.captureScreen();
            var point = findImageInRegion(img, 
                            all_imgs["home_loading_rtn_btn.png"],
                            0,0,200,200,0.8
                        );
            img.recycle();
            if(!point){
                sleep(5000);
                break;
            }
            // toast("waiting farm setup...");
            log("waiting farm setup...");
            sleep(5000);
        }

    }
    img.recycle();

    // close the notice
    img = images.captureScreen();
    point = findImageInRegion(img, all_imgs["everyday_task_close_btn.png"],
                            1620, 130, 200, 200, 0.8);
    if(point){
        clickImage("everyday_task_close_btn.png", point);
        log("close the everyday task.")
        sleep(1000);
    }
    // close the activity ads

    // close the upgrade warehouse
    img = images.captureScreen();
    point = findImageInRegion(img, all_imgs["warehouse_upgrading_ad_close_btn.png"], 
                            1500, 270, 200, 200, 0.8);
    if(point){
        clickImage("warehouse_upgrading_ad_close_btn.png", point);
        log("close the warehouse upgrading ad.")
        sleep(1000);
    }

    // sign in when a new day come

    // center the lands by topping the delivery truck
    img = images.captureScreen();
    point = findImage(img, all_imgs["delivery_truck.png"], {threshold: 0.8});
    if(point){
        is_crashed = 0;
        swipe(point.x, point.y+100, 1000, 0, 2000);
        sleep(1000);
    }else{
        log("truck not found!");
        is_crashed = is_crashed + 1;
        // var point_openspace = findImage(img, all_imgs["open_space.png"], {threshold: 0.8});
        // if(point_openspace){
        //     swipe(point_openspace.x + 100, point_openspace.y + 100, point_openspace.x, point_openspace.y+100, 1000);
        // }
        // img.recycle();
        if(is_crashed >= 3){
            is_crashed = 0;
            restartApp(appName);
            continue;
        }
        click(home_rtn_btn_true_point.x, home_rtn_btn_true_point.y);
        sleep(5000);
        continue;
    }


    // locate to all lands
    img = images.captureScreen();
    var ptopleft = findImage(img, all_imgs["land_topleft.png"], 
                        {threshold: 0.9});
    var pdownright = findImage(img, all_imgs["land_downright.png"], 
                        {threshold: 0.9});
    img.recycle();
    if((!ptopleft) || (!pdownright)){
        if(ptopleft){
            log("ptopleft:"+ptopleft);
            if(Math.abs(ptopleft.x + topleft_offset.x - topleft_true_point.x) < 10){
                ptopleft = topleft_true_point;
                pdownright = downright_true_point;
            }else{
                click(home_rtn_btn_true_point.x, home_rtn_btn_true_point.y);
                sleep(20000);
                continue;
            }
        }else if(pdownright){
            log("pdownright:"+pdownright);
            if(Math.abs(pdownright.x + downright_offset.x - downright_true_point.x) < 10){
                ptopleft = topleft_true_point;
                pdownright = downright_true_point;
            }else{
                click(home_rtn_btn_true_point.x, home_rtn_btn_true_point.y);
                sleep(20000);
                continue;
            }
        } else{
            // toast("find point of topleft/downright land failed!");
            log("find point of topleft/downright land failed!");
            var ptopleft_empty = findImage(img, all_imgs["land_topleft_empty.png"], 
                        {threshold: 0.9});
            var pdownright_empty = findImage(img, all_imgs["land_downright_empty.png"], 
                        {threshold: 0.9});
            if(ptopleft_empty && pdownright_empty){
                status = 2;
            }else{
                click(home_rtn_btn_true_point.x, home_rtn_btn_true_point.y);
                sleep(20000);
                continue;
            }
        }
    }

    // harvest wheat
    if(status == 1){
        click(1170, 540);
        sleep(1000);
        img = images.captureScreen();
        var point_sickle = findImage(img, all_imgs["sickle.png"], {threshold: 0.8});
        if(!point_sickle){
            var point_wheat_sow = findImage(img, all_imgs["sow_wheat_src.png"], {threshold: 0.8});
            if(point_wheat_sow){
                status = 2;
            }else{
                log("find sickle failed!");
                click(home_rtn_btn_true_point.x, home_rtn_btn_true_point.y);
                sleep(10000);
                continue;
            }
        }else{
            var land_path = getLandPath(ptopleft, pdownright);
            if(land_path == null){
                land_path = getLandPath(topleft_true_point, downright_true_point);
            }
            multiSwipe([point_sickle.x, point_sickle.y], land_path);
            status = 2;
        }
    }
    
    // click openspace to refresh
    // var point_openspace = findImage(img, all_imgs["open_space.png"], {threshold: 0.8});
    // if(point_openspace){
    //     click(point_openspace.x, point_openspace.y);
    //     log("click open space ok");
    //     sleep(1000);
    // }else{
    //     log("click open space failed!");
    // }

    // sow wheat
    if(status == 2){
        click(1170, 540);
        sleep(2000);
        img = images.captureScreen();
        var point_wheat_sow = findImage(img, all_imgs["sow_wheat_src.png"], {threshold: 0.8});
        if(!point_wheat_sow){
            toastLog("find wheat src failed!");
            click(1170, 540);
            sleep(1000);
            img = images.captureScreen();
            var point_wheat_sow = findImage(img, all_imgs["sow_wheat_src.png"], {threshold: 0.8});
            if(!point_wheat_sow){
                var point_sickle = findImage(img, all_imgs["sickle.png"], {threshold: 0.8});
                if(point_sickle){
                    log("warehouse has benn full, begin to sell...");
                    sellWheat();
                    status = 1;
                }else{
                    toastLog("maybe sometiing goes to wrong...");
                    sleep(10000);
                }
                continue;
            }
        }
        img.recycle();
        multiSwipe([point_wheat_sow.x + 70, point_wheat_sow.y + 60] ,land_path);
        status = 3;
    }

    if(status == 3){
        var result = sellWheat();
        status = 1;
        if(result){
            toastLog("第"+ times +"轮刷麦子已完成...");
            times = times + 1;
            sleep(2000);
            click(home_rtn_btn_true_point.x, home_rtn_btn_true_point.y);
            sleep(100000);
        }
    }
}

toastLog("脚本运行结束");

/**
 * useful functions
 */
// click an image
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

// define a point
function Point(_x, _y){
    this.x = _x || 0;
    this.y = _y || 0;
}

// get the path of the sickle or the wheat seed
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
        if(r>10){
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

// swipe with a specific path
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
            gesture(10000, _pstart,_land_path[0],_land_path[1],_land_path[2],
                    _land_path[3],_land_path[4],_land_path[5],_land_path[6],
                    _land_path[7],_land_path[8],_land_path[9]);
            break;
        case 12:
            gesture(12000, _pstart,_land_path[0],_land_path[1],_land_path[2],_land_path[3],
                    _land_path[4],_land_path[5],_land_path[6],_land_path[7],_land_path[8],
                    _land_path[9],_land_path[10],_land_path[11]);
            break;
        case 14:
            gesture(12000, _pstart,_land_path[0],_land_path[1],_land_path[2],_land_path[3],
                    _land_path[4],_land_path[5],_land_path[6],_land_path[7],_land_path[8],
                    _land_path[9],_land_path[10],_land_path[11],_land_path[12],_land_path[13]);
            break;
        default:
            toast("mutiswipe failed!");
            log("mutiswipe failed!");
            break;
    }
}

// open the warehouse and sell wheat
function sellWheat(){
    var _img = images.captureScreen();
    var _point = findImage(_img, all_imgs["warehouse.png"], 
                        {threshold: 0.8});
    if(!_point){
        click(warehouse_true_point.x, warehouse_true_point.y);
    }else{
        clickImage("warehouse.png", _point);
    }
    sleep(1000);
    _img = images.captureScreen();
    var warehouse_wheat = findImage(_img, all_imgs["warehouse_wheat.png"], 
                        {threshold: 0.8});
    
    if(!warehouse_wheat || Math.abs(warehouse_wheat.x - warehouse_wheat_true_point.x) + Math.abs(warehouse_wheat.y - warehouse_wheat_true_point.y) > 20){
        click(1680, 185);       // close btn
        sleep(500);
        return false;
    }
    click(750, 470);        // position of wheat in warehouse
    sleep(500);
    for(var i = 0; i < 30; i++){
        click(905, 755);    // add the num of wheat to sell
        sleep(100);
    }
    click(740, 890);        // sell btn in warehouse
    sleep(500);
    click(1170, 640);       // OK btn
    sleep(500);
    click(1680, 185);       // close btn
    sleep(500);
    return true;
}

function rootGetScreen() {
    shell("screencap -p " + workDir +"sc.png", true);
    sleep(100);
    return images.read(workDir + 'sc.png');
}

function restartApp(_appName) {
    home();
    sleep(1000);
    home();
    sleep(1000);
    home();
    sleep(1000);
    click(900, 1500);
    sleep(3000);
    launchApp(_appName);
    return true;
}
