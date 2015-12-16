// ==UserScript==
// @name		Vote count viewer
// @namespace 	https://github.com/The-Quill/VoteCountViewer
// @version		1.0
// @description	Lets you view the vote count on posts.
// @author		Quill
// @match *://meta.stackexchange.com/questions/*
// @match *://stackexchange.com/questions/*
// @match *://stackoverflow.com/questions/*
// @match *://serverfault.com/questions/*
// @match *://superuser.com/questions/*
// @match *://askubuntu.com/questions/*
// @match	*://meta.codereview.stackexchange.com/questions/*
// ==/UserScript==


(function() {
    Array.prototype.slice.call(document.querySelectorAll('.vote-count-post')).forEach(function(post) {
        post.onclick = getScore;
    });
    function getScore() {
        var post = this;
        var postId = post.parentElement.children[0].value;
        var site = document.location.hostname;
        var url = '//api.stackexchange.com/2.2/posts/'+ postId +'?site=' + site + '&key=fetJx5PJVUspEFsbpN9n1A((&filter=!.UE7HKkP*tRsqwc8';
        var ups = 0;
        var downs = 0;
        $.getJSON(url, function(e) {
            ups = parseInt(e.items[0].up_vote_count, 10);
            downs = parseInt(e.items[0].down_vote_count, 10);
        }).done(function() {
            post.title = ups + " up / " + downs + " down";
            post.innerHTML = "";
            var green = document.createElement('div');
            green.style.color = "green";
            green.textContent = ups;
            var separator = document.createElement('div');
            separator.classList.add('vote-count-separator');
            var maroon = document.createElement('div');
            maroon.color = "maroon";
            maroon.textContent = downs;

            post.appendChild(green);
            post.appendChild(separator);
            post.appendChild(maroon);
        });
    };
})();