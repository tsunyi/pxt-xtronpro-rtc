# time

Returns the selected item of the time in decimal number.

| Item | Range |
| ---- | ----- |
| second | 0 to 59 |
| minute | 0 to 59 |
| hour   | 0 to 23 |
| weekday | 1 to 7, where Monday is 1 and Sunday is 7. |
| day    | Between 1 and the number of days in the given month of the given year. |
| month  | 1 to 12 |
| year   | 0 to 99, without century. |

```blocks
let y = 0
let x = 0
let picture = image.create(160, 120)
picture.fill(0)
scene.setBackgroundImage(picture)
let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . b 5 5 b . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 b . 
    b d d c d 5 5 b 5 4 4 4 4 4 4 b 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
game.onUpdate(function () {
    x = 80 + 50 * Math.sin(rtc.time(TimeItem.SECOND) * 0.1047)
    y = 60 - 50 * Math.cos(rtc.time(TimeItem.SECOND) * 0.1047)
    mySprite.setPosition(x, y)
    picture.fill(0)
    picture.drawLine(80, 60, x, y, 9)
})
```

```package
rtc=github:tsunyi/pxt-xtronpro-rtc
```