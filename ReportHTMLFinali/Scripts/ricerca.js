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
		resultsBox.innerHTML = "<h2><a href='https://massimotedesco88.github.io/AutoFinanceReport/ReportHTMLFinali/"+ticker+"_report.html' target='_blank' rel='noopener noreferrer'>"+ticker+"</a><i>(clicca per il Report)</i></h2>"+"<p><i><b>periodo</b> = ultima data del periodo dell'anno analizzato; <b>Prezzo Medio annuale, max e min raggiunto </b> : sono i prezzi in euro che son stati raggiunti nel periodo; <br> <b>TP5,TP10,TP15,SL10</b> = TP sta per Take Profit, SL sta per Stop Loss, valori espressi in Euro (numero a fianco indica la %, +5% +10% +15% per TP e -10% per SL)<br><b>TP e SL colpito</b> = indica la data in quel periodo annuale di quando son stati colpiti; <br> <b>segnale MP e LP</b> = MP sta per Medio periodo e LP per Lungo periodo; <b>fase</b> = la fase di mercato in cui si trova; </i></p><hr>";		
		data.forEach((row,i) => {//cicla su ogni riga ricevuta dal backend
			const p = document.createElement('p');//crea un paragrafo per ogni riga
			let testo='';// inizializza stringa vuota per contenuto riga
			const entries= Object.entries(row);//prende tutte le coppie chiave/valore dell'oggetto row
			entries.forEach((entry, index) => {//cicla su ogni coppia key,value della riga
				const key = entry[0];//separa chiave e valore di ogni volonna
				const value= entry[1];
				testo += "<b>"+key+":</b> <span class='big'>"+value+"</span> | "; //aggiunge alla stringa key e value				
				console.log(testo);
				});//chiude parentesi entries.forEach			
			p.innerHTML = testo+"<hr>";//assegna il testo al paragrafo ( x riga)			
			console.log(p);
			resultsBox.appendChild(p);//aggiunge il paragrafo creato dentro al contenitore HTML									
			});//chiude parentesi data.forEach
		}//chiude parentesi try

	catch (error) {
		console.error(error);
		resultsBox.innerHTML ='<p><i>Errore nella ricerca dei Dati </i></p>';
	}
});
