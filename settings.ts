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

            const year = game.askForNumber('Year', 4);
            const month = game.askForNumber('Month', 2);
            const date = game.askForNumber('Date', 2);

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

            const hours = game.askForNumber('Hours', 2);
            const minutes = game.askForNumber('Minutes', 2);
            const seconds = game.askForNumber('Seconds', 2);

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

            rtc.setTime(year % 100, month, date, this.weekDay, this.hourFormat, this.hourPeriod, hours, minutes, seconds);
            
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