# on Event

Run some code when the alarm time is up

```sig
rtc.onEvent()
```

## Example #example

Set an alarm at 7 o'clock everyday, the device will play "ba ding" when the alarm time is up.

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