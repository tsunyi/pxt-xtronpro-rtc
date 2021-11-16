// Add your code here
enum SelectOption {
    IDLE,
    HOURFORMAT,
    HOURPERIOD,
    WEEKDAY
}

namespace rtc {
    class Configurator {
        private hourFormat: number;
        private hourPeriod: number;
        private weekDay: number;
        private selectOption: number;

        constructor() {
            this.hourFormat = 0;
            this.hourPeriod = 0;
            this.weekDay = 0;
            this.selectOption = SelectOption.IDLE;
        }

        private select() {
            if (this.selectOption == SelectOption.HOURFORMAT) {
                if (this.hourFormat) {
                    console.log("Selected: 12-hour");
                } else {
                    console.log("Selected: 24-hour");
                }
            } else if (this.selectOption == SelectOption.HOURPERIOD) {
                if (this.hourPeriod) {
                    console.log("Selected: PM");
                } else {
                    console.log("Selected: AM");
                }
            }else if (this.selectOption == SelectOption.WEEKDAY) {
                switch (this.weekDay) {
                    case 0:
                        console.log("Selected: Mon.");
                        break;
                    case 1:
                        console.log("Selected: Tue.");
                        break;
                    case 2:
                        console.log("Selected: Wed.");
                        break;
                    case 3:
                        console.log("Selected: Thu.");
                        break;
                    case 4:
                        console.log("Selected: Fri.");
                        break;
                    case 5:
                        console.log("Selected: Sat.");
                        break;
                    case 6:
                        console.log("Selected: Sun.");
                        break;
                    default:
                        break;
                }
            }
        }

        private validateDate(date: number): boolean {
            const year = date / 10000;
            const month = date / 100 % 100;
            const day = date % 100;

            if (date > 0 && year >= 1 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
                return true;
            } else {
                return false;
            }
        }

        private validateTime(time: number): boolean {
            const hour = time / 10000;
            const minutes = time / 100 % 100;
            const seconds = time % 100;

            if (time > 0 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59) {
                if (this.hourFormat) {
                    if (hour >= 1 && hour <= 12) {
                        return true;
                    }
                } else {
                    if (hour >= 0 && hour <= 23) {
                        return true;
                    }
                }
            }

            return false;
        }

        main() {
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.selectOption == SelectOption.HOURFORMAT) {
                    this.hourFormat = this.hourFormat + 1;
                    this.hourFormat = this.hourFormat % 2;
                } else if (this.selectOption == SelectOption.HOURPERIOD) {
                    this.hourPeriod = this.hourPeriod +1;
                    this.hourPeriod = this.hourPeriod % 2;
                } else if (this.selectOption == SelectOption.WEEKDAY) {
                    this.weekDay = this.weekDay - 1;
                    this.weekDay = (this.weekDay + 7) % 7;
                }
                
                this.select();
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.selectOption == SelectOption.HOURFORMAT) {
                    this.hourFormat = this.hourFormat + 1;
                    this.hourFormat = this.hourFormat % 2;
                } else if (this.selectOption == SelectOption.HOURPERIOD) {
                    this.hourPeriod = this.hourPeriod + 1;
                    this.hourPeriod = this.hourPeriod % 2;
                } else if (this.selectOption == SelectOption.WEEKDAY) {
                    this.weekDay = this.weekDay + 1;
                    this.weekDay = this.weekDay % 7;
                }
                
                this.select();
            })

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                game.popScene();
                game.consoleOverlay.setVisible(false);
            });

            let date = game.askForNumber('Date (YYYYMMDD)', 8);

            while (!this.validateDate(date)) {
                game.consoleOverlay.setVisible(true);
                console.log ("Validate failed, input again!")
                pause(1000);
                game.consoleOverlay.setVisible(false);
                date = game.askForNumber('Date (YYYYMMDD)', 8);
            }

            game.consoleOverlay.setVisible(true);
            this.selectOption = SelectOption.HOURFORMAT;
            console.log("up/down: select");
            console.log("hour format: 24/12");
            console.log("A: OK");
            console.log(" ");
            this.select();
            pauseUntil(() => !controller.A.isPressed(), 30000);
            pauseUntil(() => controller.A.isPressed(), 30000);
            
            if (this.hourFormat) {
                this.selectOption = SelectOption.HOURPERIOD
                console.log("up/down: select");
                console.log("hour period: AM/PM");
                console.log("A: OK");
                console.log(" ");
                this.select();
                pauseUntil(() => !controller.A.isPressed(), 30000);
                pauseUntil(() => controller.A.isPressed(), 30000);
            }

            game.consoleOverlay.setVisible(false);

            let time = game.askForNumber("Time (hhmmss)", 6);

            while (!this.validateTime(time)) {
                game.consoleOverlay.setVisible(true);
                console.log("Validate failed, input again!")
                pause(1000);
                game.consoleOverlay.setVisible(false);
                time = game.askForNumber('Time (hhmmss)', 6);
            }

            game.consoleOverlay.setVisible(true);
            this.selectOption = SelectOption.WEEKDAY;
            console.log("up/down: select");
            console.log("week day");
            console.log("A: OK");
            console.log(" ");
            this.select();
            pauseUntil(() => !controller.A.isPressed(), 30000);
            pauseUntil(() => controller.A.isPressed(), 30000);
            this.weekDay = this.weekDay + 1;

            rtc.setTime(date / 10000 % 100, date / 100 % 100, date % 100, this.weekDay, this.hourFormat, this.hourPeriod, time / 10000, time / 100 % 100, time % 100);
            
            game.popScene();
            game.consoleOverlay.setVisible(false);
        }
    }

    function rtcSystemMenu() {
        scene.systemMenu.closeMenu();
        game.pushScene();
        game.consoleOverlay.setVisible(true);
        const config = new Configurator();
        config.main()
    }

    scene.systemMenu.addEntry(
        () => "RTC",
        () => rtcSystemMenu(),
        img`
            . . . . 6 . . . 6 . . . . . . . .
            . . 6 6 6 . 6 6 6 . 6 6 . . . . .
            . 6 . . 6 . . . 6 . . . 6 . . . .
            6 . . . . . . . . . . . . 6 . . .
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 . . .
            6 . . . . . . . . . . . . 6 . . .
            6 . 6 6 . . 6 6 . . 6 6 . 6 . . .
            6 . . . . . . . . . . . . 6 . . .
            6 . 6 6 . . 6 6 . . 6 6 . 6 . . .
            6 . . . . . . . . . . . . 6 . . .
            6 . 6 6 . . 6 6 . . 6 6 6 6 6 . .
            6 . . . . . . . . 6 . . . . . 6 .
            . 6 . . . . . . . 6 . . 6 . . 6 .
            . . 6 6 6 6 6 6 6 6 . . 6 6 . 6 .
            . . . . . . . . . 6 . . . . . 6 .
            . . . . . . . . . 6 . . . . . 6 .
            . . . . . . . . . . 6 6 6 6 6 . .
        `);
}