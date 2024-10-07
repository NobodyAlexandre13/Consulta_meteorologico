const search = document.querySelector('.buscar');

search.addEventListener('submit', async (event)=>{
  event.preventDefault();

  const cidade = document.querySelector('.city').value;

  if(cidade != ''){
    clean_weather();
    show_warning('Carregando...');


    let chave = "08d385c1a6006098d3f0d82dbe6fb0bf";

    let api2 = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(cidade)}&appid=${chave}&units=metric&lang=pt`;

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidade)}&appid=${chave}&units=metric&lang=pt`;

    let resposta = await fetch(api);
    let json = await resposta.json();

    let previsao = await fetch(api2);
    let json2 = await previsao.json();
    console.log(json2.list);

    if(json.cod === 200){
      show_weather({
        provicia: json.name,
        pais: json.sys.country,
        tempo: json.main.temp,
        Icon: json.weather[0].icon,
        velocidadeVento: json.wind.speed,
        descricao: json.weather[0].description,
        humidade: json.main.humidity,
        tempo_max: json.main.temp_max,
        tempo_min: json.main.temp_min
      });
      
      document.querySelector('.img1 img').setAttribute('src', `https://openweathermap.org/img/wn/${json2.list[6].weather[0].icon}@2x.png`);
      document.querySelector('.img2 img').setAttribute('src', `https://openweathermap.org/img/wn/${json2.list[11].weather[0].icon}@2x.png`);
      document.querySelector('.img3 img').setAttribute('src', `https://openweathermap.org/img/wn/${json2.list[17].weather[0].icon}@2x.png`);

      document.querySelector('.climaP').innerHTML = `${json2.list[6].main.temp}`;
      document.querySelector('.climaD').innerHTML = `${json2.list[11].main.temp}`;
      document.querySelector('.climaA').innerHTML = `${json2.list[17].main.temp}`;

      document.querySelector('.descP').innerHTML = `${json2.list[6].weather[0].description}`;
      document.querySelector('.descD').innerHTML = `${json2.list[11].weather[0].description}`;
      document.querySelector('.descA').innerHTML = `${json2.list[17].weather[0].description}`;

    }else{
      clean_weather();
    }
  }else{
    console.log('Digite algo!!');
  }
});

function show_weather(json){
  show_warning('');
  document.querySelector('.dados').style.display = 'block';

  if(json.provicia === "Loanda"){
      document.querySelector('.name_city').innerHTML = `Luanda, ${json.pais}`;
  }else{
      document.querySelector('.name_city').innerHTML = `${json.provicia}, ${json.pais}`;
  }
  document.querySelector('.tempo img').setAttribute('src', `https://openweathermap.org/img/wn/${json.Icon}@2x.png`);
  document.querySelector('.clima').innerHTML = `${json.tempo}°C`;
  document.querySelector('.desc').innerHTML = `${json.descricao}`
  document.querySelector('.maxC').innerHTML =`${json.tempo_max}°C`
  document.querySelector('.minC').innerHTML =`${json.tempo_min}°C`
  document.querySelector('.humidP').innerHTML = `${json.humidade}%`
  document.querySelector('.ventoP').innerHTML = `${json.velocidadeVento}km/h`
  
}
function clean_weather(){
  show_warning('CIDADE NÃO ENCOTRADA...');
  document.querySelector('.dados').style.display = 'none';
}
function show_warning(warning){
  document.querySelector('.aviso').innerHTML = warning;
}
