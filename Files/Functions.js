//  The JavaScript code is property to Mr. You (Kristiyan Valchev) and can only be viewed
//  If you want to use part of the code, please first contact me: krisvalchev@gmail.com

function buyFormOpen()
{
    document.getElementById("buyForm").style.display = "block";
}

function changeSection(sectionChangeID)
{
    document.getElementById("sectionID").className = "contentBox " + sectionChangeID;

    var allChoices = document.getElementsByClassName("scrollSectionBox");
    for (i = 0; i < allChoices.length; i++)
        allChoices[i].className = "scrollSectionBox";

    document.getElementById(sectionChangeID + "Button").className += " Active";
    document.getElementById("maskName").innerHTML = document.getElementById(sectionChangeID + "ButtonText").innerHTML;
    document.getElementById("maskImage").src = "Images/" + sectionChangeID + ".png"
}

function desableElement(elementID, timerSeconds)
{
    window.setTimeout(function()
    {
        var label = document.getElementById(elementID);
        if (label != null)
        {
            label.style.display = "none";
        }
    }, timerSeconds * 1000);
}

function defaultFunction()
{

}