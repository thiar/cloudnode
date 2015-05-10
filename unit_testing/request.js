var requestify = require('requestify');

for(var i=0;i<3;i++){
		requestify.get('http://its.ac.id').then(function(response){
		response.getBody();

		response.body;
		// console.log(response.getBody());
		
	});
		console.log(i);
}

