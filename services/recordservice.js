mainApp.factory('recordService', [ '$http', '$rootScope', function($http, $rootScope) {

$rootScope.urlBase = 'https://qa1.uc.rogers.com/dev/webservices2/';

var dataFactory = {};
	dataFactory.uploadData = function(name, blob) {
		var fd = new FormData();
		var fileName = name;
		var url = $rootScope.urlBase + "enterprise/group/services/upload/greeting/v1";


		fd.append('blob', blob); 

		
		var request = {
			method : 'POST',
			url : url,
			data : fd,
			headers : {
				'Content-Type' : undefined,
				'groupName': "joesplumbingsmallgroup",
				'serviceProviderId' : "joesplumbingsmall",
                'fileName': fileName
			}
		};
		return $http(request).success(function(result)
		{
			console.log(result);
		}).error(function(result)
		{
			console.log(result);
		});
    };
	return dataFactory;
}])