import React, { Component } from 'react'
import '../../App.css'
import instance from "../../api/config";

function EventBoard(){
    const london = async () => {
        const response = await instance.get(`/londonEvents`);
        let table = document.getElementById('table');
        let content =''
        content += '<p>'
        for (let d of response.data) {
            
            content += JSON.stringify(d.name);
            content += '<br>'
        }
        content += '</p>'
        table.innerHTML = content;
    };

    const toronto = async () => {
        const response = await instance.get(`/torontoEvents`);
        let table = document.getElementById('table');
        let content =''
        content += '<p>'
        for (let d of response.data) {
            
            content += JSON.stringify(d.name);
            content += '<br>'
        }
        content += '</p>'
        table.innerHTML = content;
    };

    const niagara = async () => {
        const response = await instance.get(`/niagaraEvents`);
        let table = document.getElementById('table');
        let content =''
        content += '<p>'
        for (let d of response.data) {
            
            content += JSON.stringify(d.name);
            content += '<br>'
        }
        content += '</p>'
        table.innerHTML = content;
    };
    
    return (
    
    <><h1 className='eventboard'>EVENT BOARD</h1>
    <div className="button-container">
        <button className="button"  onClick= {london} style={{ marginLeft: 700, marginTop: 100, height: 200, width: 300, fontSize: 40 }}>
        London
        </button>
        <button className="button"  onClick= {toronto} style={{ marginLeft: 700, height: 200, width: 300, fontSize: 40 }}>
        GTA
        </button>
        <button className="button"  onClick= {niagara} style={{ marginLeft: 700, height: 200, width: 300, fontSize: 40 }}>
        Niagara
        </button>
    </div>
    <div style={{ marginLeft: 1800, marginTop: 100, fontSize: 40 }} id='table'></div>
    </>
    )
}

export default EventBoard;
