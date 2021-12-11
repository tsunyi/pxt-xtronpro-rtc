// Add your code here
enum SelectOption {
    Idle = 1,
    Weekday = 2
}

enum RepeatOption {
    Everyday = 1,
    Everymonth = 2,
    Everyweek = 3,
    Everyhour = 4,
    Everyminute = 5,
    Everysecond = 6,
    Off = 7
}

namespace rtc {
    class Configurator {
        private weekDay: number;
        private selectOption: number;

        constructor() {
            this.weekDay = 0;
            this.selectOption = SelectOption.Idle;
        }

        private select() {
            if (this.selectOption == SelectOption.Weekday) {
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
            const year = Math.floor(date / 10000);
            const month = Math.floor(date / 100 % 100);
            const day = date % 100;

            if (date > 0 && year >= 1 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
                return true;
            } else {
                return false;
            }
        }

        private validateTime(time: number): boolean {
            const hour = Math.floor(time / 10000);
            const minutes = Math.floor(time / 100 % 100);
            const seconds = time % 100;

            if (time > 0 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59) {
                if (hour >= 0 && hour <= 23) {
                    return true;
                }
            }

            return false;
        }

        main() {
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.selectOption == SelectOption.Weekday) {
                    this.weekDay = this.weekDay - 1;
                    this.weekDay = (this.weekDay + 7) % 7;
                }
                
                this.select();
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.selectOption == SelectOption.Weekday) {
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
                console.log ("Validation failed, input again!")
                pause(1000);
                game.consoleOverlay.setVisible(false);
                date = game.askForNumber('Date (YYYYMMDD)', 8);
            }

            let time = game.askForNumber("Time (hhmmss)", 6);

            while (!this.validateTime(time)) {
                game.consoleOverlay.setVisible(true);
                console.log("Validation failed, input again!")
                pause(1000);
                game.consoleOverlay.setVisible(false);
                time = game.askForNumber('Time (hhmmss)', 6);
            }

            game.consoleOverlay.setVisible(true);
            this.selectOption = SelectOption.Weekday;
            console.log("up/down: select");
            console.log("week day");
            console.log("A: OK");
            console.log(" ");
            this.select();
            pauseUntil(() => !controller.A.isPressed(), 30000);
            pauseUntil(() => controller.A.isPressed(), 30000);
            this.weekDay = this.weekDay + 1;

            rtc.setTime(date / 10000 % 100, date / 100 % 100, date % 100, this.weekDay, time / 10000, time / 100 % 100, time % 100);
            
            game.popScene();
            game.consoleOverlay.setVisible(false);
        }
    }

    class AlarmConfigurator {
        private weekDay: number;
        private selectOption: number;
        private repeatOption: number;

        constructor() {
            this.weekDay = 0;
            this.selectOption = SelectOption.Idle;
            this.repeatOption = RepeatOption.Everyday;
        }

        private select() {
            if (this.selectOption == SelectOption.Idle) {
                if (this.repeatOption == RepeatOption.Everymonth) {
                    console.log("Selected: Repead on a day of the month");
                } else if (this.repeatOption == RepeatOption.Everyweek) {
                    console.log("Selected: Repead on a day of the week");
                } else if (this.repeatOption == RepeatOption.Everyday) {
                    console.log("Selected: Repead everyday");
                } else if (this.repeatOption == RepeatOption.Everyhour) {
                    console.log("Selected: Repead everyhour");
                } else if (this.repeatOption == RepeatOption.Everyminute) {
                    console.log("Selected: Repead everyminute");
                } else if (this.repeatOption == RepeatOption.Everysecond) {
                    console.log("Selected: Repead everysecond");
                } else if (this.repeatOption == RepeatOption.Off) {
                    console.log("Selected: Off");
                }
            } if (this.selectOption == SelectOption.Weekday) {
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
            if (date >= 1 && date <= 31) {
                return true;
            } else {
                return false;
            }
        }

        private validateTime(time: number): boolean {
            const hour = Math.floor(time / 10000);
            const minutes = Math.floor(time / 100 % 100);
            const seconds = time % 100;

            if (time > 0 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59) {
                if (hour >= 0 && hour <= 23) {
                    return true;
                }
            }

            return false;
        }

        main() {
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.selectOption == SelectOption.Idle) {
                    this.repeatOption = this.repeatOption - 1;
                    this.repeatOption = this.repeatOption == 0 ? 7 : this.repeatOption;
                } else if (this.selectOption == SelectOption.Weekday) {
                    this.weekDay = this.weekDay - 1;
                    this.weekDay = (this.weekDay + 7) % 7;
                }

                this.select();
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.selectOption == SelectOption.Idle) {
                    this.repeatOption = this.repeatOption + 1;
                    this.repeatOption = this.repeatOption == 8 ? 1 : this.repeatOption;
                } else if (this.selectOption == SelectOption.Weekday) {
                    this.weekDay = this.weekDay + 1;
                    this.weekDay = this.weekDay % 7;
                }

                this.select();
            })

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                game.popScene();
                game.consoleOverlay.setVisible(false);
            });

            game.consoleOverlay.setVisible(true);
            this.selectOption = SelectOption.Idle;
            console.log("up/down: select");
            console.log("repeat mode");
            console.log("A: OK");
            console.log(" ");
            this.select();
            pauseUntil(() => !controller.A.isPressed(), 30000);
            pauseUntil(() => controller.A.isPressed(), 30000);
            game.consoleOverlay.setVisible(false);

            if (this.repeatOption == RepeatOption.Off) {
                rtc.ds1339.alarmInt = false;
                game.popScene();
                return;
            }

            let date = 0;

            if (this.repeatOption == RepeatOption.Everyweek) {
                game.consoleOverlay.setVisible(true);
                this.selectOption = SelectOption.Weekday;
                console.log("up/down: select");
                console.log("week day");
                console.log("A: OK");
                console.log(" ");
                this.select();
                pauseUntil(() => !controller.A.isPressed(), 30000);
                pauseUntil(() => controller.A.isPressed(), 30000);
                this.weekDay = this.weekDay + 1;
                game.consoleOverlay.setVisible(false);
            } else if (this.repeatOption == RepeatOption.Everymonth) {
                date = game.askForNumber('Date (DD)', 2);

                while (!this.validateDate(date)) {
                    game.consoleOverlay.setVisible(true);
                    console.log("Validation failed, input again!")
                    pause(1000);
                    game.consoleOverlay.setVisible(false);
                    date = game.askForNumber('Date (DD)', 2);
                }
            }

            let time = game.askForNumber("Time (hhmmss)", 6);

            while (!this.validateTime(time)) {
                game.consoleOverlay.setVisible(true);
                console.log("Validation failed, input again!")
                pause(1000);
                game.consoleOverlay.setVisible(false);
                time = game.askForNumber('Time (hhmmss)', 6);
            }

            game.consoleOverlay.setVisible(true);
            if (this.repeatOption == RepeatOption.Everymonth) {
                rtc.setAlarmDay(date, time / 10000, time / 100 % 100, time % 100, true);
            } else if (this.repeatOption == RepeatOption.Everyweek) {
                rtc.setAlarmWeekday(this.weekDay, time / 10000, time / 100 % 100, time % 100, true);
            } else if (this.repeatOption == RepeatOption.Everyday) {
                rtc.setAlarm(RepeatMode.Everyday, time / 10000, time / 100 % 100, time % 100, true, 0, 0);
            } else if (this.repeatOption == RepeatOption.Everyhour) {
                rtc.setAlarm(RepeatMode.Everyhour, time / 10000, time / 100 % 100, time % 100, true, 0, 0);
            } else if (this.repeatOption == RepeatOption.Everyminute) {
                rtc.setAlarm(RepeatMode.Everyminute, time / 10000, time / 100 % 100, time % 100, true, 0, 0);
            } else if (this.repeatOption == RepeatOption.Everysecond) {
                rtc.setAlarm(RepeatMode.Everysecond, time / 10000, time / 100 % 100, time % 100, true, 0, 0);
            }
            
            game.popScene();
            // game.consoleOverlay.setVisible(false);
        }
    }

    function rtcSystemMenu() {
        scene.systemMenu.closeMenu();
        game.pushScene();
        game.consoleOverlay.setVisible(true);
        const config = new Configurator();
        config.main()
    }

    function rtcSystemMenuAlarm() {
        scene.systemMenu.closeMenu();
        game.pushScene();
        game.consoleOverlay.setVisible(false);
        const config = new AlarmConfigurator();
        config.main();
    }

    scene.systemMenu.addEntry(
        () => "RTC",
        () => rtcSystemMenu(),
        img`
            ....3........3......
            ....3........3......
            ....3........3......
            .bbb5bbbbbbbb5bbb...
            b9995999999995998c..
            b6665666666665668c..
            b6666666666666668c..
            b6666666666666668c..
            bccccccccccccccccc..
            b6666666666666668c..
            b6611661166116618c..
            b6666666666666668c..
            b66116611661166aaaa.
            b6666666666666a5355c
            b6611661166116a5311c
            b8888888888888a5331c
            .ccccccccccccca5111c
            ...............cccc.
            ....................
            ....................
        `);

    scene.systemMenu.addEntry(
        () => "Alarm",
        () => rtcSystemMenuAlarm(),
        img`
            ....................
            ....................
            ...99c..bbbbb..c99..
            ..966cbb55555bbc669.
            .966cb553333355bc669
            .96cb53311111cc5bc69
            .ccb53111bb1111c5bcc
            ...b53111bb1111c5b..
            ..b531111bb11119c5b.
            ..b531111bb11999c5b.
            ..b531111bbbbb99c5b.
            ..b531111ccccc99c5b.
            ..b5311111199999c5b.
            ...b5c111199999c5b..
            ...b5c111999999c5b..
            ....b5cc99999cc5b...
            .....b55ccccc55b....
            ......bb55555bb.....
            ........bbbbb.......
            ....................
        `);
}