
// Variables
/*************************/

var siteUrl = "http://undefined.com";
var generated = "";

/*************************/


function generateCode(){
	siteUrl = document.querySelector('.site-url').value;

	var url = new URL(siteUrl);
	var siteName = url.hostname.replace('www.','');
	var imageName = siteName.split(".")[0];


	if (siteUrl == 'http://undefined.com') {
		document.querySelector('#output-field').value = "Enter a Valid URL please";
		return;
	}

	document.querySelector('#output-field').value = `
	<div class="item">
		<a class="image" rel="nofollow" target="_blank" href="${siteUrl}">
			<img alt="${siteName}" srcset="images/clients/250/${imageName}.png 250w,
			images/clients/500/${imageName}.png 500w" sizes="(min-width: 1300px) 250px, (min-width: 1025px) 25vw, (min-width: 640px) 33vw, (min-width: 375px) 50vw, 100vw" src="images/clients/250/${imageName}.png" data-src="images/clients/250/${imageName}.png" data-srcset="https://www.firecheckout.net/skin/frontend/argento/firecheckout/images/clients/250/${imageName}.png 250w,
		images/clients/500/${imageName}.png 500w" class=" lazyloaded"></a>
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
	return;
}