class Network {
	
	post(path, body, onSuccess, onFailure, onNetworkFailure) {
		let url = 'http://localhost:8080';
        // var url = location.protocol + '//' + location.host;
		url = url+path;
		
		fetch(url, {
			method: 'POST', 
			mode: 'cors', 
			headers: {'Content-Type': 'application/json; charset=utf-8'},
			credentials: 'include',
			body: body
		}).then(this.status.bind(this))
		  .then(this.json.bind(this))
		  .then(function(data) {
		    console.log('Request succeeded with JSON response', data);
		    if (data['exception']) {
		    		onFailure(data)
		    } else {
		    		onSuccess(data)
		    }
		}).catch(function(data) {
		    console.log('Request failed', data);
		    onNetworkFailure(data)
		});
	}
	
	status(response) {
		if ((response.status >= 200 && response.status < 300) || response.status === 403) {
			return Promise.resolve(response)
		} else {
		    return Promise.reject(new Error(response.statusText))
		}
	}

	json(response) {
		return response.json()
	}  
}

export default Network
