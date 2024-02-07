
/*
Fonction appelée lorsque la page est chargée
*/

function ChargerInfo(el) {
  var code = el.value;
  var type = document.getElementById("typefichier").value;

  switch (type)
  {
    case "json":
    GetAndDisplayJSON(code);
	GetAndDisplayTEXT(code);
    break;

    case "xml":
	GetAndDisplayXML(code);
	GetAndDisplayTEXT(code);
    break;
  }
}

/*
Fonction qui récupère via AJAX un fichier JSON stocké sur le serveur et affiche son contenu dans la section <div>
*/
function GetAndDisplayJSON(code) {
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			DisplayJSONResponse(JSON.parse(xhr.responseText), code);
		}
	}
	
	xhr.open("GET", "ajax/peintures.json", true);
	xhr.send();
}

/*
Fonction qui affiche le résultat JSON dans la section <div>
*/
function DisplayJSONResponse(json, code) {

  var peintures = json.peinture;
  
	for (i = 0; i < peintures.length; i++) {
		
		if (code == peintures[i].code)
		{
		var image = peintures[i].image;
    	var titre = peintures[i].titre;
		var artiste = peintures[i].artiste;
    	var prix = peintures[i].prix;
		
		}
	}
	document.getElementById("peinture").src = "img/"+image ;
	

	titrespan = document.getElementById("titre");
	titrespan.textContent = titre;

	artistespan = document.getElementById("artiste");
	artistespan.textContent = artiste;

	prixspan = document.getElementById("prix");
	prixspan.textContent = prix;

}

/*
Fonction qui récupère via AJAX un fichier XML stocké sur le serveur et affiche son contenu dans la section <div>
*/
function GetAndDisplayXML(code) {
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			DisplayXMLResponse(xhr.responseXML, code);
		}
	}
	
	xhr.open("GET", "ajax/peintures.xml", true);
	xhr.send();
}

function DisplayXMLResponse(xml, code) {

	var peintures = xml.getElementsByTagName("peinture");
	console.log(peintures);
	for (i = 0; i < peintures.length; i++) {

		if ( peintures[i].getElementsByTagName("code")[0].firstChild.nodeValue == code)
		{
		var titre = peintures[i].getElementsByTagName("titre")[0].firstChild.nodeValue;
		var image = peintures[i].getElementsByTagName("image")[0].firstChild.nodeValue;
		var artiste = peintures[i].getElementsByTagName("artiste")[0].firstChild.nodeValue;
		var prix = peintures[i].getElementsByTagName("prix")[0].firstChild.nodeValue;
		
		}
	
	}
	document.getElementById("peinture").src = "img/"+image ;
	
	var spantitre = document.getElementById("titre");
	while(spantitre.firstChild){
	  spantitre.removeChild(spantitre.firstChild);
	}
	spantitre.appendChild( document.createTextNode(titre) );


	var spanartiste = document.getElementById("artiste");
	while(spanartiste.firstChild){
		spanartiste.removeChild(spanartiste.firstChild);
	}
	spanartiste.appendChild( document.createTextNode(artiste) );

	var spanprix = document.getElementById("prix");
	while(spanprix.firstChild){
		spanprix.removeChild(spanprix.firstChild);
	}
	spanprix.appendChild( document.createTextNode(prix) );


}

function GetAndDisplayTEXT(code) {
	var xhr = new XMLHttpRequest();
	

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			
			var spaninfo = document.getElementById("info");
			while (spaninfo.firstChild) {
				spaninfo.removeChild(spaninfo.firstChild);
			}
			spaninfo.appendChild(document.createTextNode(xhr.responseText));
		}
	}
	
	xhr.open("GET", "ajax/" + code + ".txt", true);
	xhr.send();
}