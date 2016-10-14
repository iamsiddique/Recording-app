mainApp.controller("recordController",['$scope','$timeout','recordService', function ($scope,$timeout, recordService) {

	var onFail = function(e) {
		$scope.disableit = false;
		console.log('Rejected!', e);
		console.log(e.name);
		if(e.name == 'MediaDeviceNotSupported'){
			console.log('ntsupported');
			//$scope.startRecording();
		}
		//console.log(e.NavigatorUserMediaError.name);
		//console.log('Rejected!', e);
		//$scope.startRecording;
	};
	var context
	var onSuccess = function(s) {

		context = new AudioContext();
		var mediaStreamSource = context.createMediaStreamSource(s);
		recorder = new Recorder(mediaStreamSource);
		recorder.record();
		console.log('initializing');
		console.log(context);
		$timeout(function () {			
			recorder.stop(); 
			console.log(context);
			/*context.close().then(function() {
				console.log('closed')
			});*/
			console.log('recording');			
			var context = new AudioContext();
			var mediaStreamSource = context.createMediaStreamSource(s);
			recorder = new Recorder(mediaStreamSource);
			recorder.record();
			$scope.disableit = false;
		}, 2000);
		

				// audio loopback
				// mediaStreamSource.connect(context.destination);
			}

			window.URL = window.URL || window.webkitURL;
			navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

			var recorder;
			var audio = document.querySelector('audio');

			$scope.startRecording =  function() {
				$scope.disableit = true;
				if (navigator.getUserMedia) {
					navigator.getUserMedia({audio: true}, onSuccess, onFail);
				} else {
					console.log('navigator.getUserMedia not present');
				}
			}

			$scope.stopRecording =  function () {
				recorder.stop();
				recorder.exportWAV(function(s) {
					audio.src = window.URL.createObjectURL(s);
					$scope.blob = s;
					console.log($scope.blob);
					
				});
				
  				context.close().then(function() {
   					console.log('closed')
  				});
			}
			$scope.init = function(){
				recorder.record();
				setTimeout(function(){ 
					console.log('called')
					recorder.stop(); }, 700);
			

				//$scope.stopRecording();
			}
			$scope.save =  function () {
			$scope.fileName;
			
			var promise = recordService.uploadData($scope.fileName, $scope.blob);
			promise.then(function(success){
				console.log('success');
			}, function(error){
				console.log('error');
			});
			
			}
	
}]);