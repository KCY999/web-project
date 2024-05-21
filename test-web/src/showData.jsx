
import React from 'react'
//import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

// API https://data.fda.gov.tw/opendata/exportDataList.do?method=openData&InfoId=36&limit=10&sort=許可證字號

let default_dataset;

const columns = [
    { field: 'CN_name', headerName: '中文名稱', width: 300 },
    { field: 'EN_name', headerName: '英文名稱', width: 300 },
    { field: 'medicine_id', headerName: '許可證字號', width: 300},
    { field: 'symptom', headerName: '適應症', width: 600},
];


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ChildKeyword:''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handlReset = this.handlReset.bind(this);
      }
    
    
    
    componentDidUpdate(){
        //console.log(this.state.ChildKeyword);
    }

    // componentDidMount(){
    //     console.log(this.state.value);
    // }
    
    handleChange = (event) => {
      this.setState({ ChildKeyword: event.target.value });
    }

    handlReset(){
        this.props.getAct('reset');
        this.setState({ChildKeyword:''});
    }

    handleSearch(){
        this.props.getAct('search');
        this.props.getKeyword(this.state.ChildKeyword);
    }
    

    render() {
      return (
        <div>
          <input
            type="text"
            value={this.state.ChildKeyword}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSearch}>搜尋</button>
          <button onClick={this.handlReset}>重設</button>
        </div>
      );
    }
  }


class DataTable extends React.Component {
    
    
    
    render(){
        let selectedData;
        switch(this.props.act){
            case 'search':
                console.log(this.props.dataset);
                console.log(this.props.keyword);
                selectedData =  this.props.dataset.filter((data)=>{
                    //console.log(data)
                    let kw_is_included = data['medicine_id'].includes(this.props.keyword) || data['CN_name'].includes(this.props.keyword)  || data['symptom'].includes(this.props.keyword) ;
                    return kw_is_included;
                });
                break;
            case 'reset':
                selectedData = this.props.dataset;
                break;
            default:
                selectedData = this.props.dataset;
                break;
        }
        return (
            <DataGrid 
                    rows={selectedData} 
                    columns={columns} 
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                />  
        );
    }

            
}



class DataContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            act: '',
            dataset: this.props.dataset, // why cannot assign
            keyword: ''
        };
        //this.searchedData = this.searchedData.bind();
      }
    
    componentDidMount(){
        this.setState({dataset:this.props.dataset})
        console.log(this.state.dataset)
        console.log(this.state.keyword)
    }
    
    componentDidUpdate(prevProps, prevState){
        if (prevState.keyword !== this.state.keyword){
            //this.searchedData(this.state.keyword)
            //this.setState({dataset: this.props.dataset});

        }
    }   

    getKeyword = (data) =>  {
        this.setState({keyword: data})
        //this.searchedData(this.state.keyword);
        
    }
    
    getAct = (action) => {
        this.setState({act:action})
    }
    
    // searchedData = (keyword) => {
    //     if(keyword!=''){
    //         let new_dataset = this.props.dataset.filter((data)=>{
    //             console.log(data)
    //             let kw_is_included = data['medicine_id'].includes(keyword) || data['CN_name'].includes(keyword)  || data['symptom'].includes(keyword) ;
    //             return kw_is_included;
    //         });
    //         this.setState({dataset: new_dataset});
    //         console.log(this.state.dataset);
    //     }else{
    //         this.setState({dataset: default_dataset});  
    //     }
    // }

    render(){
        //console.log(this.state.dataset);  //j為何資料上不去?
        return (

            <>
               {/* <p>{this.state.keyword}</p> */}
                <SearchBar getKeyword={this.getKeyword} getAct={this.getAct}  /*ClickSearch={this.searchedData}*/ />
                <div style={{ height: 635, width: '100%' }}>
                    <DataTable act={this.state.act}  keyword={this.state.keyword}  dataset={this.props.dataset}/>
                </div> 
            </>
        );
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
            default_dataset = data;
            //console.log(default_dataset)
            this.setState({dataset: data});
        });
    }
    

    componentDidMount(){
        this.fetchData();
    }
    
    render(){
        return (
            <>
            <h1>藥品查詢平台</h1>
            <div style={{ height: 635, width: '100%' }}>
                <DataContainer dataset={this.state.dataset} />
            </div> 
            </>
        );
    }
}




// export default ShowData;
export default Main;




