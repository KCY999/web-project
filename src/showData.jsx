import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

// API https://data.fda.gov.tw/opendata/exportDataList.do?method=openData&InfoId=36&limit=10&sort=許可證字號

const columns = [
    { field: 'CN_name', headerName: '中文名稱', width: 300 },
    { field: 'EN_name', headerName: '英文名稱', width: 300 },
    { field: 'medicine_id', headerName: '許可證字號', width: 300},
    { field: 'symptom', headerName: '適應症', width: 600},
];

class Contauner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: 
        };
      }
    
    
}








class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: []
        };
      }

    fetchData(){
        fetch(`https://data.fda.gov.tw/opendata/exportDataList.do?method=openData&limit=100&InfoId=36&sort=許可證字號`)
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
            json = json.filter((item)=>{
                return item['註銷理由'] == '' && item['註銷狀態'] != '已註銷'; 
            });
            console.log(json);
            let data = json.map(item => ({
                id: item['許可證字號'],
                CN_name: item['中文品名'],
                EN_name: item['英文品名'],
                medicine_id: item['許可證字號'],
                symptom: item['適應症']
            }));
            
            this.setState({dataset: data});
        });
    }
    

    componentDidMount(){
        this.fetchData();
    }

    // componentDidUpdate(){
    //     this.fetchData()
    // }
    
    render(){
        return (
            <>
            <h1>藥品查詢平台</h1>
            <div style={{ height: 635, width: '100%' }}>
                <DataGrid 
                    rows={this.state.dataset} 
                    columns={columns} 
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                />  
            </div> 
            </>
        );
    }
}


const ShowData = ()=>{
    
    const [row,setRow] = useState([])
    useEffect(()=>{
        fetch(`https://data.fda.gov.tw/opendata/exportDataList.do?method=openData&InfoId=36&sort=許可證字號`)
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
            json = json.filter((item)=>{
                return item['註銷理由'] == '' && item['註銷狀態'] != '已註銷'; 
            });
            console.log(json);
            const newRows = json.map(item => ({
                id: item['許可證字號'],
                CN_name: item['中文品名'],
                EN_name: item['英文品名'],
                medicine_id: item['許可證字號'],
                symptom: item['適應症']
            }));
            setRow(newRows);
        });
    },[]);
    
    
    
    return(
        <>
        <h1>藥品查詢平台</h1>
        <div style={{ height: 635, width: '100%' }}>
            <DataGrid 
                rows={row} 
                columns={columns} 
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                  }}
                  pageSizeOptions={[5, 10, 25]}
            />  
        </div> 
        </>
    );
  
}

// export default ShowData;
export default Main;
