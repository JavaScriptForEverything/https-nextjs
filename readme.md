# NextJS on **HTTPS** with all the common features with 'Best Practies'



<div style="display: flex; justify-content: center">
<img
	width='45%'
	src='https://github.com/JavaScriptForEverything/https-nextjs/blob/master/public/https-nextjs-1.png'
/>
<img
	width='45%'
	src='https://github.com/JavaScriptForEverything/https-nextjs/blob/master/public/https-nextjs-2.png'
/>
<div>



##### HTTPS
	. Generate SSL Certificates by bellow commands: (Nothing more)

		. $ yarn create-ca
		. $ yarn create-cert

	. if want to show secure flug in browser then add `ca.key` into you browser

	Firefox: Add certificate to browser
	Setting > (search) certificates > View Certificaties > Authorities > Import > /ssl/ca.key


##### Redux 

	. @reduxjs/toolkit  react-redux  next-redux-wrapper
	. Client-Side Dispatch 
	. Server-Side Dispatch
	. Share redux state even page navigation
	. Redux Middleware

	. Keep store value available on page navigation too.


##### Routing 

	. next-connect  	
		. Expressing like routing
		. Global Error Handler


##### Image Upload

	. Generate dataURL of image via 	FileReader()
	. Upload that image into Server's /public directory
	. Resize image before save via 'sharp'


##### Form Validation

	. Dynamically create every form fields from arrayObject
	. Custom formValidator function
	. Show Errors if form Validation failed just bellow every field



##### Connect to Database

	. mongoose (MongoDB)
	. Take environment variables to connect to database


##### Authentication

	. Authentication via cookie instead of save token in in secure localStorage
	. Protecte /profile route, when not loged in
	. Protecte /login or /signup route, when loged in
	. if token verification success then redirect to /profile route





