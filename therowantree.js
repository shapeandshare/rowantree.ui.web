(function (doc, nav) {
    "use strict";

    var userGUID = '';

    var accessKeyGuid = '285bc061-a271-4463-89f9-c52567656e48';
    var apiVersion = '0.1.0';
    var api_url = 'http://localhost:5000';

    // var pollButton;

    var stores;
    var storesString = '';
    var storesPanel;

    var status = 0;
    var statusString = '';
    var statusPanel;

    var income;
    var incomeString = '';
    var incomePanel;

    var activeFeature;
    var activeFeatureString = '';
    var activeFeaturePanel;

    var features;
    var featuresString = '';
    var featuresPanel;

    var population;
    var populationString = '';
    var populationPanel;

    function UpdateAllTheThings() {
        // set the initial game state
        updateGameState();

        // build the initial ui
        updateUI();
    }

    function buildStatus() {
        switch(status) {
            case 0:
                statusString = 'You are NOT active.'; 
                break;
            case 1:
                statusString = 'You are active.'; 
                break;
            default:
                statusString = 'You are dreaming..';
                break;
        }
        return statusString;
    }

    function buildStores() {
        if (stores == null) {
            storesString = 'Your pockets are empty..';
        }
        else{
            storesString = '+-- stores ----------------<br>';
            for (var key in stores){
                var store_obj = stores[key]
                var amount = store_obj['amount']
                var description = store_obj['description']
                storesString += "| " + key + " (" + amount + ")"
                if (description != null) {
                    storesString += " (" + description + ")";
                }
                storesString += "<br>";
            }
            storesString += '+--------------------------';
        }
        return storesString;
    }

    function buildIncome() {
        if (income == null) {
            incomeString = 'You have no income while you slumber..';
        }
        else{
            incomeString = '+-- income --------------<br>';
            for (var key in income){
                var income_obj = income[key]
                var amount = income_obj['amount']
                var description = income_obj['description']
                incomeString += "| " + key + " (" + amount + ")"
                if (description != null) {
                    incomeString += " (" + description + ")";
                }
                incomeString += "<br>";
            }
            incomeString += '+--------------------------';
        }
        return incomeString;
    }

    function buildActiveFeature() {
        if (activeFeature == null) {
            activeFeatureString = 'you are in the void.';
        }
        else {
            activeFeatureString = '+-- active location -----<br>';
            activeFeatureString += '| ' + activeFeature + '<br>';
            activeFeatureString += '+--------------------------';
        }
        return activeFeatureString;
    }

    function buildFeatures() {
        if (features == null) {
            featuresString = 'you are in the void.';
        }
        else {
                featuresString = '+-- features --------------<br>';
                for (var feature in features){
                    featuresString += '| ' + features[feature] + '<br>'
                }
                featuresString += '+--------------------------';
        }
        return featuresString;
    }

    function buildPopulation() {
        if (populationString == null) {
            populationString = 'you are not even one';
        }
        else {
            populationString = '+-- population ----------<br>';
            populationString += '| ' + population + '<br>';
            populationString += '+--------------------------';

        }
        return populationString;
    }

    function updateUI() {
        statusPanel.innerHTML = buildStatus();
        storesPanel.innerHTML = buildStores();
        incomePanel.innerHTML = buildIncome();
        activeFeaturePanel.innerHTML = buildActiveFeature();
        featuresPanel.innerHTML = buildFeatures();
        populationPanel.innerHTML = buildPopulation();
    }

    function updateGameState() {
        var json_packet = { 'guid': userGUID };
        var json_out = JSON.stringify(json_packet);
        updateUserStoresGameState(json_out);
        updateUserStatusGameState(json_out);
        updateUserIncomeGameState(json_out);
        updateUserActiveFeatureState(json_out);
        updateUserFeaturesState(json_out);
        updateUserPopulationState(json_out);
    }

    function updateUserStoresGameState(guid) {
        $.ajax({
            url: api_url + '/api/user/stores',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                stores = data.stores;
            }
        });
    }

    function updateUserIncomeGameState(guid) {
        $.ajax({
            url: api_url + '/api/user/income',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                income = data.income;
            }
        });
    }

    function updateUserStatusGameState(guid) {
        $.ajax({
            url: api_url + '/api/user/active/state',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                status = data.active;
            }
        });
    }

    function setUserStatusActive() {
        var json_packet = { 'guid': userGUID, 'active': 1 };
        var json_out = JSON.stringify(json_packet);
        $.ajax({
            url: api_url + '/api/user/active/set',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: json_out
        });
    }

    function updateUserActiveFeatureState(guid) {
        $.ajax({
            url: api_url + '/api/user/active/feature',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                activeFeature = data.active_feature;
            }
        });
    }

    function updateUserFeaturesState(guid) {
        $.ajax({
            url: api_url + '/api/user/feature',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                features = data.features;
            }
        });
    }

    function updateUserPopulationState(guid) {
        $.ajax({
            url: api_url + '/api/user/population',
            type: 'POST',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            data: guid,
            success: function(data) {
                population = data.population;
            }
        });
    }

    function createUser() {
        $.ajax({
            url: api_url + '/api/user/create',
            type: 'GET',
            headers:
                {
                    'Content-type': 'application/json',
                    'API-ACCESS-KEY': accessKeyGuid,
                    'API-VERSION': apiVersion
                },
            success: function(data) {
                userGUID = data.guid;
                localStorage.setItem("guid", data.guid);
            },
            async: false
        });
    }

    function initialize() {
        statusPanel = doc.getElementById("statusPanel");
        storesPanel = doc.getElementById("storesPanel");
        incomePanel = doc.getElementById("incomePanel");
        activeFeaturePanel = doc.getElementById("activeFeaturePanel");
        featuresPanel = doc.getElementById("featuresPanel");
        populationPanel = doc.getElementById("populationPanel");

        // pollButton = doc.getElementById("pollButton");
        // pollButton.addEventListener("click", function(){
        //     UpdateAllTheThings();
        // });

        
        if (userGUID == '') {
            if (localStorage.getItem("guid") == null){
                createUser();
            }
            else {
                userGUID = localStorage.getItem("guid");
            }
        }

        // Set the initial state
        UpdateAllTheThings();

        // build the initial ui
        updateUI();

        // set the timer to hanlde future update and refreshes..
        setInterval(UpdateAllTheThings, 1000);

        // user keep alive for in-game character
        setInterval(setUserStatusActive, 5000);
    }
    addEventListener("DOMContentLoaded", initialize);
})(document, navigator);
