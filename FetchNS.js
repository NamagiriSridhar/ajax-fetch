var userId = 0;
	var userObjArr = [];

    $('#form1').on('submit', function(e)
    {
       e.preventDefault(); 
       var username = $("#name").val();
       $("#userpage").empty();
       $("#username").empty();
	   fetch("https://jsonplaceholder.typicode.com/users?username="+username)
      .then((res) => res.json())
      .then((data) => 
       {
       	 data.forEach(function(user)
       	 {
       	 	userObjArr += user;
      	 	userId = user.id;
      	 	console.log(userId);
      	 	var userName =  "User Name: "+ user.name;
      	 	$("#username").append(userName).append($("<hr>")); 
	        let output = `
	        <div class = row>
	        <button id="get_posts"  class="btn btn-primary col-md-5 ml-4 mr-4 " 
	        onclick="getPostTitlesforUser(userId)">Posts</button>
	        <button id="get_albums"  class="btn btn-primary col-md-5  mr-4 " 
	        onclick="getAlbumTitlesforUser(userId)">Albums</button>
	        </div>`
	        $("#username").append(output);
      	 })
      	 if(data.length=== 0)
         {
  			$("#username").append("User " + username + " not found. Try again");
         }
       });
       
    });

function getPostTitlesforUser(userId)
{
	console.log(userId);
	fetch("https://jsonplaceholder.typicode.com/posts?userId="+userId)
      .then((res) => res.json())
      .then((data) => 
       {
         // let h = $("<h6>").text("Post titles");
         // $("#userpage").append(h).append("**** ******"); 
         // let ul = $("<ul>");
         // $("#userpage").append(ul);	
          $("#userpage").empty();
          let output = '<h2 class="mb-4">Posts</h2>';
	 	 data.forEach(function(post)
       	 {
       	// 	let tag = $(`<li class="link" data-link="https://jsonplaceholder.typicode.com/comments?postId=${post.id}"></li>`);
    		output += `
            <div class="card card-body mb-3 link" data-link="https://jsonplaceholder.typicode.com/comments?postId=${post.id}">
              <h3>${post.title}</h3>
              <p>${post.body}</p>
            </div>
          `;

    		//tag.text(post.title );
    		//$("#userpage").append(tag);	
      	 });
      	 $("#userpage").append(output);
       });
}

$(document).on('click', '.link', function () {
	fetch($(this).data('link'))
    .then((res) => res.json())
    .then((data) => 
     {
     	$("#userpage").empty();
 //    	let back_to_posts = $('<button id="get_posts"  class="btn btn-primary btn-lg" data-link="https://jsonplaceholder.typicode.com/posts" onclick="getPostTitlesforUser(userId)">Back to posts</button>');
  //		$("#userpage").append(back_to_posts).append($("<br/><br/>"));
  		let output = '<h2 class="mb-4">Comments</h2>';
  		data.forEach(comment => 
  		{
  			output += `
            <div class="card card-body mb-3">
              <h3>${comment.name}</h3>
              <p>${comment.body}</p>
            </div>
          `;
     	});
      	$("#userpage").append(output);
     });
 });

function getAlbumTitlesforUser(userId)
{
	fetch("https://jsonplaceholder.typicode.com/albums?userId="+userId)
      .then((res) => res.json())
      .then((data) => 
       {
          $("#userpage").empty();
          let output = '<h2 class="mb-4">Albums</h2>';
	 	 data.forEach(function(album)
       	 {
    		output += `
            <div class="card card-body mb-3 link2" data-link="https://jsonplaceholder.typicode.com/photos?albumId=${album.id}">
              <h3>${album.title}</h3>
              <p>${album.body}</p>
            </div>
          `;

    		//tag.text(post.title );
    		//$("#userpage").append(tag);	
      	 });
      	 $("#userpage").append(output);
       });
}


$(document).on('click', '.link2', function () {
	fetch($(this).data('link'))
    .then((res) => res.json())
    .then((data) => 
     {
     	$("#userpage").empty();
 		let output = '<h2 class="mb-4">Photos</h2>';
  		data.forEach(photo => 
  		{
  			output += `
              <h6>${photo.title}</h6>
              <img src=${photo.thumbnailUrl} class="img-thumbnail col-sm-3">
          `;
     	});
      	$("#userpage").append(output);
     });
 });
