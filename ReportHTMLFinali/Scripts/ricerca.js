document.getElementById("tickerForm").addEventListener("submit",async function(e){
	e.preventDefault();
	const ticker = document.getElementById("ticker").value.trim().toUpperCase();
	console.log(ticker);
	const resultsBox = document.getElementById("results");
	resultsBox.innerHTML = "Loading ....";
	try {
		const response= await fetch('https://analisi-finale-ticker.vercel.app/api/cerca_ticker?ticker=${ticker}');
		if(!response.ok) throw new Error("API request failed");
		const data = await response.json();
		if(Array.isArray(data) && data.lenght >0){
			let table = "<table><thead><tr>";
			//create table header
			for (let key in data[0]){
				table += '<th>${key}</th>';
				console.log(table);//debug
			}
			table+="</tr></thead><tbody>";
			//create rows
			data.forEach(row => {
				table+= "<tr>";
				for (let key in row) {
					table += '<td>${row[key]}</td>';
					console.log(table);//debug
				}
				table+="</tr>";
			});
			table+="</tbody></table>";
			resultsBox.innerHTML = table;
			console.log(table);//debug
			console.log(resultsBox);//debug
		} else {
			resultsBox.innerHTML = '<p>Dati non trovati per <strong>${ticker}</strong>.</p>';
		}
	}
	catch (error) {
		console.error(error);
		resultsBox.innerHTML ='<p><i>Errore nella ricerca dei Dati </i></p>';
	}
});
