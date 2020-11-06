function makeApiCall(page){
	if(page==1){
		document.getElementById('cards').innerHTML=' ';
	}

	var num;
	var tag;
	num=document.getElementById('NumPhotos').value
	tag=document.getElementById('keyword').value
	var url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ca5bb81e0c44b752104107b8e0795cdb&tags='+tag+'&per_page='+num+'&page='+page+'&format=json&nojsoncallback=1';
	$.ajax({url:url, dataType:"json"}).then(function(data) {
		console.log(data);//Review all of the data returned
		for (let i = 0; i < num; i++){
		    let myDiv = document.createElement('div');
		    myDiv.style="width: 20%;";
		    title=data.photos.photo[i].title;
		    img='https://farm'+data.photos.photo[i].farm+'.staticflickr.com/'+data.photos.photo[i].server+'/'+data.photos.photo[i].id+'_'+data.photos.photo[i].secret+'.jpg';
		    //myDiv.innerHTML= '<div class="card"><div class="card-body"><p class="card-text">'+title+'</p></div></div>'
		    myDiv.innerHTML='<div class="card"><img src='+img+' class="card-img-top" alt="..."><div class="card-body"><p class="card-text">'+title+'</p></div></div>'
		    document.getElementById('cards').appendChild(myDiv);
		}
		window.onscroll = function(ev) {
		    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		        makeApiCall(page+1) // page increases so there are no repeats
		    }
		};
	})
}

