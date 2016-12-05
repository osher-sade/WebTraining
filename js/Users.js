var users = [
    {username: 'Marty McFly'},
    {username: 'Janis Joplin'},
    {username: 'Albert Einstein'},
    {username: 'Genghis Khan'},
    {username: 'Dracula'},
    {username: 'Forest Gump'},
    {username: 'Caligula'},
    {username: 'Winnie the Pooh'},
    {username: 'Obama'},
    {username: 'Henry the 8th'}
];

function GetAllUsers() {
    var docfrag = document.createDocumentFragment();

    var filterButton = document.getElementById("filter-button");
    filterButton.addEventListener("click", FilterUsers, false);

    var usersDiv = document.getElementById("users-section");
    usersDiv.innerHTML = "";

    var offsetDiv = document.createElement("div");
    offsetDiv.setAttribute("class", "col-md-9");

    users.forEach(function (user) {

        var wrappingDiv = document.createElement("div");
        wrappingDiv.setAttribute("class", "col-md-2");
        wrappingDiv.setAttribute("id", "user_" + user.username);

        offsetDiv.appendChild(wrappingDiv);

        var imageDiv = document.createElement("div");
        imageDiv.setAttribute("class", "thumbnail centered");

        var image = document.createElement("img");
        image.setAttribute("src", "../images/useravatar.png");
        imageDiv.appendChild(image);
        imageDiv.appendChild(document.createElement("br"));

        var followButton = document.createElement("button");
        followButton.setAttribute("id", "button_" + user.username);
        followButton.setAttribute("class", "btn btn-primary");
        followButton.setAttribute("onclick", "FollowUser(this, '" + user.username + "');");
        followButton.innerHTML = "follow";
        imageDiv.appendChild(followButton);
        imageDiv.appendChild(document.createElement("br"));
        imageDiv.appendChild(document.createElement("br"));
        imageDiv.appendChild(document.createTextNode(user.username));

        wrappingDiv.appendChild(imageDiv);
        offsetDiv.appendChild(wrappingDiv);
    });

    docfrag.appendChild(offsetDiv);
    document.getElementById("users-section").appendChild(docfrag);

    var followeesDiv = document.createElement("div");
    followeesDiv.setAttribute("class", "bordered centered col-md-2");
    followeesDiv.setAttribute("id", "followees-div");

    var followeesTitle = document.createElement("div");
    followeesTitle.setAttribute("class", "h2");
    followeesTitle.innerHTML = "Followees";

    followeesDiv.appendChild(followeesTitle);
    document.getElementById("users-section").appendChild(followeesDiv);
}

function FollowUser(button, username) {
    var buttonText = button.innerHTML;
    var followeesDiv = document.getElementById("followees-div");

    if (buttonText === "follow") {
        button.innerHTML = "unfollow";
        button.setAttribute("class", "btn btn-danger");

        var userDiv = document.createElement("div");
        userDiv.setAttribute("id", username);
        userDiv.setAttribute("class", "thumbnail centered smaller");
        var image = document.createElement("img");
        image.setAttribute("src", "../images/useravatar.png");
        userDiv.appendChild(image);
        userDiv.appendChild(document.createElement("br"));

        var unfollowButton = document.createElement("button");
        unfollowButton.setAttribute("class", "btn btn-danger");
        unfollowButton.setAttribute("onclick", "FollowUser(this, '" + username + "');");
        unfollowButton.innerHTML = "unfollow";
        userDiv.appendChild(unfollowButton);
        userDiv.appendChild(document.createElement("br"));
        userDiv.appendChild(document.createElement("br"));

        userDiv.appendChild(document.createTextNode(username));
        followeesDiv.appendChild(userDiv)
    }
    else {
        button.innerHTML = "follow";
        button.setAttribute("class", "btn btn-primary");

        var unfollowedUserDiv = document.getElementById(username);
        followeesDiv.removeChild(unfollowedUserDiv);

        var userButton = document.getElementById("button_" + username);
        userButton.innerHTML = "follow";
        userButton.setAttribute("class", "btn btn-primary");
    }
}

function FilterUsers() {
    var filterText = document.getElementById("filter-text").value;

    users.forEach(function (user) {
        document.getElementById("user_" + user.username).style.display = "block";
        if ((user.username).indexOf(filterText) === -1) {
            document.getElementById("user_" + user.username).style.display = "none";
        }
    });
}