auto.waitFor();
console.show();
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

// load sources
var all_pictures = files.listDir("/storage/emulated/0/Pictures/qqsweetfarm/");
var all_imgs = {};

for(var key in all_pictures){
    var tmp = images.read('/storage/emulated/0/Pictures/qqsweetfarm/'+all_pictures[key]);
    all_imgs[all_pictures[key]] = tmp;
    // tmp.recycle();
}
toast("脚本启动成功");


//toast("load images done!");

/*
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
    var img = captureScreen();
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
*/
sleep(2000);
// close the notice
var img = captureScreen();
var point = findImageInRegion(img, all_imgs["notice_close_btn.png"], 1000, 0, 1000, 1000, 0.9);
img.recycle();
if(point){
    clickImage("notice_close_btn.png", point);
    sleep(1000);
}else{
    toast("notice not found!")
}
sleep(2000);
// close the ads
img = captureScreen();
point = findImageInRegion(img, 
                all_imgs["warehouse_upgrading_ad_close_btn.png"]
            );
img.recycle();
if(point){
    clickImage("warehouse_upgrading_ad_close_btn.png", point);
    sleep(1000);
}else{
    toast("upgrade not found!")
}
sleep(2000);
img = captureScreen();
point = findImageInRegion(img, 
                all_imgs["delivery_truck.png"]
            );
img.recycle();
if(point){
    swipe(point.x+100, point.y+100, 1115, 100, 2000);
    sleep(1000);
} else{
    toast("truck not found!")
}
sleep(2000);
img = captureScreen();
point = findImageInRegion(img, 
                all_imgs["single_land_wheat_mature.png"]
            );
img.recycle();
if(point){
    clickImage("single_land_wheat_mature.png", point);
    sleep(1000);
    img = captureScreen();
    var point_land = findImageInRegion(img, 
                    all_imgs["single_land_wheat_mature_clicked.png"]
                );
    var point_sickle = findImageInRegion(img, 
        all_imgs["sickle.png"]
    );
    img.recycle();
    if(point_land && point_sickle){
        swipe(point_sickle.x+60, point_sickle.y+60, 
            point_land.x+30, point_land.y+20, 1000   
        );
    }
}else{
    toast("wheat not found!")
}

toast("脚本运行结束！");


function clickImage(path, point){
    var pixels = images.readPixels("/storage/emulated/0/Pictures/qqsweetfarm/" + path);
    var width = pixels.width;
    var height = pixels.height;
    toast(width, height);
    return click(point.x + width/2, point.y + height/2);
}


// click an object
function clickObject(obj, xoffset, yoffset){ 
    var b = obj.bounds();
    var x = Number(xoffset) || 0;
    var y = Number(yoffset) || 0;
    return click(b.centerX() + x, b.centerY() + y);
}