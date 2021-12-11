# alarm

```sig
rtc.alarm(item)
```

Returns the selected item of the alarm time in decimal number.

| Item | Range |
| ---- | ----- |
| second | 0 to 59 |
| minute | 0 to 59 |
| hour   | 0 to 23 |
| weekday | 1 to 7, where Monday is 1 and Sunday is 7. If the alarm repeat mode is not equal to Everyweek, it will return undefined |
| day    | Between 1 and the number of days in the given month of the given year. If the alarm repeat mode is not equal to Everymonth, it will return undefined |

```blocks
let time = sprites.create(img`
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
rtc.setAlarm(
RepeatMode.Everyday,
7,
0,
0,
true
)
game.onUpdateInterval(1000, function () {
    time.sayText(rtc.stringFormatTime("hh:mm"))
    if (rtc.time(TimeItem.Hour) == rtc.alarm(AlarmItem.Hour) && rtc.time(TimeItem.Minute) == rtc.alarm(AlarmItem.Minute) && rtc.time(TimeItem.Second) == rtc.alarm(AlarmItem.Second)) {
        music.baDing.play()
    }
})
```

```package
rtc=github:tsunyi/pxt-xtronpro-rtc
```
