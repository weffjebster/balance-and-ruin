function setTab(evnt, tabID) {
    var tabContents = document.getElementsByClassName("content-tab");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" is-active", "");
    }

    document.getElementById(tabID).style.display = "block";
    evnt.currentTarget.className += " is-active";
}
