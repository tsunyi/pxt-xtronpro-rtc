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

enum TimeFormat {
    //% block="yyyy-MM-dd hh:mm:ss"
    BASIC,
    //% block="yyyy/MM/dd hh:mm:ss"
    BASIC2,
    //% block="yyyy-MM-dd"
    YMD,
    //% block="hh:mm:ss"
    HMS,
    //% block="yyyy-MM-dd ww hh:mm:ss"
    FULL
}


//% color="#20b2aa" weight=75 icon="\uf133" block="RTC"
//% groups='["Time","Create", "Basic","Separator", "Theme", "Digits" ]'
namespace rtcModules {

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
                return 0;

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
                return 0;

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
    }

    export const ds1339 = new DS1339();

    /**
     * TODO: read format time string.
     */
    //% group="Time"
    //% block weight=50
    //% blockId=rtc_read_format_time block="time in %fmt format"
    //% help=rtc/read-format-time
    export function readTimeInFormat(fmt: TimeFormat = TimeFormat.BASIC): string {
        const weekCN = '一二三四五六日';
        const weekEN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let format: string;

        switch (fmt) {
            case 0:
                format = "yyyy-MM-dd hh:mm:ss"
                break;
            case 1:
                format = "yyyy/MM/dd hh:mm:ss"
                break;
            case 2:
                format = "yyyy-MM-dd"
                break;
            case 3:
                format = "hh:mm:ss"
                break;
            case 4:
                format = "yyyy-MM-dd ww hh:mm:ss"
                break;
        }

        let year = 2000 + ds1339.year;
        let month = ds1339.month;
        let day = ds1339.date;
        let hours = ds1339.hours;
        let minutes = ds1339.minutes;
        let seconds = ds1339.seconds;
        let week = ds1339.day;

        let monthstr = month >= 10 ? month.toString() : ('0' + month);
        let daystr = day >= 10 ? day.toString() : ('0' + day);
        let hoursstr = hours >= 10 ? hours.toString() : ('0' + hours);
        let minutesstr = minutes >= 10 ? minutes.toString() : ('0' + minutes);
        let secondsstr = seconds >= 10 ? seconds.toString() : ('0' + seconds);

        if (format.indexOf('yyyy') !== -1) {
            format = format.replace('yyyy', year.toString());
        } else {
            format = format.replace('yy', (year + '').slice(2));
        }
        
        format = format.replace('mm', minutesstr);
        format = format.replace('dd', daystr);
        format = format.replace('hh', hoursstr);
        format = format.replace('MM', monthstr);
        format = format.replace('ss', secondsstr);
        format = format.replace('W', weekCN[week - 1]);
        format = format.replace('ww', weekEN[week - 1]);
        format = format.replace('w', week.toString());

        return format;
    }

    /**
     * TODO: read rtc time.
     */
    //% group="Time" 
    //% weight=50
    //% blockId=rtc_read block="time %type"
    //% help=rtc/read-time
    export function readTime(type: TimeItem = TimeItem.SECONDS): number {
        switch (type) {
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

    function bin2bcd(v: number) {
        return ((v / 10) << 4) + (v % 10);
    }

    export function writeRtcTime(year: number, month: number, date: number, hour: number, minutes: number, seconds: number) {
        let buf = pins.createBuffer(8);
        buf[0] = 0x00;
        buf[1] = bin2bcd(seconds);
        buf[2] = bin2bcd(minutes);
        buf[3] = bin2bcd(hour);
        buf[4] = bin2bcd(0);
        buf[5] = bin2bcd(date);
        buf[6] = bin2bcd(month);
        buf[7] = bin2bcd(year);
        pins.i2cWriteBuffer(DS1339_I2C_ADDRESS, buf);
    }
}
