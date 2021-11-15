// Add your code here

enum TimeItem {
    //% block="seconds"
    SECONDS,
    //% block="minute"
    MINUTE,
    //% block="hour"
    HOUR,
    //% block="day of the week"
    DAY,
    //% block="date"
    DATE,
    //% block="month"
    MONTH,
    //% block="year"
    YEAR
}

enum HourPeriod {
    //% block="24-hour"
    HOUR24,
    //% block="am"
    AM,
    //% block="pm"
    PM
}

enum WeekItem {
    //% block="repeat"
    REPEAT,
    //% block="monday"
    MONDAY,
    //% block="tuesday"
    TUESDAY,
    //% block="wednesday"
    WEDNESDAY,
    //% block="thursday"
    THURSDAY,
    //% block="friday"
    FRIDAY,
    //% block="saturday"
    SATURDAY,
    //% block="sunday"
    SUNDAY
}

declare namespace pins {
    /**
     * Pin Alarm Interupt
     */
    //% fixedInstance shim=pxt::lookupPinCfg(CFG_PIN_D0)
    const AlarmIntPin: DigitalInOutPin;
}

//% color="#20b2aa" weight=75 icon="\uf133" block="RTC"
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

        get seconds() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_SECONDS);

            return (reg >> 4 & 0x07) * 10 + (reg & 0x0F)
        }

        get minutes() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_MINUTES);

            return (reg >> 4 & 0x07) * 10 + (reg & 0x0F)
        }

        get hours() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_HOURS);
            const flag12 = reg >> 6 & 0x01;

            if (flag12) {
                const isPM = reg >> 5 & 0x01;

                return (reg >> 4 & 0x01) * 10 + (reg & 0x0F);
            } else {
                return (reg >> 5 & 0x01) * 20 + (reg >> 4 & 0x01) * 10 + (reg & 0x0F);
            }
        }

        get is12HourClock() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_HOURS);

            return reg >> 6 & 0x01;
        }

        get isPM() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_HOURS);
            const flag12 = reg >> 6 & 0x01;

            if (flag12) {
                return reg >> 5 & 0x01;
            } else {
                return undefined;
            }
        }

        get day() {
            this.connect();

            if (!this.isConnected)
                return 1;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_DAY);

            return reg & 0x07;
        }

        get date() {
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

            return (reg >> 4 & 0x01) * 10 + (reg & 0x0F)
        }

        get year() {
            this.connect();

            if (!this.isConnected)
                return 0;

            const reg = pins.i2cReadRegister(DS1339_I2C_ADDRESS, REG_DS1339_YEAR);

            return (reg >> 4 & 0x0F) * 10 + (reg & 0x0F)
        }

        setAlarmSeconds(sec: number, mask: number) {
            this.connect();

            if (!this.isConnected)
                return;

            const reg = ((mask & 0x01) << 7) + ((sec / 10 & 0x07) << 4) + (sec % 10 & 0x0F);
            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_SECONDS, reg);
        }

        setAlarmMinutes(minu: number, mask: number) {
            this.connect();

            if (!this.isConnected)
                return;

            const reg = ((mask & 0x01) << 7) + (minu & 0x80) + ((minu / 10 & 0x07) << 4) + (minu % 10 & 0x0F);
            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_MINUTES, reg);
        }

        setAlarmHours(hour: number, mask: number, is12Clock: number, isPm: number) {
            this.connect();

            if (!this.isConnected)
                return;

            let reg;

            if (is12Clock) {
                reg = ((mask & 0x01) << 7) + ((is12Clock & 0x01) << 6) + ((isPm & 0x01) << 5) + ((hour / 10 & 0x01) << 4) + (hour % 10 & 0x0F);
            } else {
                reg = ((mask & 0x01) << 7) + ((hour / 10 & 0x03) << 4) + (hour % 10 & 0x0F);
            }

            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_HOURS, reg);
        }

        setAlarmDayDate(val: number, mask: number, isDay: number) {
            this.connect();

            if (!this.isConnected)
                return;

            let reg;

            if (isDay) {
                reg = ((mask & 0x01) << 7) + ((isDay & 0x01) << 6) + (val & 0x0F);
            } else {
                reg = ((mask & 0x01) << 7) + ((val / 10 & 0x03) << 4) + (val % 10 & 0x0F);
            }

            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_ALARM1_DAYDATE, reg);
        }

        setAlarmInt(int: boolean) {
            let reg;

            if (int) {
                reg = 0x1D;
            } else {
                reg = 0x1C;
            }

            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_CONTROL, reg);
        }

        clearAlarmIntStatus() {
            pins.i2cWriteRegister(DS1339_I2C_ADDRESS, REG_DS1339_STATUS, 0);
        }
    }

    export const ds1339 = new DS1339();

    /**
     * Read string format time.
     */
    //% group="Time"
    //% block weight=50
    //% blockId=rtc_read_format_time block="string format time %format "
    //% help=rtc/read-format-time
    export function stringFormatTime(format: string = "hh:mm"): string {
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
        let date = ds1339.date;
        let hours = ds1339.hours;
        let minutes = ds1339.minutes;
        let seconds = ds1339.seconds;
        let week = ds1339.day;

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
     * Read rtc time item.
     */
    //% group="Time" 
    //% weight=50
    //% blockId=rtc_read block="time %item"
    //% help=rtc/read-time
    export function time(item: TimeItem = TimeItem.SECONDS): number {
        switch (item) {
            case TimeItem.SECONDS:
                return ds1339.seconds;
            case TimeItem.MINUTE:
                return ds1339.minutes;
            case TimeItem.HOUR:
                return ds1339.hours;
            case TimeItem.DAY:
                return ds1339.day;
            case TimeItem.DATE:
                return ds1339.date;
            case TimeItem.MONTH:
                return ds1339.month;
            case TimeItem.YEAR:
                return ds1339.year;
        }
        return 0;
    }

    /**
     * Set Alarm Week, Hours, Minutes, Seconds
     */
    //% group="Alarm"
    //% weight=50
    //% blockId=rtcSetAlarmWeek block="set alarm week %week %period hours %hour minutes %minu seconds %sec %enable"
    //% enable.shadow="toggleOnOff"
    export function setAlarmWeek(week: WeekItem, period: HourPeriod, hour: number, minu: number, sec: number, enable: boolean) {
        if (week == WeekItem.REPEAT) {
            ds1339.setAlarmDayDate(0, 1, 1);
        } else {
            ds1339.setAlarmDayDate(week, 0, 1);
        }

        if (period == HourPeriod.HOUR24) {
            ds1339.setAlarmHours(hour, 0, 0, 0);
        } else {
            if (period == HourPeriod.AM) {
                ds1339.setAlarmHours(hour, 0, 1, 0);
            } else {
                ds1339.setAlarmHours(hour, 0, 1, 1);
            }
        }

        ds1339.setAlarmMinutes(minu, 0);
        ds1339.setAlarmSeconds(sec, 0);

        ds1339.setAlarmInt(enable);
    }

    /**
     * Set Alarm Date, Hours, Minutes, Seconds
     */
    //% group="Alarm"
    //% weight=50
    //% blockId=rtcSetAlarmDate block="set alarm date %date %period hours %hour minutes %minu seconds %sec %enable"
    //% date.fieldEditor="numberdropdown" ms.fieldOptions.decompileLiterals=true
    //% date.fieldOptions.data='[["repeat", 0]]'
    //% enable.shadow="toggleOnOff"
    export function setAlarmDate(date: number = 1, period: HourPeriod, hour: number, minu: number, sec: number, enable: boolean) {
        if (date == 0) {
            ds1339.setAlarmDayDate(0, 1, 0);
        } else {
            ds1339.setAlarmDayDate(date, 0, 0);
        }

        if (period == HourPeriod.HOUR24) {
            ds1339.setAlarmHours(hour, 0, 0, 0);
        } else {
            if (period == HourPeriod.AM) {
                ds1339.setAlarmHours(hour, 0, 1, 0);
            } else {
                ds1339.setAlarmHours(hour, 0, 1, 1);
            }
        }

        ds1339.setAlarmMinutes(minu, 0);
        ds1339.setAlarmSeconds(sec, 0);

        ds1339.setAlarmInt(enable);
    }

    /**
     * Run some code when Alarm Interupt
     */
    //% weight=99 blockGap=8 help=controller/button/on-event
    //% blockId=alarminteruptonevent block="on alarmed"
    //% group="Alarm"
    export function onEvent(handler: () => void) {
        pins.AlarmIntPin.setPull(PinPullMode.PullUp);
        pins.AlarmIntPin.onEvent(PinEvent.Fall, handler);
    }

    /**
     * Clear Alarm Status
     */
    //% blockId=clearalarmstatus block="clear alarm status"
    //% group="Alarm"
    export function clearAlarmStatus() {
        ds1339.clearAlarmIntStatus();
    }
    
    function bin2bcd(v: number) {
        return ((v / 10) << 4) + (v % 10);
    }

    export function setTime(year: number, month: number, date: number, day: number, is12Clock: number, isPM: number, hour: number, minutes: number, seconds: number) {
        let buf = pins.createBuffer(8);

        buf[0] = 0x00;
        buf[1] = bin2bcd(seconds);
        buf[2] = bin2bcd(minutes);
        buf[3] = bin2bcd(hour) + ((is12Clock & 0x01) << 6) + ((isPM & 0x01) << 5);
        buf[4] = bin2bcd(day);
        buf[5] = bin2bcd(date);
        buf[6] = bin2bcd(month);
        buf[7] = bin2bcd(year);
        
        pins.i2cWriteBuffer(DS1339_I2C_ADDRESS, buf);
    }
}
