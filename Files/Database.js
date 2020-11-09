//  The JavaScript code is property to Mr. You (Kristiyan Valchev) and can only be viewed
//  If you want to use part of the code, please first contact me: mr.youdevelopment@gmail.com

var firebaseConfig = {
    apiKey: "AIzaSyAizZKWd8Dy16IxPLGdfdBrX0aFBhznD7g",
    authDomain: "beconceptmasks.firebaseapp.com",
    databaseURL: "https://beconceptmasks.firebaseio.com",
    projectId: "beconceptmasks",
    storageBucket: "beconceptmasks.appspot.com",
    messagingSenderId: "798954416004",
    appId: "1:798954416004:web:b7e5d920493f78a0bedfd1"
};

firebase.initializeApp(firebaseConfig);
const cloudData = firebase.firestore();

function sendPurchaseData()
{
    var canPurchase;
    var firstName = document.getElementById("FNInputFieldText").value;
    var instagramOrPhone = document.getElementById("IPhInputFieldText").value;
    var maskName = document.getElementById("maskName").innerHTML;

    if (firstName.length >= 2 && firstName.indexOf(' ') <= 0)
    {
        document.getElementById("FNInputFieldText").style.borderBottomColor = "#fefefe";
        document.getElementById("FNInputFieldLabel").style.color = "#fefefe80";
        document.getElementById("Error invalidName").style.display = "none";

        if (instagramOrPhone.length >= 3 && instagramOrPhone.indexOf(' ') <= 0)
        {
            document.getElementById("IPhInputFieldText").style.borderBottomColor = "#fefefe";
            document.getElementById("IPhInputFieldLabel").style.color = "#fefefe80";
            document.getElementById("Error invalidInstagramOrTel").style.display = "none";
            canPurchase = true;
        }
        else
        {
            document.getElementById("IPhInputFieldText").style.borderBottomColor = "red";
            document.getElementById("IPhInputFieldLabel").style.color = "red";
            document.getElementById("Error invalidInstagramOrTel").style.display = "block";
            canPurchase = false;
        }
    }
    else
    {
        document.getElementById("FNInputFieldText").style.borderBottomColor = "red";
        document.getElementById("FNInputFieldLabel").style.color = "red";
        document.getElementById("Error invalidName").style.display = "block";
        canPurchase = false;
    }

    if (canPurchase)
    {
        cloudData.doc("Purchases/" + instagramOrPhone).set(
        {
            firstName: firstName,
            instagramOrPhone: instagramOrPhone,
            maskName: maskName
        }).catch(function(error)
        {
            console.log("Got an Error: " + error);
        })

        defaultData();
        document.getElementById("correctness purchesSuccess").style.display = "block";
        desableElement("correctness purchesSuccess", 2.5);
    }
}

function defaultData()
{
    document.getElementById("FNInputFieldText").value = "";
    document.getElementById("IPhInputFieldText").value = "";
    document.getElementById("buyForm").style.display = "none";
}

function loadData()
{
    cloudData.collection("Purchases").where("firstName", "!=", null).get().then(function(querySnapshot)
    {
        querySnapshot.forEach(function(doc)
        {
            var Perchase = '<div class = "contentBox">'
            Perchase += '<div class = "contentTitleHolder">'
            Perchase += '<h1 class = "contentTitleText" id = "maskName">' + doc.data().firstName + '</h1></div>';
            Perchase += '<p class = "contentText"> Име: ' + doc.data().firstName + '</p>';
            Perchase += '<p class = "contentText"> Контакт: ' + doc.data().instagramOrPhone + '</p>';
            Perchase += '<p class = "contentText"> Маска: ' + doc.data().maskName + '</p></div>';

            document.getElementById("contentBoxHolder").innerHTML += Perchase;
        });
    }).catch(function(error)
    {
        console.log("Error getting documents: ", error);
    });
}