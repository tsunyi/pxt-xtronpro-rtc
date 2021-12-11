# clear Alarm Status

Clear alarm interrupt status, it is alway used in alarm onEvent function, if you forget to use it, the alarm can only fire once even though in repeat mode.

```sig
rtc.clearAlarmStatus()
```

## Example #example

Set an alarm at 7 o'clock everyday, the device will play "ba ding" when the alarm time is up, and clear the alarm status.

```blocks
rtc.onEvent(function () {
    music.baDing.play()
    rtc.clearAlarmStatus()
})
rtc.setAlarm(
RepeatMode.EVERYDAY,
7,
0,
0,
true
)
```

```package
rtc=github:tsunyi/pxt-xtronpro-rtc
```