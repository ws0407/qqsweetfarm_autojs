# QQSweetFarm - AutoJS

An automatic script to harvest, sow and sell wheat in qqsweetfarm.

---------------------------------
I - Development environment
---------------------------------

- **1. PC**   
  - visual studio code
  - LeiDian Player
- **2. Simulator**
  - AutoJS Pro
  - QQSweet
- **3. Device Settings**
  - Resolution: 2230 x 1290
  - DPI: 240
  - Mobile type: Mi 9

---------------------------------
II - Setup Instruction 
---------------------------------

Refer to: https://zhuanlan.zhihu.com/p/90065914

---------------------------------
III- Code Method
---------------------------------

### 1. calculate one possible path
#### ***-- LeiDian:***
point of topleft land: (724.0, 796.0)
point of downright land: (1420.0, 652.0)

true point of topleft land: (807.0, 825.0)  diff: (+83, +29)
true point of downright land: (1420, 695)   diff: (+0, +43)

true point of downleft land: (983, 912)

slop: 153.5° or 26.5°
step size: ( (87.4, 43.4) + (88, 43.5) ) / 2 = (87.6, 43.5)

#### ***-- Redmi K20 Pro:***
point of topleft land: (724.0, 796.0)
point of downright land: (1420.0, 652.0)

true point of topleft land: (807.0, 825.0)  diff: (+83, +29)
true point of downright land: (1420, 695)   diff: (+0, +43)

true point of downleft land: (983, 912)

slop: 153.5° or 26.5°
step size: ( (87.4, 43.4) + (88, 43.5) ) / 2 = (87.6, 43.5)

tl:{396.0, 568.0}   
dr:{1732.0, 360.0}
dl:{813.0, 856.0}   => stepsize = {73, 36.3}
ntl:{276.0, 532.0}  PS(276,535)   true(448,675)   (+172,+143)
ndr:{1612.0, 328.0} PS(1614,330)  true(1616,455)  (+4,+123)
hlrb:{36.0, 36.0}

topleft:                          true(661,570)
downright:                        true(1830,352)
hrb:{126.0, 26.0}                 true(153,53)
sickle:                           true{990,320}    
delivery truck:                   true{1152,552}
wheat to sow:                     true{760,360}
warehouse:{1516,540}              true{1600,645}
warehouse_wheat:{696.0, 396.0}    true{698+δx, 396+δy}

---------------------------------
IIII- Lessons
---------------------------------

- *Q: In the AutoJS interface, it's able to open other applications, other interfaces cannot (such as the home page)*
- **A: Open "pop up interface in background" permission for AutoJS (in Chinese: "后台弹出界面").**

- *Q: How can we do when a running app going crashed?*
- **A: The screen won't change after several tests, so I set up a counter to record the time of crash, restart the app when the counter is greater than a specific value.**