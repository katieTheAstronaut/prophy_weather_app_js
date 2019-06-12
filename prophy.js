'use strict';

window.addEventListener("load",

    function () {

        // Ortsvariablen
        const apiKey = "27545a642fad3717f02bac70d150c024";
        const weatherUrl = "http://api.openweathermap.org/data/2.5/weather";
        var city = "Ulsnis";
        var country = "de";
        var loggedInUser;

        var dailyObj;
        var currentDayval;
        var hoursByDay;

        // Bei Start der Anwendung wird der Startbildschirm aufgerufen
        callHomeScreen();

        /* ----------------------- Ortsuche -----------------------*/

        $("locationChanger").addEventListener("click", function () {
            searchScreen();
        })

        function searchScreen() {
            clearScreen();

            var parent = $("parentDiv");
            newDiv("searchWrapper", parent);
            newDiv("searchMsg", searchWrapper);
            $("searchMsg").textContent = "Finde die Wetterdaten für einen bestimmten Ort:";
            newDiv("searchContainer", searchWrapper);
            newDiv("searchTitleWrapper", searchContainer);
            newDiv("searchTitle", searchTitleWrapper);
            $("searchTitle").textContent = "Suche";

            // Eingabefeld für Ort
            newDiv("searchPlaceCont", searchContainer);
            var searchPlace = document.createElement("input");
            searchPlace.type = "text";
            searchPlace.id = "searchPlace";
            searchPlace.required = true;
            searchPlace.placeholder = "Ort"
            searchPlaceCont.appendChild(searchPlace);

            var searchCountryPlace = document.createElement("input");
            searchCountryPlace.type = "text";
            searchCountryPlace.id = "searchCountryPlace";
            searchCountryPlace.required = true;
            searchCountryPlace.placeholder = "Länderkürzel";
            searchPlaceCont.appendChild(searchCountryPlace);

            // Eingabefeld für Postleitzahl
            var searchZip = document.createElement("input");
            searchZip.type = "text";
            searchZip.id = "searchZip";
            searchZip.required = true;
            searchZip.placeholder = "Postleizahl"
            searchPlaceCont.appendChild(searchZip);

            // Eingabefeld für Länderkürzel
            var searchCountry = document.createElement("input");
            searchCountry.type = "text";
            searchCountry.id = "searchCountry";
            searchCountry.required = true;
            searchCountry.placeholder = "Länderkürzel";
            searchPlaceCont.appendChild(searchCountry);


            // Eingabefelder für Koordinaten (Länge & Breite)
            var searchCoordLo = document.createElement("input");
            searchCoordLo.type = "text";
            searchCoordLo.id = "searchCoordLo";
            searchCoordLo.required = true;
            searchCoordLo.placeholder = "Koordinaten (Länge)";
            searchPlaceCont.appendChild(searchCoordLo);

            var searchCoordLa = document.createElement("input");
            searchCoordLa.type = "text";
            searchCoordLa.id = "searchCoordLa";
            searchCoordLa.required = true;
            searchCoordLa.placeholder = "Koordinaten (Breite)";
            searchPlaceCont.appendChild(searchCoordLa);

            // Suche-Button
            var searchBtn = document.createElement("button");
            searchBtn.id = "searchBtn";
            searchBtn.textContent = "Suche";
            searchBtn.addEventListener("click", function () {
                search();
            })
            searchPlaceCont.appendChild(searchBtn);

        }

        // Funktion um den passenden Ort zu den Suchparametern zu finden
        function search() {

            var searchQuery;

            // Prüfen ob überhaupt ein Feld ausgefüllt wurde
            if (($("searchPlace").value === "") && ($("searchZip").value === "") && ($("searchCoordLo").value === "")) {
                alert("Bitte gib einen vollständigen Suchwert an!")
            } else if ($("searchPlace").value !== "" && $("searchCountryPlace").value !== "") {
                searchQuery = "q=" + $("searchPlace").value + "," + $("searchCountryPlace").value;;
            } else if ($("searchZip").value !== "" && $("searchCountry").value !== "") {
                searchQuery = "zip=" + $("searchZip").value + "," + $("searchCountry").value;
            } else if ($("searchCoordLo").value !== "" && $("searchCoordLa").value !== "") {
                searchQuery = "lat=" + $("searchCoordLa").value + "&lon=" + $("searchCoordLo").value;
            }

            var searchUrl = `${weatherUrl}?` + searchQuery + `&appid=${apiKey}`;

            fetch(searchUrl)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);


                })

        }

        /* ----------------------- Geolocation -----------------------*/

        function getGeoLocation() {
            navigator.geolocation.getCurrentPosition(updatelocation, locationError);
        }

        function updatelocation() {

        }

        function locationError() {
            switch (e.code) {
                case e.UNKNOWN_ERROR:
                    console.log("UNKNOWN_ERROR");
                    console.log("Error message: " + e.message);
                    break;
                case e.PERMISSION_DENIED:
                    console.log("PERMISSION_DENIED");
                    console.log("Error message: " + e.message);
                    break;
                case e.POSITION_UNAVAILABLE:
                    console.log("POSITION_UNAVAILABLE");
                    console.log("Error message: " + e.message);
                    break;
                case e.TIMEOUT:
                    console.log("TIMEOUT");
                    console.log("Error message: " + e.message);
                    break;
                default:
                    console.log("Unbekannter Fehlercode");
                    console.log("Error message: " + e.message);
                    break;
            }
        }









        /* ----------------------- Login und Registrierung -----------------------*/

        // Klick auf den Login-Button leitet zur Login-Seite weiter

        $("loginButton").addEventListener("click", function () {
            loginScreen();
        })

        // Funktion zum Erstellen des Login-Fensters
        function loginScreen() {
            clearScreen();

            var parent = $("parentDiv");
            newDiv("loginWrapper", parent);
            newDiv("loginMsg", loginWrapper);
            $("loginMsg").textContent = "Melde dich an und speicher deine Lieblingsstädte!";
            newDiv("loginContainer", loginWrapper);
            newDiv("loginTitleWrapper", loginContainer);
            newDiv("loginTitle", loginTitleWrapper);
            $("loginTitle").textContent = "Login";

            // Eingabefeld für Nutzername
            newDiv("loginUserCont", loginContainer);
            var loginUser = document.createElement("input");
            loginUser.type = "text";
            loginUser.id = "loginUser";
            loginUser.required = true;
            loginUser.placeholder = "Nutzername eingeben"
            loginUserCont.appendChild(loginUser);

            // Eingabefeld für Passwort
            var loginPw = document.createElement("input");
            loginPw.type = "text";
            loginPw.id = "loginPw";
            loginPw.required = true;
            loginPw.placeholder = "Passwort eingeben"
            loginUserCont.appendChild(loginPw);

            // Login-Button
            var loginBtn = document.createElement("button");
            loginBtn.id = "loginBtn";
            loginBtn.textContent = "Anmelden";
            loginBtn.addEventListener("click", function () {
                loginUserFunc();
            })
            loginUserCont.appendChild(loginBtn);

            // Registrieren - Button
            var registerBtn = document.createElement("button");
            registerBtn.id = "registerBtn"
            registerBtn.textContent = "Konto Erstellen"
            registerBtn.addEventListener("click", function () {
                registerScreen();
            })
            loginUserCont.appendChild(registerBtn);
        }


        // Funktion zum Erstellen des Registrierungs-Fensters

        function registerScreen() {
            clearScreen();

            var parent = $("parentDiv");
            newDiv("regWrapper", parent);
            newDiv("regMsg", regWrapper);
            $("regMsg").textContent = "Melde dich an und speicher deine Lieblingsstädte!";
            newDiv("regContainer", regWrapper);
            newDiv("regTitleWrapper", regContainer);
            newDiv("regTitle", regTitleWrapper);
            $("regTitle").textContent = "Konto Erstellen";

            // Eingabefeld für Nutzername
            newDiv("regUserCont", regContainer);
            var regUser = document.createElement("input");
            regUser.type = "text";
            regUser.id = "regUser";
            regUser.placeholder = "Nutzername eingeben"
            regUserCont.appendChild(regUser);

            // Eingabefeld für Passwort
            var regPw = document.createElement("input");
            regPw.type = "text";
            regPw.id = "regPw";
            regPw.placeholder = "Passwort eingeben"
            regUserCont.appendChild(regPw);

            // Konto erstellen-Button
            var regBtn = document.createElement("button");
            regBtn.id = "regBtn";
            regBtn.textContent = "Konto erstellen";
            regBtn.addEventListener("click", function () {
                registerUser();
            })
            regUserCont.appendChild(regBtn);

            // Schon registiert - Button
            var alreadyRegBtn = document.createElement("button");
            alreadyRegBtn.id = "alreadyRegBtn"
            alreadyRegBtn.textContent = "Schon registriert?"
            alreadyRegBtn.addEventListener("click", function () {
                loginScreen();
            })
            regUserCont.appendChild(alreadyRegBtn);
        }

        //------------------ Logik der Registrierungs-Funktion
        // Klickt ein Nutzer im Registrierungsformular auf den "Konto Erstellen"-Button, 
        // so wird zunächst überprüft, ob der Nutzername bereits existiert.

        function registerUser() {

            // Daten aus den Input-Feldern auslesen
            var username = $("regUser").value;
            var password = $("regPw").value;
            var favourites;

            var user = {
                username: username,
                password: password,
                favourites: []
            };

            // Überprüfen, ob Nutzer bereits registriert ist.
            // Wenn ja, wird dem Nutzer dies mitgeteilt. 
            if (localStorage.getItem(username) !== null) {
                alert("Der Nutzername ist leider schon vergeben. Bitte wähle einen anderen!")
            } else {

                // Wenn Nutzer noch nicht registriert ist, wird dieser im Local Storage
                // angelegt und zum Startbildschirm weitergeleitet. 
                localStorage.setItem(username, JSON.stringify(user));
                localStorage.setItem("currentUser", username);
                clearScreen();
                callHomeScreen();
            }

        }
        //------------------ Logik der Login-Funktion
        // Klickt ein Nutzer im Loginformular auf den "Anmelden"-Button, 
        // so wird zunächst überprüft, ob die Felder ausgefüllt wurden, 
        // ob der Nutzername bereits existiert und schließlich ob das richtige 
        //Passwort angegeben wurde 
        function loginUserFunc() {
            // Auslesen der Eingabefelder
            var username = $("loginUser").value;
            var password = $("loginPw").value;
            var favourites;
            // Anlegen eines neuen User-Objekts
            var user = {
                username: username,
                password: password,
                favourites: []
            };

            // Wurde kein Nutzername eingegeben, wird eine Fehlermeldung angezeigt
            if (username === "") {
                alert("Bitte gebe einen Nutzernamen ein.")
            } else {
                // Es wird überprüft, ob der Nutzername im localStorage existiert
                if (localStorage.getItem(username) !== null) {
                    var currentUser = JSON.parse(localStorage.getItem(username));
                    // wenn ja, wird das User-Objekt abgerufen, geparsed und das 
                    // Passwort mit dem eingegeben Passwort abgeglichen
                    if (currentUser.password === password) {
                        // Stimmen die Passwörter überein, wird der Nutzer als 
                        // aktueller Nutzer abgespeichert und der Startbildschirm
                        // wird wieder aufgerufen
                        localStorage.setItem("currentUser", username);
                        clearScreen();
                        callHomeScreen();
                    } else {
                        // Stimmen die Passwörter nicht überein, wird eine Fehlermeldung
                        // ausgegeben.
                        alert("Falsches Passwort. Bitte gebe das richtige Passwort ein.")
                    }
                } else {
                    // Kann der Nutzername nicht im Local Storage gefunden werden,
                    // wird eine Fehlermeldung ausgegeben
                    alert("Der Nutzername existiert nicht.")
                }
            }
        }


        // Funktion zum Löschen der eigenen Nutzerdaten
        function deleteUser() {
            localStorage.removeItem(loggedInUser);
        }








        // Die Funktion callHomeScreen ruft den Startbildschirm auf und lädt die aktuellen 
        // Wetterdaten und Vorhersagedaten in die entsprechenden Elemente
        function callHomeScreen() {

            clearScreen();
            /* ----------------------- OpenWeather API -----------------------*/
            //------------------ Aktuelle Wetterdaten


            var currentWeatherAPI = `${weatherUrl}?q=${city},${country}&lang=de&units=metric&appid=${apiKey}`;

            // Anfrage senden und erst nach Empfangen der Daten weitermachen (then)
            fetch(currentWeatherAPI)
                .then(response => {
                    return response.json(); // in Json umwandeln 
                })
                .then(data => {
                    const { temp, humidity, pressure } = data.main; // deklaration der kurzform der wetter variablen
                    var tempRounded = Math.round(temp * 10) / 10; // temperatur auf eine Dezimalstelle auf- bzw. abrunden

                    // DOM Elemente mit aktuellen Wetterangaben füllen
                    $("degrees").textContent = tempRounded + "°C";
                    $("windSpeed").textContent = "Windstärke: " + data.wind.speed + " m/s";
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

                    currentDayval = convertDate(data.dt);
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
                    // var weekDays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
                    // var currentDay = 0;
                    // for (var i = -1; i < 4; i++) {
                    //     $("upperDay" + (currentDay)).textContent = weekDays[(convertWeekDay(data.list[0].dt) + (i + 1)) % 7];
                    //     currentDay++;
                    // }


                    // go through list array and sort hours into respective days
                    // for (var i = 0; i < 40; i++) {
                    //     if (convertWeekDay(data.list[i].dt) === convertWeekDay(data.list[i].dt)) {
                    //         hoursByDay.push(convertTime(data.list[i].dt));
                    //     }

                    // console.log(convertDate(data.list[i].dt) + "," + convertTime(data.list[i].dt));
                    // }

                    // Objektarrays füllen (Aufrufe in Mouselistener)

                    var hourData = [
                        ["1", "1", "1", "1", "1", "1", "1", "1"],
                        ["2", "2", "2", "2", "2", "2", "2", "2"],
                        ["3", "3", "3", "3", "3", "3", "3", "3"],
                        ["4", "4", "4", "4", "4", "4", "4", "4"],
                        ["5", "5", "5", "5", "5", "5", "5", "5"],
                        ["1", "1", "1", "1", "1", "1", "1", "1"],
                        ["2", "2", "2", "2", "2", "2", "2", "2"],
                        ["3", "3", "3", "3", "3", "3", "3", "3"],
                        ["4", "4", "4", "4", "4", "4", "4", "4"],
                        ["5", "5", "5", "5", "5", "5", "5", "5"],
                    ];

                    // Objekt instanziieren pro Tag (derzeit nur erstes)
                    dailyObj = new DayObj("Monday", "tempAtNoon", "icon", "weekCurve", hourData, 1);

                    setHourlyData(dailyObj, 0);

                    console.log(data.list[0].dt);
                    console.log(convertTime(data.list[0].dt));

                    // Kurvenansicht über Woche --> Temperatur: als Zeit immer 14:00 auswählen pro Tag

                });










            /* ----------------------- UI Elemente -----------------------*/

            // Parent Wrapper erstellen
            var parent = $("parentDiv");
            //parent.style.backgroundImage = randBgColour();


            // Titel "Prophy" im Header als Link zur Startseite implementieren
            $("title").addEventListener("click", function () {
                callHomeScreen();
            });

            // Loginbutton, Nutzermenü und Logoutbutton je nach Nutzerstatus anzeigen lassen
            if (localStorage.getItem("currentUser") !== null) {
                // loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
                loggedInUser = localStorage.getItem("currentUser");
                $("loginButton").textContent = loggedInUser;
                getUserMenu();
                getLogoutButton();
            } else {
                $("loginButton").textContent = "Login";
                removeUserMenu();
                removeLogoutButton();
            }

            function getUserMenu() {
                newDiv("profileMenu", $("navWrapper"));
                $("profileMenu").addEventListener("click", function () {
                    openMenu();
                    console.log("got clicked");
                });
                var menuIcon = document.createElement("img");
                menuIcon.id = "menuIcon";
                menuIcon.src = "https://img.icons8.com/clouds/100/000000/menu.png";
                menuIcon.height = "50";
                menuIcon.width = "50";
                $("profileMenu").appendChild(menuIcon);
            }

            function removeUserMenu() {
                if ($("profileMenu") != null) {
                    $("profileMenu").parentElement.removeChild($("profileMenu"));
                }
            }

            function getLogoutButton() {
                newDiv("logoutBtn", $("navWrapper"));
                $("logoutBtn").addEventListener("click", function () {
                    localStorage.removeItem("currentUser");
                    callHomeScreen();
                });
                var logoutIcon = document.createElement("img");
                logoutIcon.id = "logoutIcon";
                logoutIcon.src = "https://img.icons8.com/clouds/100/000000/export.png";
                logoutIcon.height = "50";
                logoutIcon.width = "50";
                $("logoutBtn").appendChild(logoutIcon);
            }

            function removeLogoutButton() {
                if ($("logoutBtn") != null) {
                    $("logoutBtn").parentElement.removeChild($("logoutBtn"));
                }
            }


            // Funktion um das Nutzermenü aufzurufen bzw. zu schließen
            var menuIsClosed = true;

            function openMenu() {
                if (menuIsClosed) {
                    // Menüelement zum Ändern der Nutzerdaten
                    newDiv("navMenu", $("parentDiv"));
                    newDiv("editProfile", $("navMenu"));
                    $("editProfile").textContent = "Profil bearbeiten"

                    // Menüelement zum Löschen des aktuellen Nutzerkontos
                    newDiv("deleteUser", $("navMenu"));
                    $("deleteUser").textContent = "Konto löschen"
                    $("deleteUser").addEventListener("click", function () {
                        deleteUser();
                        localStorage.removeItem("currentUser");
                        callHomeScreen();
                    });
                } else {
                    closeMenu();
                }

                menuIsClosed = !menuIsClosed;

            }

            function closeMenu() {
                $("navMenu").parentElement.removeChild($("navMenu"));
            }


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
                        console.log("wetter" + dailyObj.weatherIndex);

                    }
                    setHourlyData(dailyObj, i); // je nach Button
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

            // Klassenobjekt mit allen Daten zur Vorhersage

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
                    this.getHourlyData = (weatherIndex) => {
                        return "Windstärke: " + weatherData[weatherIndex][0] +
                            " \n Windrichtung: " + weatherData[weatherIndex][1] +
                            " \n Niederschlag: " + weatherData[weatherIndex][2] +
                            " \n Luftdruck: " + weatherData[weatherIndex][3] +
                            "\n Bewölkung: " + weatherData[weatherIndex][4] +
                            "\n Sichtbarkeit: " + weatherData[weatherIndex][5] +
                            "\n Sonnenaufgang: " + weatherData[weatherIndex][6] +
                            " \n Sonnenuntergang: " + weatherData[weatherIndex][7];
                    }
                }
            };

            function setHourlyData(obj, index) {
                $("hourlyDataText").innerText = obj.getHourlyData(index);
            }
        }
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

        // Funktion um alles außer Header von der Seite zu entfernen
        function clearScreen() {
            var parentNode = $("parentDiv");
            while (parentNode.firstChild) {
                parentNode.removeChild(parentNode.firstChild);
            }
        }



    });