# set Time

Set the time of the RTC.

```sig
rtc.setTime(21, 12, 11, 6, 17, 12, 0)
```

## Parameters

* **year** a [number](/types/number) that is an optional amount of year, without century, from 0 to 99.
* **month** a [number](/types/number) that is an optional amount of month, from 1 to 12.
* **day** a [number](/types/number) that is an optional amount of the day of a month.
* **weekday** a [number](/types/number) that is an optional amount of the day of a week, form 1 to 7, where Monday is 1 and Sunday is 7.
* **hour** a [number](/types/number) that is an optional amount of hour, in 24-hour clock.
* **minute** a [number](/types/number) that is an optional amount of minute, from 0 to 59.
* **second** a [number](/types/number) that is an optional amount of second, from o to 59.

## Example #example

Set an alarm at 7 o'clock everyday.

```blocks
rtc.setTime(
21,
12,
11,
WeekItem.Saturday,
7,
0,
0
)
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
time.sayText(rtc.stringFormatTime("YY-MM-DD WW hh:mm"))

```

```package
rtc=github:tsunyi/pxt-xtronpro-rtc
```
