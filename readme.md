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

point of topleft land: (724.0, 796.0)
point of downright land: (1420.0, 652.0)

true point of topleft land: (807.0, 825.0)  diff: (+83, +29)
true point of downright land: (1420, 695)   diff: (+0, +43)

true point of downleft land: (983, 912)

slop: 153.5° or 26.5°
step size: ( (87.4, 43.4) + (88, 43.5) ) / 2 = (87.6, 43.5)