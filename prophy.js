'use strict';

window.addEventListener("load",

    function () {

        // Ortsvariablen 
        var city = "Ulsnis";
        var country = "de";



        /* ----------------------- OpenWeather API -----------------------*/


        //------------------ Aktuelle Wetterdaten
        var weatherUrl = "http://api.openweathermap.org/data/2.5/weather";
        var apiKey = "27545a642fad3717f02bac70d150c024";
        var currentWeatherAPI = `${weatherUrl}?q=${city},${country}&lang=de&units=metric&appid=${apiKey}`;

        // Anfrage senden und erst nach Empfangen der Daten weitermachen (then)
        fetch(currentWeatherAPI)
            .then(response => {
                return response.json(); // in Json umwandeln 
            })
            .then(data => {
                const { temp, humidity, pressure } = data.main; // deklaration der kurzform der wetter variablen
                //console.log(data);

                var tempRounded = Math.round(temp * 10) / 10; // temperatur auf eine Dezimalstelle auf- bzw. abrunden

                // DOM Elemente mit aktuellen Wetterangaben füllen
                $("degrees").textContent = tempRounded + "°C";
                $("windSpeed").textContent = "Windstärke: " + data.wind.speed + " Knoten";
                $("humidity").textContent = "Luftfeuchtigkeit: " + humidity + "%";
                $("windDegree").textContent = "Windrichtung: " + data.wind.deg + "°";
                $("pressure").textContent = "Luftdruck: " + pressure + " hPa";
                $("clouds").textContent = "Bewölkung: " + data.clouds.all + "%";
                $("visibility").textContent = "Sichtweite: " + data.visibility + " m";
                $("sunRise").textContent = "Sonnenaufgang: " + convertTime(data.sys.sunrise) + " Uhr";
                $("sunSet").textContent = "Sonnenuntergang: " + convertTime(data.sys.sunset) + " Uhr";

                $("description").textContent = data.weather[0].description;
                $("currentTime").textContent = convertTime(data.dt) + " Uhr";
                $("currentDate").textContent = convertDate(data.dt);
            })

        //------------------ Vorhersagedaten

        var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast";
        var forecastAPI = `${forecastUrl}?q=${city},${country}&lang=de&units=metric&appid=${apiKey}`;

        fetch(forecastAPI)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);

                // die folgenden 5 Tage für Vorschau auswählen
                var weekDays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
                for (var i = 0; i < 5; i++) {
                    $("upperDay" + (i)).textContent = weekDays[(convertWeekDay(data.list[0].dt) + (i + 1)) % 7];

                }
                for (var i = 0; i < 40; i++) {
                    // sconsole.log(convertDate(data.list[i].dt) + "," + convertTime(data.list[i].dt));

                }




                // Kurvenansicht über Woche --> Temperatur: als Zeit immer 14:00 auswählen pro Tag
            });










        /* ----------------------- UI Elemente -----------------------*/

        // Parent Wrapper erstellen
        var parent = $("parentDiv");
        parent.style.backgroundImage = randBgColour();

        // header anpassen

        // Tagesansicht erstellen
        newDiv("dailyWrapper", parent);
        newDiv("dailyLeft", dailyWrapper);
        newDiv("dailyMiddle", dailyWrapper);
        newDiv("dailyRight", dailyWrapper);

        // Tageansicht linke Seite
        newDiv("cityName", dailyLeft);
        $("cityName").innerText = city;
        newDiv("countryName", dailyLeft);
        $("countryName").innerText = country.toUpperCase();
        newDiv("dataWrapper", dailyLeft);
        newDiv("data", dataWrapper);
        newDiv("windSpeed", data);
        newDiv("windDegree", data);
        newDiv("humidity", data);
        newDiv("precipitation", data);
        newDiv("pressure", data);
        newDiv("clouds", data);
        newDiv("visibility", data);
        newDiv("sunRise", data);
        newDiv("sunSet", data);


        // Tagesansicht mitte
        var weatherImg = document.createElement("img");
        weatherImg.src = "sun.png"
        newDiv("weatherIcon", dailyMiddle);
        weatherImg.height = "200";
        $("weatherIcon").appendChild(weatherImg);

        // Tagesansicht rechte Seite
        newDiv("currentDate", dailyRight);
        newDiv("currentTime", dailyRight);
        newDiv("description", dailyRight);
        newDiv("degrees", dailyRight);
        $("degrees").innerText = "0";

        // Trennlinie
        newDiv("separator", parent);



        // Vorhersagebereich - 
        newDiv("forecast", parent);
        newDiv("fiveDaysLabel", forecast);
        $("fiveDaysLabel").innerText = "5-Tage-Vorhersage";
        // Vorhersagebereich - Diagramm pro Tag
        newDiv("curveWeek", forecast);
        $("curveWeek").innerText = "Kurve: ganze Woche!"
        // 5-Tage-Kacheln
        newDiv("fiveDayWrapper", forecast);

        for (var i = 0; i < 5; i++) {
            newDiv("day" + (i), fiveDayWrapper);
            $("day" + (i)).className = "days";
            newDiv("upperDay" + (i), $("day" + (i)));
            $("upperDay" + (i)).className = "dayInner";
            newDiv("middleDay" + (i), $("day" + (i)));
            $("middleDay" + (i)).className = "dayInner";
            newDiv("lowerDay" + (i), $("day" + (i)));
            $("lowerDay" + (i)).className = "dayInner";
            var imgSun = document.createElement("img");
            imgSun.id = "imgSun";
            imgSun.src = "sun.png";
            imgSun.height = "30";
            imgSun.width = "30";
            $("middleDay" + (i)).appendChild(imgSun);
            $("lowerDay" + (i)).innerText = "13°";
        }



        // Gedrückten TagesButton farblich abheben und andere Buttons zurücksetzen
        for (var i = 0; i < 5; i++) {
            $("day" + (i)).addEventListener("click", function () {
                var allButtons = document.getElementsByClassName("days");
                for (var i = 0; i < allButtons.length; i++) {
                    allButtons[i].style.backgroundColor = "lightgrey";
                }
                this.style.backgroundColor = "white";
            });
        }

        newDiv("dailyForecastWrapper", forecast);

        // Vorhersagebereich - Diagramm pro Tag
        newDiv("curve", dailyForecastWrapper);
        $("curve").innerText = "Kurve pro Tag!"

        // Vorhersagebereich - Stundenansicht
        newDiv("hourlyWrapper", dailyForecastWrapper);
        newDiv("hourlyButtonsWrapper", hourlyWrapper);

        for (var i = 0; i < 8; i++) {
            var btn = document.createElement("button");
            btn.id = "hours" + (i);
            btn.className = "hours";
            hourlyButtonsWrapper.appendChild(btn);
        }

        // Gedrückten StundenButton farblich abheben und andere Buttons zurücksetzen
        for (var i = 0; i < 8; i++) {
            $("hours" + (i)).addEventListener("click", function () {
                var allButtons = document.getElementsByClassName("hours");
                for (var i = 0; i < allButtons.length; i++) {
                    allButtons[i].style.backgroundColor = "lightgrey";
                }
                this.style.backgroundColor = "white";
            });
        }

        $("hours0").innerText = "02:00";
        $("hours1").innerText = "05:00";
        $("hours2").innerText = "08:00";
        $("hours3").innerText = "11:00";
        $("hours4").innerText = "14:00";
        $("hours5").innerText = "17:00";
        $("hours6").innerText = "20:00";
        $("hours7").innerText = "23:00";


        newDiv("hourlyData", hourlyWrapper);
        newDiv("hourlyDataText", hourlyData);
        $("hourlyDataText").innerText = "Windstärke: \n Windrichtung: \n Niederschlag: \n Luftdruck: \n Bewölkung: \n Sichtbarkeit: \n Sonnenaufgang: \n Sonnenuntergang: ";

        // Objekte Tag und Stunden

        class DayObj {
            constructor(wkd, dailyTemp, icon, weekDailyCurve, weatherData) {
                this.weekdayName = wkd;
                this.dailyTemp = dailyTemp;
                this.icon = icon;
                this.drawDailyCurve = function () {
                    // drawing the week overview svg curve here
                    // using weekCurve [] filled in fetch
                };
                this.weatherData = weatherData;
                // hour0: {   // 2:00 Uhr
                //     Windstärke: "none",
                //     Windrichtung: "none",
                //     Niederschlag: "none",
                //     Luftdruck: "none",
                //     Bewölkung: "none",
                //     Sichtbarkeit: "none",
                //     Sonnenaufgang: "none",
                //     Sonnenuntergang: "none",
                // },
            }
        };
         var testData = [];
        var testObj = new DayObj("Monday", "13°", "icon", "weekCurve", testData);
        console.log(testObj.weekdayName);

        /* ----------------------- Helferfunktionen -----------------------*/

        function $(id) {
            return document.getElementById(id);
        }

        // Funktion zum Erstellen neuer Divs
        function newDiv(id, parentElement) {
            var divEl = document.createElement("div");
            divEl.id = id;
            parentElement.appendChild(divEl);
        }

        // Funktion zum Umrechnen von Unix Timestamp in Zeit
        function convertTime(timestamp) {
            var date = new Date(timestamp * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();

            var formattedTime = hours + ':' + minutes.substr(-2);
            return formattedTime;
        }
        // Funktion zum Umrechnen von Unix Timestamp in Tag und Datum
        function convertDate(timestamp) {
            var date = new Date(timestamp * 1000);
            var year = date.getFullYear();
            var month = date.toLocaleString('de', { month: 'long' });
            var day = date.getDate();
            var weekDay = date.toLocaleString('de', { weekday: 'long' });
            var formattedDate = weekDay + ", " + day + ". " + month + " " + year;
            return formattedDate;
        }
        // Funktion zum Umrechnen von Unix Timestamp in Wochentag
        function convertWeekDay(timestamp) {
            var date = new Date(timestamp * 1000);
            return date.getDay();
        }

        // Funktion zum zufälligen Aufrufen einer Hintergrundfarbkombination
        function randBgColour() {
            var colours = ["#2B79CC,#2BBFCC", "#36E0EF,#0B4680", "#0ACC8A,#1C9EEB", "#F49620,#F44720", "#C05D94,#331827"];
            var temp = Math.floor(Math.random() * Math.floor(colours.length));
            return "linear-gradient(" + colours[temp] + ")";
        }

    });