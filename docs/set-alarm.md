# set Alarm

Set the alarm time of the RTC.

```sig
rtc.setAlarm(RepeatMode.EVERYDAY, 0, 0, 0, true)
```

Defaultly, you can set hour, minute, second and repeat mode.
you can also set the alarm on a certain day of a month or a week.

## Parameters

* **mode** the repeat mode of the alarm.
* **hour** a [number](/types/number) that is an optional amount of hour, in 24-hour clock.
* **minute** a [number](/types/number) that is an optional amount of minute, from 0 to 59.
* **seconde** a [number](/types/number) that is an optional amount of second, from o to 59.
* **enable** a [boolean](/types/boolean) to set the activation of the alarm. A ``True`` value means set to **ON** and a ``False`` value means set to **OFF**.
* **day** a [number](/types/number) that is an optional amount of the day of a month, when you select the **EVERYMONTH** repeat mode, you can set a certain day of a month.
* **weekday** a [number](/types/number) that is an optional amount of the day of a week, where Monday is 1 and Sunday is 7, when you select the **EVERYWEEK** repeat mode, you can set a ertain day of a week.

## Example #example

Set an alarm at 7 o'clock everyday.

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