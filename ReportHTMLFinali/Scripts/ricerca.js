document.getElementById("tickerForm").addEventListener("submit",async function(e){//inizio evento su submit del form tickerForm
	e.preventDefault();
	const ticker = document.getElementById("ticker").value.trim().toUpperCase();
	console.log(ticker);//debug
	const resultsBox = document.getElementById("results");
	
	resultsBox.innerHTML = "Loading ....";
	const urlBase="https://analisi-finale-ticker.vercel.app/api/cerca_ticker?ticker=";// encodeURIComponent() trasforma una stringa in formato sicuro da usare in URL
	
	const url=urlBase+ticker;//unione tra due variabili di tipo stringa
	console.log(urlBase);//debug
	console.log(url);//debug
	try {
		const response= await fetch(url);//chiama l'API su Vercel passando il nome come paramentro nella URL
		
		if(!response.ok) throw new Error("API request failed");
		const data = await response.json();//converte la risposta in formato JSON		
		console.log(data);//debug
		
		rows.forEach((row,i) => {
			const p = document.createElement('p');
			//costruisci stringa con colonne separate da ,
			const rowText= Object.entries(row).map(([key,value]) => '${key}: ${value}').join(', ');
			p.textContent = rowText;
			resultsBox.appendChild(p);});		
		
	}
	catch (error) {
		console.error(error);
		resultsBox.innerHTML ='<p><i>Errore nella ricerca dei Dati </i></p>';
	}
});
