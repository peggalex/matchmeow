import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios';

var port = 2500; 

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('static-files')); 

app.listen(port, function () {
	console.log('Example app listening on port '+port);
});
  
// ================================================================================
// ================================================================================
// ================================================================================


function arrayRemove<T>(array: T[], element: T){
	let index: number = array.indexOf(element);
	if (index!=-1) array.splice(index,1);
}

function alertError(xhr: any, status: string, error: string): void{
	alert(`${error}: ${xhr.responseText}`);
};

async function waitForAjaxCall(url: string): Promise<any>{
	url = url.replace(/[ \t\n]/g, ''); // get rid of empty spaces and newlines

	return new Promise(async (resolve, reject) =>{
		try {
			const response = await axios.get(url);
			resolve(response.data);
		} catch (error) {
			console.log('axios error:', error);
			reject(error);
		}
	});
}

// ================================================================================
// ================================================================================
// ================================================================================

class MyErrors{
	message: string;
	statusCode: number|null;

	constructor(msg: string = '', statusCode: number|null){
		this.message = `Error: ${msg}`;
		this.statusCode = statusCode;
	}
}

// some user-defined errors
class DatabaseError extends MyErrors{
	constructor(msg: string){super(msg, 500);}
}
class InputError extends MyErrors{
	constructor(msg: string){super(msg, 400);}
}
class NotFoundError extends MyErrors{
	constructor(msg: string){super(msg, 404);}
}
class BadAuthError extends MyErrors{
	constructor(msg: string){super(msg, 401);}
}
class ForbiddenError extends MyErrors{
	constructor(msg: string){super(msg, 403);}
}
class ConflictError extends MyErrors{
	constructor(msg: string){super(msg, 409);}
}
class BadWebSocketError extends MyErrors{
	constructor(msg: string){super(msg, null);}
}

async function handleResponseErrors(e: any, res: express.Response){
	if (e instanceof MyErrors && e.statusCode!=null){
		res.status(e.statusCode!);
	} else {
		res.status(500);
	}
	res.send({error: e.message});
	console.log(e.message);
}

// input sanitisation
let isAlphaNumeric = (str: string):Boolean => RegExp("^[0-9a-zA-Z]+$").test(str);
let isHex = (str: string):Boolean => RegExp("^[0-9a-fA-F]+$").test(str);
let isUrl = (str:string):Boolean => RegExp(/^[^ <>\{\}\\(\\);]+$/g).test(str);
//https://www.urlencoder.io/learn/


// ================================================================================
// ================================================================================
// ================================================================================

app.use('/',express.static('static_files')); // this directory has files to be returned

const validGenderPref = ['', 'male', 'female'];
function validateGenderPref(gender: string){
	if (!validGenderPref.includes(gender)){
		throw new InputError('invalid gender pref');
	}
}

interface ShibeOnlineResponse {
	// https://shibe.online
	readonly 0: string;
}

interface DogCeoResponse {
	//https://dog.ceo/dog-api/
	readonly message: string
}

interface adviceslipResponse {
	//https://api.adviceslip.com/#object-slip
	readonly slip: {
		advice: string
	}
}

interface RandomuserResponse {
	//https://randomuser.me/
	readonly results: [{
		gender: string,
		name: {
			first: string,
			last: string
		}
		location: {
			city: string,
			country: string
		}
		email: string,
		dob: {age: string},
		cell: string
	}]
}

const humanToDogYears = 7;

interface ProfileObj {
	// primary key (name, surname)
	name: string; 
	surname: string;
	location: string;
	age: number;
	email: string;
	cell: string;
	imageSrc: string;
	quote: string;
}

class ProfileCreator {

	static async getProfileObj(genderPref: string = ''): Promise<ProfileObj>{
		let [imageSrc, quote] = await Promise.all([
			ProfileCreator.getImageSrc(), 
			ProfileCreator.getQuote()
		]);

		let {results: 
			[{
				name: {first, last}, 
				location: {city, country}, 
				dob: {age},
				email,
				cell
			}]
		} = await waitForAjaxCall(
			`https://randomuser.me/api/?gender=${genderPref}`
		) as RandomuserResponse;
		
		return {
			name: first,
			surname: last,
			location: `${city}, ${country}`,
			age: Math.round(parseInt(age)/humanToDogYears),
			email,
			cell,
			imageSrc: imageSrc,
			quote: quote
		} as ProfileObj;
	}

	static async getImageSrc(): Promise<string>{
		/*let {message} = await waitForAjaxCall(
			'https://dog.ceo/api/breeds/image/random'
		) as DogCeoResponse;*/
		let extension = ['shibes', 'shibes', 'cats', 'cats', 'birds'][Math.floor(Math.random()*5)];
		let src: string = (await waitForAjaxCall(
			`https://shibe.online/api/${extension}`
		))[0];

		return src;
	}

	static async getQuote(): Promise<string>{	
		let {slip: {advice}} = await waitForAjaxCall(
			'https://api.adviceslip.com/advice'
		) as adviceslipResponse;

		return advice;
	}
}
app.get('/getProfile/:g?', async function(req: express.Request, res: express.Response){
	
	let genderPref = req.params.g;
	
	try {
		let profileObj: ProfileObj;

		if (genderPref) {
			validateGenderPref(genderPref);
			profileObj = await ProfileCreator.getProfileObj(genderPref);
		} else {
			profileObj = await ProfileCreator.getProfileObj();
		}

		res.status(200);		
		res.send(profileObj);
		
	} catch (e) {
		handleResponseErrors(e, res);
	}
});
