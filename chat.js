var chat = {
    'name' : "",
    'load' : function () {
	document.getElementById("text_input").value = "";
	document.getElementById("wall_text").value = "";
	this.name = prompt("Please enter your name:");
	document.getElementById("name").innerHTML += this.name;
	setInterval(this.poll, 1000);
    },
    'post' : function () {
	var input = document.getElementById("text_input");
	if (input.value.length > 0) {
	    var message = this.name + ' : ' + input.value;
	    input.value = "";
	    var request = new XMLHttpRequest();
	    request.onreadystatechange=function() {
		if (request.readyState==4 && request.status==200) {
		    var w = document.getElementById("wall_text");
		    w.value = request.responseText;
		    w.scrollTop = w.scrollHeight;
		}
	    };
	    request.open("POST",message, true);
	    request.setRequestHeader("Content-type","post");
	    request.send(message);
	}
    },
    'poll' : function () {
	var w = document.getElementById("wall_text");
	var request = new XMLHttpRequest();
	request.onreadystatechange=function() {
	    if (request.readyState==4 && request.status==200) {
		if (w.value != request.responseText) {
		    w.value = request.responseText;
		    w.scrollTop = w.scrollHeight;
		}
	    }
	};
	request.open("POST",'!POLLING!', true);
	request.setRequestHeader("Content-type","poll");
	request.send('!POLLING!');
    },
    input : function (event) {
	var i = document.getElementById("text_input");
	var w = document.getElementById("wall_text");
	w.scrollTop = w.scrollHeight;
	i.scrollTop = i.scrollHeight;
	var key = event.which;
	if (key == 13) {
	    event.preventDefault();
	    this.post();
	}
    }
};