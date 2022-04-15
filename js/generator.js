
// Variables
/*************************/

var generated = "";

/*************************/

function validateUrl (siteUrl) {

}

function generateCode(){
	siteUrl = document.querySelector('.site-url').value;
	var buttonRun = document.querySelector('.button-run');

	if (!siteUrl.includes('http')) { siteUrl = "http://" + siteUrl;	} 
	
	if (siteUrl == 'http://') {
		document.querySelector('#output-field').value = "Enter an URL, please";
		return;
	}

	if (!siteUrl.includes('.')) { 
		document.querySelector('#output-field').value = "Enter a valid URL, please";
		return;
	}

	var url = new URL(siteUrl);
	var siteName = url.hostname.replace('www.','');
	var imageName = siteName.split(".")[0];



	buttonRun.classList.remove('hover:bg-red-500');
	buttonRun.classList.add('copied', 'bg-green-400');
	buttonRun.innerText = "Copied";

	document.querySelector('#output-field').value = `
<div class="item">
	<a class="image" rel="nofollow" target="_blank" href="${siteUrl}">
		<img alt="${siteName}" srcset="{{skin url='images/clients/250/${imageName}.png'}} 250w,
		{{skin url='images/clients/500/${imageName}.png'}} 500w" sizes="(min-width: 1300px) 250px, (min-width: 1025px) 25vw, (min-width: 640px) 33vw, (min-width: 375px) 50vw, 100vw" src="{{skin url='images/clients/250/${imageName}.png'}}" data-src="{{skin url='images/clients/250/${imageName}.png'}}" data-srcset="{{skin url='images/clients/250/${imageName}.png'}} 250w,
	{{skin url='images/clients/500/${imageName}.png'}} 500w" class=" lazyloaded"></a>
	<div class="info">
		<a class="title" rel="nofollow" target="_blank" href="${siteUrl}">${siteName}</a>
		<p class="description">

        	<!-- Description -->

		</p>
		<div class="tags">
			<span></span>
			<span></span>

			<!-- More tags -->

		</div>
	</div>
</div>
	`;

	if (navigator.permissions) {
        navigator.permissions.query({name: 'clipboard-write'}).then(function (result) {
            if (result.state === 'granted' || result.state === 'prompt') {
                navigator.clipboard.writeText(document.querySelector('#output-field').value);
            }
        });
    }
	return;
}

function clearField(){
	document.querySelector('.site-url').value = "";
	var buttonRun = document.querySelector('.button-run');

	buttonRun.classList.add('hover:bg-red-500');
	buttonRun.classList.remove('copied', 'bg-green-400');
	buttonRun.innerText = "Get code";

}