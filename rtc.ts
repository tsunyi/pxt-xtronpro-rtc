// Add your code here

enum TimeItem {
    //% block="second"
    Second = 1,
    //% block="minute"
    Minute = 2,
    //% block="hour"
    Hour = 3,
    //% block="weekday"
    Weekday = 4,
    //% block="day"
    Day = 5,
    //% block="month"
    Month = 6,
    //% block="year"
    Year = 7
}

enum AlarmItem {
    //% block="second"
    Second = 1,
    //% block="minute"
    Minute = 2,
    //% block="hour"
    Hour = 3,
    //% block="weekday"
    Weekday= 4,
    //% block="day"
    Day = 5
}

enum WeekItem {
    //% block="monday"
    Monday = 1,
    //% block="tuesday"
    Tuesday = 2,
    //% block="wednesday"
    Wednesday = 3,
    //% block="thursday"
    Thursday = 4,
    //% block="friday"
    Friday = 5,
    //% block="saturday"
    Saturday = 6,
    //% block="sunday"
    Sunday = 7
}

enum RepeatMode {
    //% block="every day"
    Everyday = 1,
    //% block="every month"
    Everymonth = 2,
    //% block="every week"
    Everyweek = 3,
    //% block="every hour"
    Everyhour = 4,
    //% block="every minute"
    Everyminute = 5,
    //% block="every second"
    Everysecond = 6
}

declare namespace pins {
    /**
     * Pin Alarm Interupt
     */
    //% fixedInstance shim=pxt::lookupPinCfg(CFG_PIN_D0)
    const AlarmIntPin: DigitalInOutPin;
}

//% color="#7a5327" weight=75 icon="\uf133" block="RTC"
//% groups='["Time","Alarm"]'
namespace rtc {

    const DS1339_I2C_ADDRESS = 0x68  //I2C address of the DS1339

    const REG_DS1339_SECONDS = 0x00
    const REG_DS1339_MINUTES = 0x01
    const REG_DS1339_HOURS = 0x02
    const REG_DS1339_DAY = 0x03
    const REG_DS1339_DATE = 0x04
    const REG_DS1339_MONTH = 0x05
    const REG_DS1339_YEAR = 0x06
    const REG_DS1339_ALARM1_SECONDS = 0x07
    const REG_DS1339_ALARM1_MINUTES = 0x08
    const REG_DS1339_ALARM1_HOURS = 0x09
    const REG_DS1339_ALARM1_DAYDATE = 0x0A
    const REG_DS1339_ALARM2_MINUTES = 0x0B
    const REG_DS1339_ALARM2_HOURS = 0x0C
    const REG_DS1339_ALARM2_DAYDATE = 0x0D
    const REG_DS1339_CONTROL = 0x0E
    const REG_DS1339_STATUS = 0x0F
    const REG_DS1339_TRICKLE_CHARGER = 0x10

    const DS1339_ALARM1_ADDR = 0x07
    const DS1339_ALARM2_ADDR = 0x0B

    //% fixedInstances
    export class DS1339 {
        isConnected: boolean;

        constructor() {
            this.isConnected = false;
            this.start();

            if (this.isConnected) {
                this.clearAlarmIntStatus();
            }
        }

        private connect() {
            let retry = 0;
            while (!this.isConnected && retry < 5) {

                //REGISTER FORMAT:   CMD | TRANSACTION | ADDRESS
                //REGISTER READ:     TCS34725_REGISTER_COMMAND (0x80) | TCS34725_REGISTER_ID (0x12)
                const sec = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_SECONDS)

                //Check that device Identification has one of 2 i2c addresses         
                if (sec != undefined)
                    this.isConnected = true;

                retry++;
            }
        }

        private start() {
            this.connect();
        }

        get second() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_SECONDS);

            return (reg >> 4 & 0x07) * 10 + (reg & 0x0F)
        }

        get minute() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_MINUTES);

            return (reg >> 4 & 0x07) * 10 + (reg & 0x0F)
        }

        get hour() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_HOURS);

            return (reg >> 5 & 0x01) * 20 + (reg >> 4 & 0x01) * 10 + (reg & 0x0F);
        }

        get weekday() {
            this.connect();

            if (!this.isConnected)
                return 1;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_DAY);

            if (!reg)
                return 1;

            return reg & 0x07;
        }

        get day() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_DATE);

            return (reg >> 4 & 0x03) * 10 + (reg & 0x0F)
        }

        get month() {
            this.connect();

            if (!this.isConnected)
                return 1;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_MONTH);

            if (!reg)
                return 1;

            return (reg >> 4 & 0x01) * 10 + (reg & 0x0F)
        }

        get year() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_YEAR);

            return (reg >> 4 & 0x0F) * 10 + (reg & 0x0F)
        }

        set alarmSecond(sec: number) {
            this.connect();

            if (!this.isConnected)
                return;

            const reg = ((sec / 10 & 0x07) << 4) + (sec % 10 & 0x0F);
            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_SECONDS, reg);
        }

        get alarmSecond() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_SECONDS);

            return (reg >> 4 & 0x07) * 10 + (reg & 0x0F)
        }

        set alarmMinute(minu: number) {
            this.connect();

            if (!this.isConnected)
                return;

            const reg = ((minu / 10 & 0x07) << 4) + (minu % 10 & 0x0F);
            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_MINUTES, reg);
        }

        get alarmMinute() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_MINUTES);

            return (reg >> 4 & 0x07) * 10 + (reg & 0x0F)
        }

        set alarmHour(hour: number) {
            this.connect();

            if (!this.isConnected)
                return;

            const reg = ((hour / 10 & 0x03) << 4) + (hour % 10 & 0x0F);

            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_HOURS, reg);
        }

        get alarmHour() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_HOURS);

            return (reg >> 5 & 0x01) * 20 + (reg >> 4 & 0x01) * 10 + (reg & 0x0F);
        }

        set alarmWeekday(val: number) {
            this.connect();

            if (!this.isConnected)
                return;

            // const mask = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE);
            const reg = /* (mask & 0x80) + */ 0x40 + (val & 0x0F);

            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE, reg);
        }

        get alarmWeekday() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE);
            const isWeekday = reg >> 6 & 0x01;

            if (isWeekday) {
                return reg & 0x0F;
            } else {
                return undefined;
            }
        }

        set alarmDay(val: number) {
            this.connect();

            if (!this.isConnected)
                return;

            // const mask = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE);
            const reg = /* (mask & 0x80) + */ ((val / 10 & 0x03) << 4) + (val % 10 & 0x0F);

            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE, reg);
        }

        get alarmDay() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE);
            const isDay = reg >> 6 & 0x01;

            if (isDay) {
                return undefined;
            } else {
                return (reg >> 4 & 0x03) * 10 + (reg & 0x0F);
            }
        }

        set alarmRepeatMode(mode: RepeatMode) {
            this.connect();

            if (!this.isConnected)
                return;

            let day = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE);
            let hour = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_HOURS);
            let minute = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_MINUTES);
            let second = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_SECONDS);

            if (mode == RepeatMode.Everymonth) {
                day = day & 0x3F;
                hour = hour & 0x7F;
                minute = minute & 0x7F;
                second = second & 0x7F;
            } else if (mode == RepeatMode.Everyweek) {
                day = (day & 0x3F) | 0x40;
                hour = hour & 0x7F;
                minute = minute & 0x7F;
                second = second & 0x7F;
            } else if (mode == RepeatMode.Everyday) {
                day = day | 0x80;
                hour = hour & 0x7F;
                minute = minute & 0x7F;
                second = second & 0x7F;
            } else if (mode == RepeatMode.Everyhour) {
                day = day | 0x80;
                hour = hour | 0x80;
                minute = minute & 0x7F;
                second = second & 0x7F;
            } else if (mode == RepeatMode.Everyminute) {
                day = day | 0x80;
                hour = hour | 0x80;
                minute = minute | 0x80;
                second = second & 0x7F;
            } else if (mode == RepeatMode.Everysecond) {
                day = day | 0x80;
                hour = hour | 0x80;
                minute = minute | 0x80;
                second = second | 0x80;
            }

            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE, day);
            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_HOURS, hour);
            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_MINUTES, minute);
            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_SECONDS, second);
        }

        get alarmRepeatMode() {
            this.connect();

            if (!this.isConnected)
                return 0;

            let day = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE);
            let hour = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_HOURS);
            let minute = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_MINUTES);
            let second = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_SECONDS);

            if (second & 0x80) {
                return RepeatMode.Everysecond;
            } else if (minute & 0x80) {
                return RepeatMode.Everyminute;
            } else if (hour & 0x80) {
                return RepeatMode.Everyhour;
            } else if (day & 0x80) {
                return RepeatMode.Everyday;
            } else if (day & 0x40) {
                return RepeatMode.Everyweek;
            } else {
                return RepeatMode.Everymonth;
            }
        }

        set alarmInt(int: boolean) {
            let reg;

            if (int) {
                reg = 0x1D;
            } else {
                reg = 0x1C;
            }

            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_CONTROL, reg);
        }

        get alarmInt() {
            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_CONTROL);

            if (reg & 0x01) {
                return true;
            } else {
                return false;
            }
        }

        clearAlarmIntStatus() {
            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_STATUS, 0);
        }
    }

    export const ds1339 = new DS1339();

    /**
     * Get the string format time.
     */
    //% block="string format time %format "
    //% blockId=rtc_string_format_time 
    //% help=github:xtronpro-rtc/docs/string-format-time
    //% format.defl="hh:mm"
    //% weight=99
    //% group="Time"
    export function stringFormatTime(format: string): string {
        const weekList = [
            'Monday', 
            'Tuesday', 
            'Wednesday', 
            'Thursday', 
            'Friday', 
            'Saturday', 
            'Sunday'
        ];
        const weekListAbbr = [
            'Mon.',
            'Tue.',
            'Wed.',
            'Thu.',
            'Fri.',
            'Sat.',
            'Sun.'
        ];
        const monthList = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        const monthListAbbr = [
            'Jan.',
            'Feb.',
            'Mar.',
            'Apr.',
            'May',
            'Jun.',
            'Jul.',
            'Aug.',
            'Sep.',
            'Oct.',
            'Nov.',
            'Dec.'
        ];

        let year = ds1339.year;
        let month = ds1339.month;
        let date = ds1339.day;
        let hours = ds1339.hour;
        let minutes = ds1339.minute;
        let seconds = ds1339.second;
        let week = ds1339.weekday;

        let yearStr = year >= 10 ? year.toString() : ('0' + year);
        let monthStr = month >= 10 ? month.toString() : ('0' + month);
        let dateStr = date >= 10 ? date.toString() : ('0' + date);
        let hoursStr = hours >= 10 ? hours.toString() : ('0' + hours);
        let minutesStr = minutes >= 10 ? minutes.toString() : ('0' + minutes);
        let secondsStr = seconds >= 10 ? seconds.toString() : ('0' + seconds);

        if (format.indexOf('YYYY') !== -1) {
            format = format.replace('YYYY', '20' + yearStr);
        } else {
            format = format.replace('YY', yearStr);
        }

        if (format.indexOf('MMMM') !== -1) {
            format = format.replace('MMMM', monthList[month - 1]);
        } else if (format.indexOf('MMM') !== -1) {
            format = format.replace('MMM', monthListAbbr[month - 1]);
        }else {
            format = format.replace('MM', monthStr);
        }
        
        format = format.replace('DD', dateStr);
        format = format.replace('hh', hoursStr);
        format = format.replace('mm', minutesStr);
        format = format.replace('ss', secondsStr);

        if (format.indexOf('WWW') !== -1) {
            format = format.replace('WWW', weekList[week - 1]);
        } else {
            format = format.replace('WW', weekListAbbr[week - 1]);
        }

        return format;
    }

    /**
     * Get the time item.
     */
    //% blockId=rtc_time
    //% block="%item"
    //% help=github:xtronpro-rtc/docs/time
    //% weight=100
    //% group="Time" 
    export function time(item: TimeItem = TimeItem.Second): number {
        switch (item) {
            case TimeItem.Second:
                return ds1339.second;
            case TimeItem.Minute:
                return ds1339.minute;
            case TimeItem.Hour:
                return ds1339.hour;
            case TimeItem.Weekday:
                return ds1339.weekday;
            case TimeItem.Day:
                return ds1339.day;
            case TimeItem.Month:
                return ds1339.month;
            case TimeItem.Year:
                return ds1339.year;
        }
        return 0;
    }

    /**
     * Set Alarm, RepeadMode, Hour, Minute, Second, Day, Weekday
     */
    //% blockId=rtcSetAlarm
    //% block="set alarm %mode=repeat_mode_enum hour %hour minute %minu second %sec %enable || day %day weekday %weekday"
    //% hour.defl=0 hour.min=0 hour.max=23
    //% minu.defl=0 minu.min=0 minu.max=59
    //% sec.defl=0 sec.min=0 sec.max=59
    //% enable.shadow="toggleOnOff" enable.defl=true
    //% day.defl=1 day.min=1 day.max=31
    //% expandableArgumentMode="toggle"
    //% help=github:xtronpro-rtc/docs/set-alarm
    //% weight=100
    //% group="Alarm"
    export function setAlarm(mode: number, hour: number, minu: number, sec: number, enable: boolean, day?: number, weekday?: WeekItem) {
        ds1339.alarmHour = hour;
        ds1339.alarmMinute = minu;
        ds1339.alarmSecond = sec;
        ds1339.alarmRepeatMode = mode;
        
        if (mode == RepeatMode.Everymonth) {
            ds1339.alarmDay = day;
        } else if (mode == RepeatMode.Everyweek) {
            ds1339.alarmWeekday = weekday;
        }

        ds1339.alarmInt = enable;
    }

    /**
     * Set Alarm Week, Hour, Minute, Second
     */
    export function setAlarmWeekday(week: WeekItem, hour: number, minu: number, sec: number, enable: boolean) {
        ds1339.alarmWeekday = week;
        ds1339.alarmHour = hour;
        ds1339.alarmMinute = minu;
        ds1339.alarmSecond = sec;

        ds1339.alarmInt = enable;
    }

    /**
     * Set Alarm Day, Hour, Minute, Second
     */
    export function setAlarmDay(date: number = 1, hour: number, minu: number, sec: number, enable: boolean) {
        ds1339.alarmDay = date;
        ds1339.alarmHour = hour;
        ds1339.alarmMinute = minu;
        ds1339.alarmSecond = sec;

        ds1339.alarmInt = enable;
    }

    /**
     * Get the alarm repeat mode of the RTC
     */
    //% blockId=rtcAlarmRepeatMode
    //% block="alarm repeat mode"
    //% help=github:xtronpro-rtc/docs/alarm-repeat-mode
    //% weight=95
    //% group="Alarm"
    export function alarmRepeatMode(): number {
        return ds1339.alarmRepeatMode;
    }

    /**
     * Get the member of RepeatMode enum
     */
    //% blockId=repeat_mode_enum
    //% block="%arg"
    //% shim=TD_ID
    //% weight=94
    //% group="Alarm"
    export function repeatModeEnumShim(arg: RepeatMode): number {
        return arg;
    }

    /**
     * Run some code when the alarm time is up
     */
    //% blockId=alarmInteruptonEvent
    //% block="on alarmed"
    //% help=github:xtronpro-rtc/docs/on-event
    //% weight=99 blockGap=8 
    //% group="Alarm"
    export function onEvent(handler: () => void) {
        pins.AlarmIntPin.setPull(PinPullMode.PullUp);
        pins.AlarmIntPin.onEvent(PinEvent.Fall, handler);
    }

    /**
     * Clear alarm interrupt status
     */
    //% blockId=clearAlarmStatus
    //% block="clear alarm status"
    //% help=github:xtronpro-rtc/docs/clear-alarm-status
    //% weight=98
    //% group="Alarm"
    export function clearAlarmStatus() {
        ds1339.clearAlarmIntStatus();
    }

    /**
     * Read string format alarm time.
     */
    //% blockId=rtc_read_format_alarm
    //% block="string format alarm %format "
    //% format.defl="hh:mm"
    //% help=github:xtronpro-rtc/docs/string-format-alarm
    //% weight=96
    //% group="Alarm"
    export function stringFormatAlarm(format: string): string {
        const weekList = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];
        const weekListAbbr = [
            'Mon.',
            'Tue.',
            'Wed.',
            'Thu.',
            'Fri.',
            'Sat.',
            'Sun.'
        ];

        let date = ds1339.alarmDay;
        let hours = ds1339.alarmHour;
        let minutes = ds1339.alarmMinute;
        let seconds = ds1339.alarmSecond;
        let week = ds1339.alarmWeekday;

        let dateStr = date >= 10 ? date.toString() : ('0' + date);
        let hoursStr = hours >= 10 ? hours.toString() : ('0' + hours);
        let minutesStr = minutes >= 10 ? minutes.toString() : ('0' + minutes);
        let secondsStr = seconds >= 10 ? seconds.toString() : ('0' + seconds);

        const mask = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE);

        if (mask & 0x40) {
            if (week > 0 && week <= 7) {
                if (format.indexOf('WWW') !== -1) {
                    format = format.replace('WWW', weekList[week - 1]);
                } else {
                    format = format.replace('WW', weekListAbbr[week - 1]);
                }
            }
        } else {
            format = format.replace('DD', dateStr);
        }

        format = format.replace('hh', hoursStr);
        format = format.replace('mm', minutesStr);
        format = format.replace('ss', secondsStr);

        return format;
    }

    /**
     * Read rtc alarm time item.
     */
    //% blockId=rtc_read_alarm
    //% block="alarm %item"
    //% help=github:xtronpro-rtc/docs/alarm
    //% weight=97
    //% group="Alarm" 
    export function alarm(item: AlarmItem = AlarmItem.Second): number {
        const mask = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE);

        switch (item) {
            case AlarmItem.Second:
                return ds1339.alarmSecond;
            case AlarmItem.Minute:
                return ds1339.alarmMinute;
            case AlarmItem.Hour:
                return ds1339.alarmHour;
            case AlarmItem.Weekday:
                if (mask & 0x40) {
                    return ds1339.alarmWeekday;
                } else {
                    return undefined;
                }
            case AlarmItem.Day:
                if (mask & 0x40) {
                    return undefined;
                } else {
                    return ds1339.alarmDay;
                }
        }
        return 0;
    }

    /**
     * Get rtc alarm On/Off status.
     */
    //% blockId=rtc_read_alarm_int
    //% block="is alarm on"
    //% help=github:xtronpro-rtc/docs/is-alarm-on
    //% weight=93
    //% group="Alarm" 
    export function isAlarm(): boolean {
        return ds1339.alarmInt;
    }
    
    function bin2bcd(v: number) {
        return ((v / 10) << 4) + (v % 10);
    }

    function constraint(val: number, min: number, max: number): number {
        if (val < min)
            val = min;
        
        if (val > max)
            val = max;
        
        return val;
    }

    /**
     * Set Time
     */
    //% blockId=settime
    //% block="set time year %year month %month day %day weekday %weekday hour %hour minute %minute second %second"
    //% year.defl=0 year.min=0 year.max=99
    //% month.defl=1 month.min=1 month.max=12
    //% day.defl=1 day.min=1 day.max=31
    //% hour.defl=0 hour.min=0 hour.max=23
    //% minute.defl=0 minute.min=0 minute.max=59
    //% second.defl=0 second.min=0 second.max=59
    //% help=github:xtronpro-rtc/docs/set-time
    //% weight=97
    //% group="Time"
    export function setTime(year: number, month: number, day: number, weekday: WeekItem, hour: number, minute: number, second: number) {
        let buf = pins.createBuffer(8);

        year = constraint(year, 0, 99);
        month = constraint(month, 1, 12);
        day = constraint(day, 1, 31);
        weekday = constraint(weekday, 1, 7);
        hour = constraint(hour, 0, 23);
        minute = constraint(minute, 0, 59);
        second = constraint(second, 0, 59);

        buf[0] = 0x00;
        buf[1] = bin2bcd(second);
        buf[2] = bin2bcd(minute);
        buf[3] = bin2bcd(hour);
        buf[4] = bin2bcd(weekday);
        buf[5] = bin2bcd(day);
        buf[6] = bin2bcd(month);
        buf[7] = bin2bcd(year % 100);
        
        pins.i2cWriteBuffer(DS1339_I2C_ADDRESS, buf);
    }
}
