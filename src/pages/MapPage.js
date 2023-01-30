import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';

import ContentPage from '../components/ContentPage';
import CardsGrid from '../components/CardsGrid';

import Pagination from '../components/Pagination';
import ModalDialog from '../components/ModalDialog';

import LocationModalContent from '../fragments/LocationModalContent';
import LocationGridCard from '../fragments/LocationGridCard';

function MapPage() {
    const [data, setData] = useState([]);
    const [seassons, setSeassons] = useState([]);
    const [info, setInfo] = useState({});
    const [page, setPage] = useState(1);
    const [currentRegContent, setCurrentRegContent] = useState('');
    const [currentReg, setCurrentReg] = useState({});
  	var episodes = [];

    useEffect(async () => {
        await loadEpisodes();
        await loadEpisodes(2);
        await loadEpisodes(3);
      	await drawGrid();
    }, []);

		function drawGrid(){
  		let seasson;
  		let _seassons=[];
      episodes.forEach((_) => {
				let personajes=_.characters;
        seasson=_.episode.substring(1);
        seasson=seasson.split('E')
        seasson[0]=parseInt(seasson[0],10);
        seasson[1]=parseInt(seasson[1],10);
				if (seasson[1]==1){
					_seassons[seasson[0]-1]=[[seasson[1],personajes.length]];
				}else{
					_seassons[seasson[0]-1].push([seasson[1],personajes.length]);
				}
      })
			setSeassons(_seassons);
		}
    async function loadEpisodes(page=1){
        setData([]);

        let url = `http://localhost:7000/episodes/?page=${page}`;
        
        let jsonRslt = await fetch(url, {
                headers: {
                    token: '#TOKEN12345=='
                }
            })
            .then(rslt => rslt.json())
            .catch(err => {console.log({err})})
        ;
        
        let info = jsonRslt.info || {};
        let data = jsonRslt.results || [];
        
      	data.forEach((_) => {
      		episodes.push(_);
      	})
    }

  const getCellColor = (value) => {	
  	let color;
  	if (value<=10)
  		color='#fde725'
		else if (value<=13)
			color='#e5e419'
		else if (value<=14)
			color='#cae11f'
		else if (value<=15)
			color='#b0dd2f'
		else if (value<=16)
			color='#95d840'
		else if (value<=17)
			color='#7ad151'
		else if (value<=18)
			color='#63cb5f'
		else if (value<=19)
			color='#4ec36b'
		else if (value<=20)
			color='#3bbb75'
		else if (value<=21)
			color='#2cb17e'
		else if (value<=23)
			color='#22a884'
		else if (value<=24)
			color='#1f9f88'
		else if (value<=26)
			color='#1f958b'
		else if (value<=29)
			color='#228b8d'
		else if (value<=30)
			color='#26828e'
		else if (value<=31)
			color='#2a788e'
		else if (value<=36)
			color='#2e6f8e'
		else if (value<=37)
			color='#32648e'
		else if (value<=38)
			color='#375a8c'
		else if (value<=40)
			color='#3c4f8a'
		else if (value<=42)
			color='#414487'
		else if (value<=44)
			color='#453781'
		else if (value<=49)
			color='#472a7a'
		else if (value<=57)
			color='#481d6f'
		else if (value<=60)
			color='#471063'
		else if (value<=65)
			color='#440154'

    // Aquí puedes aplicar un algoritmo para calcular el color de la celda
    // en función de sus coordenadas (rowIndex, columnIndex)
    return color;
  };

    return (
    <table className="heatmap">
      <tbody>
        {seassons.map((row, rowIndex) => (
          <tr key={rowIndex}> 
            {row.map((value, columnIndex) => (
              <td key={columnIndex} style={{ backgroundColor: getCellColor(value[1]), border: '1px solid black', padding: '50px', color: 'white'}}> {value[1]} </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    )
}

export default MapPage;
