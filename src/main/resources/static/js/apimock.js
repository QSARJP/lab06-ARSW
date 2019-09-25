
apimock=(function(){

	let mockdata=[];
   mockdata["author"]=[{"author":"author","points":[{"x":10,"y":10},{"x":110,"y":110}],"name":"authorExample"},{"author":"author","points":[{"x":110,"y":110},{"x":200,"y":200},{"x":250,"y":250}],"name":"authorExample2"}];
   mockdata["jack"]=[{"author":"jack","points":[{"x":120,"y":15},{"x":5,"y":1},{"x":8,"y":4},{"x":10,"y":15}],"name":"jackExample"}];
	return {
		getBlueprintsByAuthor: function(name, callback) {
            callback(mockdata[name]);
         },
        getBlueprintsByNameAndAuthor: function(author, name, callback) {
            callback(
             mockdata[author].filter(obj => {
               return obj.name === name;
             })[0]
           );
         }
       };
     })();