# string Format Time

Get time in string format.

```sig
rtc.stringFormatTime("")
```

Return a string representing time, controlled by an explicit format string. 
For a complete list of formatting directives, see format parameter.

## Parameters

* **format** a [string](/types/string) that is the format directive.

The following is a list of all the format codes.

| Dirctive    | Meaning     | Example     |
| ----------- | ----------- | ----------- |
| YY          | Year without century as a zero-padded decimal number. | 00, 01, …, 99 |
| YYYY        | Year with century as a decimal number. | 0001, 0002, …, 2020, 2021, …, 9998, 9999 |
| MM          | Month as a zero-padded decimal number. | 01, 02, …, 12 |
| MMM         | Month as abbreviated name. | Jan., Feb., …, Dec. |
| MMMM        | Month as full name. | January, February, …, December |
| DD          | Day of the month as a zero-padded decimal number. | 00, 01, …, 31 |
| WW          | Weekday as abbreviated name. | Mon., Tue., …, Sun. |
| WWW         | Weekday as full name. | Monday, Tuesday, …, Sunday |
| hh          | Hour (24-hour clock) as a zero-padded decimal number. | 00, 01, …, 23 |
| mm          | Minute as a zero-padded decimal number. | 00, 01, …, 59 |
| ss          | Second as a zero-padded decimal number. | 00, 01, …, 59 |

## Return

* a [string](/types/string) value that represent time, which is controlled by the combine of the format codes.

## Example #example

Display a hh:mm format time on the screen.

```blocks
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
mySprite.sayText(rtc.stringFormatTime("hh:mm"))
```

## See also #seealso
