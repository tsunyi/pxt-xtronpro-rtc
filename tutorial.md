# Watch

## Introduction @showdialog

Make a watch application to display the time, date and alarm.

![](image/watch-app.png)

Let's get started!

## Extensions @showdialog

Extensions in Arcade allow users to easily develop and share portions of their code with others. In this tutorial, you will be using the [arcade-text](https://github.com/microsoft/arcade-text) and [xtronpro-rtc](https://github.com/tsunyi/pxt-xtronpro-rtc) extensions to create a watch application. In this example the extension is automatically loaded: in other projects, you can load the extension by yourself.

Click [here](https://xtron-docs.readthedocs.io/en/latest/pxt-extensions.html) to learn how to load extension.

## 2. See the Scene

**Your scene has already been set!**

---

- :binoculars: Look at your workspace to see that the **background image** has already been set for the scene in this tutorial.

_💡 The blocks has been added to the 
``||loops: on start||`` container so they 
load as soon as the game starts.)_


## 3. Create a time Text Sprite

---

- :font: From the ``||textsprite:Text Sprite||`` category, 
drag  
``||variables:set [textSprite] to text sprite []||``  
to **the end** of the ``||loops:on start||`` container.

_💡  Having trouble finding the block you need? 
Look to the left of the instructions for the icon 
of the toolbox category where your block lives!_

- :mouse pointer: Click 
``||variables:textSprite||``  
and rename the variable **time**.

- :calendar: From the ``||rtc:RTC||`` category, drag  
``||rtc:string format time []||``  
to the empty white box of  
``||variables:set [textSprite] to text sprite [ ]||`` 

- :paint brush: Change the text of  
``||rtc:string format time []||``  
to **hh mm**

```blocks
scene.setBackgroundImage(assets.image`background`)
// @highlight
let time = textsprite.create(rtc.stringFormatTime("hh mm"))
```

## 4. Change the appearance of time

---

- :font: Drag  
``||textsprite:set [textsprite] outline [1] []||``  
to **the end** of the ``||loops:on start||`` container.

- :mouse pointer: Click
``||variables:textSprite||``
and select ``||variables:time||``.

- :font: Drag  
``||textsprite:set [textsprite] max font height [0]||``  
to **the end** of the ``||loops:on start||`` container.

- :mouse pointer: Click
``||variables:textSprite||``
and select ``||variables:time||``.

- :paint brush: Change max font height from 0 to 24.

- :paper plane: Drag  
``||sprites:set [mySprite] position to x [0] y [0]||``  
to **the end** of the ``||loops:on start||`` container.

- :mouse pointer: Click
``||variables:mySprite||``
and select ``||variables:time||``.

- :paint brush: Change x value from 0 to 80, y value from 0 to 38.

```blocks
scene.setBackgroundImage(assets.image`background`)
let time = textsprite.create(rtc.stringFormatTime("hh mm"))
// @highlight
time.setOutline(1, 6)
time.setMaxFontHeight(24)
time.setPosition(80, 38)
```

## 5. Create a colon for time

---

- :paper plane: Drag  
``||sprites:set [mySprite] to sprite [] of kind [Player]||``  
to **the end** of the ``||loops:on start||`` container.

- :mouse pointer: Click 
``||variables:mySprite||``  
and rename the variable **colon**.

- :paint brush: To choose the colon, click the empty grey box, 
then toggle to **My Assets** and click the image named **colon**.

- :paper plane: Drag  
``||sprites:set [mySprite] position to x [0] y [0]||``  
to **the end** of the ``||loops:on start||`` container.

- :mouse pointer: Click
``||variables:mySprite||``
and select ``||variables:colon||``.

- :paint brush: Change x value from 0 to 80, y value from 0 to 38.

```blocks
scene.setBackgroundImage(assets.image`background`)
let time = textsprite.create(rtc.stringFormatTime("hh mm"))
time.setOutline(1, 6)
time.setMaxFontHeight(24)
time.setPosition(80, 38)
// @highlight
let colon = sprites.create(assets.image`colon`, SpriteKind.Player)
colon.setPosition(80, 38)
```

## 6. Create a date Text Sprite

---

- :font: From the ``||textsprite:Text Sprite||`` category, 
drag  
``||variables:set [textSprite] to text sprite []||``  
to **the end** of the ``||loops:on start||`` container.

- :mouse pointer: Click 
``||variables:textSprite||``  
and rename the variable **date**.

- :calendar: From the ``||rtc:RTC||`` category, drag  
``||rtc:string format time []||``  
to the empty white box of  
``||variables:set [date] to text sprite []||`` 

- :paint brush: Change the text of  
``||rtc:string format time []||``
to **MMM DD WW**

- :paper plane: Drag  
``||sprites:set [mySprite] position to x [0] y [0]||``  
to **the end** of the ``||loops:on start||`` container.

- :mouse pointer: Click
``||variables:mySprite||``
and select ``||variables:date||``.

- :paint brush: Change x value from 0 to 80, y value from 0 to 60.

```blocks
scene.setBackgroundImage(assets.image`background`)
let time = textsprite.create(rtc.stringFormatTime("hh mm"))
time.setOutline(1, 6)
time.setMaxFontHeight(24)
time.setPosition(80, 38)
let colon = sprites.create(assets.image`colon`, SpriteKind.Player)
colon.setPosition(80, 38)
// @highlight
let date = textsprite.create(rtc.stringFormatTime("MMM DD WW"))
date.setPosition(80, 60)
```

## 7. Create a alarm Text Sprite

---

- :font: From the ``||textsprite:Text Sprite||`` category, 
drag  
``||variables:set [textSprite] to text sprite []||``  
to **the end** of the ``||loops:on start||`` container.

- :mouse pointer: Click 
``||variables:textSprite||``  
and rename the variable **alarm**.

- :calendar: From the ``||rtc:RTC||`` category, drag  
``||rtc:string format alarm []||``  
to the empty white box of  
``||variables:set [alarm] to text sprite []||`` 

- :font: Drag  
``||textsprite:set textsprite icon []||``  
to **the end** of the ``||loops:on start||`` container.

- :mouse pointer: Click 
``||variables:mySprite||``
and select ``||variables:alarm||``.

- :paint brush: Click the empty grey box, 
then toggle to **My Assets** and click the image named **alarm**.

- :paper plane: Drag  
``||sprites:set [mySprite] position to x [0] y [0]||``  
to **the end** of the ``||loops:on start||`` container.

- :mouse pointer: Click
``||variables:mySprite||``
and select ``||variables:alarm||``.

- :paint brush: Change x value from 0 to 80, y value from 0 to 100.

```blocks
scene.setBackgroundImage(assets.image`background`)
let time = textsprite.create(rtc.stringFormatTime("hh mm"))
time.setOutline(1, 6)
time.setMaxFontHeight(24)
time.setPosition(80, 38)
let colon = sprites.create(assets.image`colon`, SpriteKind.Player)
colon.setPosition(80, 38)
let date = textsprite.create(rtc.stringFormatTime("MMM DD WW"))
date.setPosition(80, 60)
// @highlight
let alarm = textsprite.create(rtc.stringFormatAlarm("hh:mm"))
alarm.setIcon(assets.image`alarm`)
alarm.setPosition(80, 100)
```

## 8. Update time, date and alarm

We need to update the time, date and alrm value periodically

---

- :circle: From ``||game:Game||`` category, drag  
``||game:on game update||``  
container into an empty area of the workspace.

- :font: Drag  
``||textsprite:set [textSprite] text []||``  
to **the end** of the ``||game:on game update||`` container.

- :mouse pointer: Click ``||variables:textSprite||``
to select ``||variables:time||``.

- :calendar: Drag  
``||rtc:string format time []||``  
to the empty white box of  
``||textsprite:set [time] to text []||``

- :paint brush: Change the text of  
``||rtc:string format time []||``
to **hh mm**

- :font: Drag  
``||textsprite:set [textSprite] text []||``  
to **the end** of the ``||game:on game update||`` container.

- :mouse pointer: Click ``||variables:textSprite||``
to select ``||variables:date||``.

- :calendar: Drag  
``||rtc:string format time []||``  
to the empty white box of  
``||textsprite:set [date] to text []||``

- :paint brush: Change the text of  
``||rtc:string format time []||``
to **MMM DD WW**

- :font: Drag  
``||textsprite:set [textSprite] text []||``  
to **the end** of the ``||game:on game update||`` container.

- :mouse pointer: Click ``||variables:textSprite||`` 
to select ``||variables:alarm||``.

- :calendar: Drag  
``||rtc:string format alarm []||``  
to the empty white box of  
``||textsprite:set [alarm] to text []||``

```blocks
scene.setBackgroundImage(assets.image`background`)
let time = textsprite.create(rtc.stringFormatTime("hh mm"))
time.setOutline(1, 6)
time.setMaxFontHeight(24)
time.setPosition(80, 38)
let colon = sprites.create(assets.image`colon`, SpriteKind.Player)
colon.setPosition(80, 38)
let date = textsprite.create(rtc.stringFormatTime("MMM DD WW"))
date.setPosition(80, 60)
let alarm = textsprite.create(rtc.stringFormatAlarm("hh:mm"))
alarm.setIcon(assets.image`alarm`)
alarm.setPosition(80, 100)

// @highlight
game.onUpdate(function () {
    time.setText(rtc.stringFormatTime("hh mm"))
    date.setText(rtc.stringFormatTime("MMMDD WW"))
    alarm.setText(rtc.stringFormatAlarm("hh:mm"))
})
```

## 9. Alarm ba ding

When the alarm time is up, play sound ba ding.

---

- :calendar: Drag ``||rtc:on alarmed||``  
container into an empty area of the workspace.

- :headphones: Drag ``||music:play sound [ba ding]||``  
to **the end** of ``||rtc:on alarmed||``

- :calendar: Drag ``||rtc:clear alarm status||``  
to **the end** of ``||rtc:on alarmed||``

_💡 ``||rtc:clear alarm status||`` block needs to always be used with ``||rtc:on alarmed||``._

```blocks
rtc.onEvent(function () {
    music.baDing.play()
    rtc.clearAlarmStatus()
})
```

## Finale

🔥 **That's it! Now have a look at your watch!** 🔥  

Set a new alarm in the menu and wait for the alarm to play sound.

```template
scene.setBackgroundImage(assets.image`background`)
```

```package
textsprite=github:microsoft/arcade-text#v1.3.0
rtc=github:tsunyi/pxt-xtronpro-rtc#v0.2.0
```

```assetjson
{
  "README.md": " ",
  "assets.json": "",
  "images.g.jres": "{\n    \"gCt\": {\n        \"data\": \"hwSgAHgAAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8/MzMysqqrMzMzMr6/8+qr6/////////////////6qqyszMzMzMzMzMzKqqqqqqzPzP//rPzKyq+v////////////+qqqqq////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f3d39///////////////d3d3////////////////////////////////////////////////////////f3d3h4iI////////j4iId3d3////////////////////////////////////////////////////////f3d3h4iI////////j4iId3d3////////////////////////////////////////////////////////f3d3NzMzMzMzMzMzMzMzd3d3////////////////////////////////////////////////////////f3f3/////////////////3d3////////////////////////////////////////////////////////f3f3/////////////////3d3/////////////////////////////////////////////////////////4jz/////////////////4P4/////////////////////////////////////////////////////////4jz/////////////////4P4/////////////////////////////////////////////////////////4jz/////////////////4P4/////////////////////////////////////////////////////////4jz/////////////////4P4/////////////////////////////////////////////////////////4jz/////////////////4P4///////////////////////////////////////////////////////////z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////3/z//////////////////P//////////////////////////////////////////////////////////3fz//////////////////P/////////////////////////////////////////////////////////f/fz//////////////////P/////////////////////////////////////////////////////////f//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////4/z//////////////////P//////////////////////////////////////////////////////////4jz//////////////////P/////////////////////////////////////////////////////////j/jz//////////////////P/////////////////////////////////////////////////////////j//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////3/z//////////////////P//////////////////////////////////////////////////////////3fz//////////////////P/////////////////////////////////////////////////////////f/fz//////////////////P/////////////////////////////////////////////////////////f//z//////////////////P/////zMzMzMz8zMzMzMzMzKyqqs/MzMzMzMzPzPz6r6/////////////////z//////////////////P//////////////////////////////////////////////////////////4/z//////////////////P//////////////////////////////////////////////////////////4jz//////////////////P/////////////////////////////////////////////////////////j/jz//////////////////P/////////////////////////////////////////////////////////j//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////3/z//////////////////P//////////////////////////////////////////////////////////3fz//////////////////P/////////////////////////////////////////////////////////f/fz//////////////////P/////////////////////////////////////////////////////////f//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////4/z//////////////////P//////////////////////////////////////////////////////////4jz//////////////////P/////////////////////////////////////////////////////////j/jz//////////////////P/////////////////////////////////////////////////////////j//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////3/z//////////////////P//////////////////////////////////////////////////////////3fz//////////////////P/////////////////////////////////////////////////////////f/fz//////////////////P/////////////////////////////////////////////////////////f//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////4/z//////////////////P//////////////////////////////////////////////////////////4jz//////////////////P/////////////////////////////////////////////////////////j/jz//////////////////P/////////////////////////////////////////////////////////j//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////3/z//////////////////P//////////////////////////////////////////////////////////3fz//////////////////P/////////////////////////////////////////////////////////f/fz//////////////////P/////////////////////////////////////////////////////////f//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////4/z//////////////////P//////////////////////////////////////////////////////////4jz//////////////////P/////////////////////////////////////////////////////////j/jz//////////////////P/////////////////////////////////////////////////////////j//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////3/z//////////////////P//////////////////////////////////////////////////////////3fz//////////////////P/////////////////////////////////////////////////////////f/fz//////////////////P/////////////////////////////////////////////////////////f//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////4/z//////////////////P//////////////////////////////////////////////////////////4jz//////////////////P/////////////////////////////////////////////////////////j/jz//////////////////P//////8/MzMzMrKqq+q+qyszMzMys//r6/P/8////////////////////j//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////3/z//////////////////P//////////////////////////////////////////////////////////3fz//////////////////P////////////////////////////////////////////////PzMzMzMzMfPfz//////////////////P/////////////////////////////////////////////////////////f6/z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////4/z//////////////////P//////////////////////////////////////////////////////////4jz//////////////////P/////////////////////////////////////////////////////////j/jz//////////////////P/////////////////////////////////////////////////////////j//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////3/z//////////////////P//////////////////////////////////////////////////////////3fz//////////////////P/////////////////////////////////////////////////////////f/fz//////////////////P/////////////////////////////////////////////////////////f//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////4/z//////////////////P//////////////////////////////////////////////////////////4jz//////////////////P/////////////////////////////////////////////////////////j/jz//////////////////P/////////////////////////////////////////////////////////j//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////3/z//////////////////P//////////////////////////////////////////////////////////3fz//////////////////P/////////////////////////////////////////////////////////f/fz//////////////////P/////////////////////////////////////////////////////////f//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////4/z//////////////////P//////////////////////////////////////////////////////////4jz//////////////////P/////////////////////////////////////////////////////////j/jz//////////////////P/////////////////////////////////////////////////////////j//z//////////////////P////////////////////////////////////////////////////////////z//////////////////P//////////////////////////////////////////////////////////3/z//////////////////P//////////////////////////////////////////////////////////3fz//////////////////P/////////////////////////////////////////////////////////f/fz//////////////////P////////PysqsqszMzMzMzMzMzMz/////////////////////////////f//z//////////////////P////////////////////////////////////PzMzMzMz//////////////4jz/////////////////4P4/////////////////////////6+qqqqqqsr8/////////////////////4jz/////////////////4P4/////////////////////////////////////////////////////////4jz/////////////////4P4/////////////////////////////////////////////////////////4jz/////////////////4P4/////////////////////////////////////////////////////////4jz/////////////////4P4////////////////////////////////////////////////////////f3f3/////////////////3d3////////////////////////////////////////////////////////f3f3/////////////////3d3////////////////////////////////////////////////////////f3d3NzMzMzMzMzMzMzMzd3d3////////////////////////////////////////////z///////////f3d3h4iI////////j4iId3d3/////////////////////////////////////////////Pz/////////f3d3h4iI////////j4iId3d3///////////////////////////////////////////P/8//////////f3d39///////////////d3d3////////////////////////////////////////////P///////////////////////////////////////////////////////////////////////////////8/P///////////////////////////////////////////////////////////////////////////8//z//////////////////////////////////////////////////////////////////////////////z////////////////////////////////////////////////////////////////////////////////Pz////////////////////////////////////////////////////////////////////////////P/8//////////////////////////////////////////////////////////////////////////////P///////////////////////////////////////////////////////////////////////////////8/P///////////////////////////////////////////////////////////////////////////8//z///////////////////8zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz8z/z/+q//r6r6////////////z//////////////////////////////////PzMzMzMzMzMzM/P///////////////////////////////Pz///////8/M/P////////////////////////////////////////////////////////////////P/8/////////z/z/////////////////////////////////////z//////P////z////////z8/Pz8//P////////z/////z/////////////////////////////////z8z////PzP//z8z////////////////8/P//////z/////z/////////////////////////////////zMz8///MzPz/zMz8///////z8/Pz88//z///////z/////z//////////////f/////////////////PzMzM/8/MzMzPzMzM///////////////z////////z/////z////////////f3//////////////////PzMzM/8/MzMzPzMzM///////z8/Pz8///Pz////////z/z////////////////f/////////////////PzMzM/8/MzMzPzMzM//////////////P/8//////P/8/M/P/////////8////////////////////////zMz8z//MzPz/zMz8///////z8/Pz8//P///////8/P///////////8/P////////////////////////z8z//PzPzP/8z8z////////////////8/P/////P///////////////8//////////////////////////zP/8///M/P//z////////z8/Pz88//z//////////////////////////////////////////////////8///8//z//P///////////////8=\",\n        \"mimeType\": \"image/x-mkcd-f4\",\n        \"displayName\": \"background\"\n    },\n    \"ZB#gQvQ~\": {\n        \"data\": \"hwQQABAAAAAAAAAAAAAAAAAARAAAAAAAAEAEcHcHAAAAQHB3d3cHAAAAcHd3dwcAAAB3d3d3dwAAAHdVdXd3AAAAd3dXd3cAAAB3d1d3dwAAAHB3d3cHAABAcHd3dwcAAEAEcHcHAAAAAEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\",\n        \"mimeType\": \"image/x-mkcd-f4\",\n        \"displayName\": \"alarm\"\n    },\n    \"C~*lmWg_pknr\": {\n        \"data\": \"hwQQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYGZmAABmZgYWEREGYBERYRYREQZgERFhFhERBmAREWEWEREGYBERYRYREQZgERFhYGZmAABmZgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\",\n        \"mimeType\": \"image/x-mkcd-f4\",\n        \"displayName\": \"colon\"\n    },\n    \"@cBrO\": {\n        \"namespace\": \"OdKOvzwb19#oD8\",\n        \"id\": \"@cBrO\",\n        \"mimeType\": \"application/mkcd-animation\",\n        \"data\": \"ZTgwMzEwMDAxMDAwMDIwMDAwMDAwMDY2NjYwNjAwMDAwMDAwNjAxMTExNjEwMDAwMDAwMDYwMTExMTYxMDAwMDAwMDA2MDExMTE2MTAwMDAwMDAwNjAxMTExNjEwMDAwMDAwMDYwMTExMTYxMDAwMDAwMDAwMDY2NjYwNjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDY2NjYwNjAwMDAwMDAwNjAxMTExNjEwMDAwMDAwMDYwMTExMTYxMDAwMDAwMDA2MDExMTE2MTAwMDAwMDAwNjAxMTExNjEwMDAwMDAwMDYwMTExMTYxMDAwMDAwMDAwMDY2NjYwNjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAw\",\n        \"displayName\": \"dot\"\n    },\n    \"*\": {\n        \"mimeType\": \"image/x-mkcd-f4\",\n        \"dataEncoding\": \"base64\",\n        \"namespace\": \"myImages\"\n    }\n}",
  "images.g.ts": "// Auto-generated code. Do not edit.\nnamespace myImages {\n\n    helpers._registerFactory(\"image\", function(name: string) {\n        switch(helpers.stringTrim(name)) {\n            case \"gCt\":\n            case \"background\":return img`\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcff3ffcff3ffcff3ffcff3\nfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcff3ffcff3ffcff3ffcff3f\nffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcff3ffcff3ffcff3ffcff3ff\nfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcff3ffcff3ffcff3ffcff3f\nffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcff3ffcff3ffcff3ffcff3\nffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\nffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\nffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\nffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\nffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\nffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\nffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\nffffffffafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\nffffffffafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3ff\nffffffffafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3f3f\nffffffffafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3ff\nffffffffafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffff3333fffff\nffffffffcaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffff3ffff3ffff\nffffffffcaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffff3ffffff3fff\nffffffffcaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffff3ffffff3fff\nffffffffcafffffffffff777777fffffffff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77fffff777777ffffffffff3ffffff3fff\nffffffffcafffffffffff77777788888fff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77f88888777777ffffffffff3ffffff3fff\nffffffffcafffffffffff77777788888ff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77fff88fff77faf88fff77fff88fff77fff88fff77ff88888777777fffffffffff3ffff3ffff\nffffffffcafffffffffff7777773333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333777777ffffffffffff3333fffff\nffffffffcafffffffffff7777ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7777fffffffffffffffffffff\nfffffffffffffffffffff7777ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7777fffffffffffffffffffff\nffffffffafffffffffffff883ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff388ffffffffffffffffffffff\nffffffffffffffffffffff883ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff388ffffffffffffffffffffff\nffffffffafffffffffffff883ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff388ffffffffffffffffffffff\nffffffffcfffffffffffff883ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff388ffffffffffffffffffffff\nffffffffffffffffffffff883ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff388ffffffffffffffffffffff\nffffffffafffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3ffffffffffffffffffffffff\nffffffffffffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3ffffffffffffffffffffffff\nffffffffafffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffcffffffffffff\nffffffffafffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffcffffffffffff\nffffffffafffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffcffffffffffff\nffffffffffffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffcfffffffff3ff\nffffffffffffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffcffffffff3f3f\nffffffffffffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffcfffffffff3ff\nffffffffffffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffcffffffffffff\nffffffffffffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffcffffffffffff\nffffffffffffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffcffffffffffff\nffffffffffffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffcffffffffffff\nffffffffffffffffffffffff3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffcffffffffffff\nffffffffffffffffffffff883ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff388fffffffffcffffff7fffff\nffffffffffffffffffffff883ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff388fffffffffcfffff7f7ffff\nffffffffffffffffffffff883ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff388fffffffffcffffff7fffff\nffffffffffffffffffffff883ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff388fffffffffcffffffffffff\nffffffffffffffffffffff883ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff388fffffffffcffffffffffff\nfffffffffffffffffffff7777ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7777ffffffffcffffffffffff\nfffffffffffffffffffff7777ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7777ffffffffcffffffffffff\nfffffffffffffffffffff7777773333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333777777ffffffffcffffffffffff\nfffffffffffffffffffff77777788888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff88888777777ffffffffcffffffffffff\nfffffffffffffffffffff77777788888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff88888777777ffffffffcffffffffffff\nfffffffffffffffffffff777777ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff777777ffffffffccfffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffff\nffffffffaffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffff\nffffffffaffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffff\nffffffffaffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffff\nffffffffaffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcffffffffffffffffffffccfffffffffff\nffffffffaffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffaffffffffffffffffffffccfffffffffff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcffffffffffffffffffffccfffffffffff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffaffffffffffffffffffffccfffffffffff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcffffffffffffffffffffccfffffffffff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcffffffffffffffffffffccfffffffffff\nffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffaffffffffffffffffffffccfffffffffff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffaffffffffffffffffffffccfffffffffff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffaffffffffffffffffffffcfffff333ffff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffcffffffffffffffffffffcffff33333fff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffcffffffffffffffffffffcfff3333333ff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffcffffffffffffffffffffcff333333333f\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffcffffffffffffffffffffcfff3333333ff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffcffffffffffffffffffffcffff33333ff3\nffffffffcffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffcfffff333ff3f\nffffffffcffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffcfffffffff3ff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffcffffffffffffffffffffcffffffff3fff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffcffffffffffffffffffffcfffffffff3ff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffff333ff3f\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffff33333ff3\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcffffffffffffffffffffcfff3333333ff\nffffffffaffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcffffffffffffffffffffcff333333333f\nffffffffaffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcffffffffffffffffffffffff3333333ff\nffffffffaffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffff33333ff3\nffffffffaffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffff333ff3f\nffffffffaffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcffffffffffffffffffffafffffffff3ff\nffffffffaffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffff333ff3f\nffffffffaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffff33333ff3\nffffffffaffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcfaffffffffffffffffffafff3333333ff\nffffffffaffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffafffffffffffffffffffff333333333f\nffffffffaffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffffaffffffffffffffffffffff3333333ff\nffffffffcffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffff33333fff\nffffffffcffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffafffff333ffff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffffaffffffffffffffffffaffffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffaffffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffffaffffffffffffffffffaffffffffffff\nffffffffcffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffff\nffffffffaffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffff\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffcfcfcfcfcf\nffffffffcffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffff\nffffffffaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffcfcfcfcfcf\nffffffffaffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffff\nffffffffaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffcfcfcfcfcf\nffffffffaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffcfcfcfcfcf\nfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffff\nfffffffffffffffffffffffffffffffffffffffffffffffafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffcfcfcfcfcf\n`;\n            case \"ZB#gQvQ~\":\n            case \"alarm\":return img`\n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . 4 4 . . . . . . 4 4 . . . . \n. 4 4 . . 7 7 7 7 . . 4 4 . . . \n. 4 . 7 7 7 7 7 7 7 7 . 4 . . . \n. . . 7 7 7 5 7 7 7 7 . . . . . \n. . 7 7 7 7 5 7 7 7 7 7 . . . . \n. . 7 7 7 7 5 7 7 7 7 7 . . . . \n. . 7 7 7 7 7 5 5 7 7 7 . . . . \n. . 7 7 7 7 7 7 7 7 7 7 . . . . \n. . . 7 7 7 7 7 7 7 7 . . . . . \n. . . 7 7 7 7 7 7 7 7 . . . . . \n. . . . . 7 7 7 7 . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n`;\n            case \"C~*lmWg_pknr\":\n            case \"colon\":return img`\n. . . . . . 6 6 6 6 6 . . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . . 6 6 6 6 6 . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . 6 6 6 6 6 . . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . . 6 6 6 6 6 . . . . . \n`;\n        }\n        return null;\n    })\n\n    helpers._registerFactory(\"animation\", function(name: string) {\n        switch(helpers.stringTrim(name)) {\n            case \"dot\":\n            case \"@cBrO\":return [img`\n. . . . . . 6 6 6 6 6 . . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . . 6 6 6 6 6 . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . 6 6 6 6 6 . . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . 6 1 1 1 1 1 6 . . . . \n. . . . . . 6 6 6 6 6 . . . . . \n`, img`\n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n. . . . . . . . . . . . . . . . \n`];\n        }\n        return null;\n    })\n\n}\n// Auto-generated code. Do not edit.\n",
  "main.blocks": "<xml xmlns=\"https://developers.google.com/blockly/xml\"><variables><variable id=\";Gl`wQIK6_^-I?vjYi*X\">time</variable><variable id=\"h/H|(#3r{5;YSl/iUpkX\">date</variable><variable id=\"(bSBDi!{i#AU9cFG1IXj\">alarm</variable><variable id=\"3nY{Zg|Q,,y+;:{pQWU+\">colon</variable><variable type=\"KIND_SpriteKind\" id=\"0{$a3xX_[B^(]cjtjYJI\">Player</variable><variable type=\"KIND_SpriteKind\" id=\";PK/yyRPO}H`2Yp)YUe,\">Projectile</variable><variable type=\"KIND_SpriteKind\" id=\"|ZILtMXAOG/6FiE7;Myy\">Food</variable><variable type=\"KIND_SpriteKind\" id=\"n%`mN9]U34%P{$efqX,(\">Enemy</variable><variable type=\"KIND_SpriteKind\" id=\"J?{!D-iadk!Aiwl4`4@[\">Text</variable></variables><block type=\"pxt-on-start\" x=\"0\" y=\"0\"><statement name=\"HANDLER\"><block type=\"gamesetbackgroundimage\"><value name=\"img\"><shadow type=\"background_image_picker\"><field name=\"img\">assets.image`background`</field><data>{\"commentRefs\":[],\"fieldData\":{\"img\":\"myImages.gCt\"}}</data></shadow></value><next><block type=\"variables_set\"><field name=\"VAR\" id=\";Gl`wQIK6_^-I?vjYi*X\">time</field><value name=\"VALUE\"><shadow type=\"math_number\"><field name=\"NUM\">0</field></shadow><block type=\"textsprite_create\"><mutation xmlns=\"http://www.w3.org/1999/xhtml\" _expanded=\"0\" _input_init=\"false\"></mutation><value name=\"text\"><block type=\"rtc_string_format_time\"><value name=\"format\"><shadow type=\"text\"><field name=\"TEXT\">hh mm</field></shadow></value></block></value></block></value><next><block type=\"TextSprite_setOutline\"><value name=\"this\"><block type=\"variables_get\"><field name=\"VAR\" id=\";Gl`wQIK6_^-I?vjYi*X\">time</field></block></value><value name=\"width\"><shadow type=\"math_number\"><field name=\"NUM\">1</field></shadow></value><value name=\"color\"><shadow type=\"colorindexpicker\"><field name=\"index\">6</field></shadow></value><next><block type=\"TextSprite_setMaxFontHeight\"><value name=\"this\"><block type=\"variables_get\"><field name=\"VAR\" id=\";Gl`wQIK6_^-I?vjYi*X\">time</field></block></value><value name=\"height\"><shadow type=\"math_number\"><field name=\"NUM\">24</field></shadow></value><next><block type=\"spritesetpos\"><value name=\"sprite\"><block type=\"variables_get\"><field name=\"VAR\" id=\";Gl`wQIK6_^-I?vjYi*X\">time</field></block></value><value name=\"x\"><shadow type=\"positionPicker\"><field name=\"index\">80</field></shadow></value><value name=\"y\"><shadow type=\"positionPicker\"><field name=\"index\">38</field></shadow></value><next><block type=\"variables_set\"><field name=\"VAR\" id=\"3nY{Zg|Q,,y+;:{pQWU+\">colon</field><value name=\"VALUE\"><shadow type=\"math_number\"><field name=\"NUM\">0</field></shadow><block type=\"spritescreate\"><value name=\"img\"><shadow type=\"screen_image_picker\"><field name=\"img\">assets.image`colon`</field><data>{\"commentRefs\":[],\"fieldData\":{\"img\":\"myImages.C~*lmWg_pknr\"}}</data></shadow></value><value name=\"kind\"><shadow type=\"spritekind\"><field name=\"MEMBER\">Player</field></shadow></value></block></value><next><block type=\"spritesetpos\"><value name=\"sprite\"><block type=\"variables_get\"><field name=\"VAR\" id=\"3nY{Zg|Q,,y+;:{pQWU+\">colon</field></block></value><value name=\"x\"><shadow type=\"positionPicker\"><field name=\"index\">80</field></shadow></value><value name=\"y\"><shadow type=\"positionPicker\"><field name=\"index\">38</field></shadow></value><next><block type=\"variables_set\"><field name=\"VAR\" id=\"h/H|(#3r{5;YSl/iUpkX\">date</field><value name=\"VALUE\"><shadow type=\"math_number\"><field name=\"NUM\">0</field></shadow><block type=\"textsprite_create\"><mutation xmlns=\"http://www.w3.org/1999/xhtml\" _expanded=\"0\" _input_init=\"false\"></mutation><value name=\"text\"><block type=\"rtc_string_format_time\"><value name=\"format\"><shadow type=\"text\"><field name=\"TEXT\">MMMDD WW</field></shadow></value></block></value></block></value><next><block type=\"spritesetpos\"><value name=\"sprite\"><block type=\"variables_get\"><field name=\"VAR\" id=\"h/H|(#3r{5;YSl/iUpkX\">date</field></block></value><value name=\"x\"><shadow type=\"positionPicker\"><field name=\"index\">80</field></shadow></value><value name=\"y\"><shadow type=\"positionPicker\"><field name=\"index\">60</field></shadow></value><next><block type=\"variables_set\"><field name=\"VAR\" id=\"(bSBDi!{i#AU9cFG1IXj\">alarm</field><value name=\"VALUE\"><shadow type=\"math_number\"><field name=\"NUM\">0</field></shadow><block type=\"textsprite_create\"><mutation xmlns=\"http://www.w3.org/1999/xhtml\" _expanded=\"0\" _input_init=\"false\"></mutation><value name=\"text\"><block type=\"rtc_read_format_alarm\"><value name=\"format\"><shadow type=\"text\"><field name=\"TEXT\">hh:mm</field></shadow></value></block></value></block></value><next><block type=\"TextSprite_setIcon\"><value name=\"this\"><block type=\"variables_get\"><field name=\"VAR\" id=\"(bSBDi!{i#AU9cFG1IXj\">alarm</field></block></value><value name=\"icon\"><shadow type=\"screen_image_picker\"><field name=\"img\">assets.image`alarm`</field><data>{\"commentRefs\":[],\"fieldData\":{\"img\":\"myImages.ZB#gQvQ~\"}}</data></shadow></value><next><block type=\"spritesetpos\"><value name=\"sprite\"><block type=\"variables_get\"><field name=\"VAR\" id=\"(bSBDi!{i#AU9cFG1IXj\">alarm</field></block></value><value name=\"x\"><shadow type=\"positionPicker\"><field name=\"index\">80</field></shadow></value><value name=\"y\"><shadow type=\"positionPicker\"><field name=\"index\">100</field></shadow></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type=\"alarmInteruptonEvent\" x=\"725\" y=\"0\"><statement name=\"HANDLER\"><block type=\"mixer_play_sound\"><field name=\"sound\">music.baDing</field><next><block type=\"clearAlarmStatus\"/></next></block></statement></block><block type=\"gameupdate\" x=\"1048\" y=\"0\"><statement name=\"HANDLER\"><block type=\"TextSprite_setText\"><value name=\"this\"><block type=\"variables_get\"><field name=\"VAR\" id=\";Gl`wQIK6_^-I?vjYi*X\">time</field></block></value><value name=\"text\"><block type=\"rtc_string_format_time\"><value name=\"format\"><shadow type=\"text\"><field name=\"TEXT\">hh mm</field></shadow></value></block></value><next><block type=\"TextSprite_setText\"><value name=\"this\"><block type=\"variables_get\"><field name=\"VAR\" id=\"h/H|(#3r{5;YSl/iUpkX\">date</field></block></value><value name=\"text\"><block type=\"rtc_string_format_time\"><value name=\"format\"><shadow type=\"text\"><field name=\"TEXT\">MMMDD WW</field></shadow></value></block></value><next><block type=\"TextSprite_setText\"><value name=\"this\"><block type=\"variables_get\"><field name=\"VAR\" id=\"(bSBDi!{i#AU9cFG1IXj\">alarm</field></block></value><value name=\"text\"><block type=\"rtc_read_format_alarm\"><value name=\"format\"><shadow type=\"text\"><field name=\"TEXT\">hh:mm</field></shadow></value></block></value></block></next></block></next></block></statement></block></xml>",
  "main.ts": "rtc.onEvent(function () {\n    music.baDing.play()\n    rtc.clearAlarmStatus()\n})\nscene.setBackgroundImage(assets.image`background`)\nlet time = textsprite.create(rtc.stringFormatTime(\"hh mm\"))\ntime.setOutline(1, 6)\ntime.setMaxFontHeight(24)\ntime.setPosition(80, 38)\nlet colon = sprites.create(assets.image`colon`, SpriteKind.Player)\ncolon.setPosition(80, 38)\nlet date = textsprite.create(rtc.stringFormatTime(\"MMMDD WW\"))\ndate.setPosition(80, 60)\nlet alarm = textsprite.create(rtc.stringFormatAlarm(\"hh:mm\"))\nalarm.setIcon(assets.image`alarm`)\nalarm.setPosition(80, 100)\ngame.onUpdate(function () {\n    time.setText(rtc.stringFormatTime(\"hh mm\"))\n    date.setText(rtc.stringFormatTime(\"MMMDD WW\"))\n    alarm.setText(rtc.stringFormatAlarm(\"hh:mm\"))\n})\n",
  "pxt.json": "{\n    \"name\": \"watch example\",\n    \"description\": \"\",\n    \"dependencies\": {\n        \"device\": \"*\",\n        \"xtronpro-rtc\": \"github:tsunyi/pxt-xtronpro-rtc#v0.2.0\",\n        \"arcade-text\": \"github:microsoft/arcade-text#v1.3.0\",\n        \"controller\": \"*\"\n    },\n    \"files\": [\n        \"main.blocks\",\n        \"main.ts\",\n        \"README.md\",\n        \"assets.json\",\n        \"tilemap.g.jres\",\n        \"tilemap.g.ts\",\n        \"images.g.jres\",\n        \"images.g.ts\"\n    ],\n    \"targetVersions\": {\n        \"branch\": \"v1.7.22\",\n        \"tag\": \"v1.7.22\",\n        \"commits\": \"https://github.com/microsoft/pxt-arcade/commits/fa9cc16632907b4dd59f733b62e573beded922dc\",\n        \"target\": \"1.7.22\",\n        \"pxt\": \"7.3.23\"\n    },\n    \"preferredEditor\": \"blocksprj\"\n}\n",
  "tilemap.g.jres": "{\n    \"transparency16\": {\n        \"data\": \"hwQQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\",\n        \"mimeType\": \"image/x-mkcd-f4\",\n        \"tilemapTile\": true\n    },\n    \"*\": {\n        \"mimeType\": \"image/x-mkcd-f4\",\n        \"dataEncoding\": \"base64\",\n        \"namespace\": \"myTiles\"\n    }\n}",
  "tilemap.g.ts": "// Auto-generated code. Do not edit.\nnamespace myTiles {\n    //% fixedInstance jres blockIdentity=images._tile\n    export const transparency16 = image.ofBuffer(hex``);\n\n    helpers._registerFactory(\"tile\", function(name: string) {\n        switch(helpers.stringTrim(name)) {\n            case \"transparency16\":return transparency16;\n        }\n        return null;\n    })\n\n}\n// Auto-generated code. Do not edit.\n"
}
```    
