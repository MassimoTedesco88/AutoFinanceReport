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
		
		resultsBox.innerHTML = "<h2>"+ticker+"</h2>";
		data.forEach((row,i) => {//cicla su ogni riga ricevuta dal backend
			const p = document.createElement('p');//crea un paragrafo per ogni riga
			let testo='';// inizializza stringa vuota per contenuto riga
			const entries= Object.entries(row);//prende tutte le coppie chiave/valore dell'oggetto row
			entries.forEach((entry, index) => {//cicla su ogni coppia key,value della riga
				const key = entry[0];//separa chiave e valore di ogni volonna
				const value= entry[1];
				testo += key+": "+value; //aggiunge alla stringa key e value
				if (index < entries.lenght -1) { // aggiunge virgola sempre ma non all'ultimo elemento
					testo += ", ";
				}
			});
			
			
			p.textContent = testo+"<hr>";//assegna il testo al paragrafo ( x riga)
			
			resultsBox.appendChild(p);});//aggiunge il paragrafo creato dentro al contenitore HTML		
		
	}
	catch (error) {
		console.error(error);
		resultsBox.innerHTML ='<p><i>Errore nella ricerca dei Dati </i></p>';
	}
});
