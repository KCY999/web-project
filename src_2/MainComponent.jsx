
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Form from '../FormFrame';
import './template.css'
// import SelectPakage from './selectPackage';
// API https://data.fda.gov.tw/opendata/exportDataList.do?method=openData&InfoId=36&limit=10&sort=許可證字號


const columns = [
    // { field: 'package', headerName: '包裝', width: 200},
    { field: 'CN_name', headerName: '中文名稱', width: 200 },
    { field: 'EN_name', headerName: '英文名稱', width: 200 },
    { field: 'medicine_id', headerName: '許可證字號', width: 300},
    { field: 'symptom', headerName: '適應症', width: 800},
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
    
    
    
    // componentDidUpdate(prevProps,xprevState){
    //     if(prevState.ChildKeyword != this.state.ChildKeyword){
    //         this.props.getKeyword(this.state.ChildKeyword);
    //     }
    // }

    handleChange = (event) => {
        this.setState({ ChildKeyword: event.target.value });
        // this.props.getAct('search');
        // this.props.getKeyword(this.state.ChildKeyword);
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
            className='search-input'
            placeholder='關鍵字搜尋'
          />
          <button className="search-btn" onClick={this.handleSearch}>以關鍵字搜尋</button>
          <button className="search-btn" onClick={this.handlReset}>重設</button>
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
                    let kw_is_included = data['medicine_id'].includes(this.props.keyword) || data['CN_name'].includes(this.props.keyword) || data['EN_name'].includes(this.props.keyword) || data['symptom'].includes(this.props.keyword) ;
                    return kw_is_included;
                });
                break;
            case 'reset':
                selectedData = this.props.dataset;
                break;
            case 'formSelect':
                selectedData = this.props.dataset.filter((data)=>{
                    let kw_is_included =  data['symptom'].includes(this.props.sick) ;
                    return kw_is_included;
                })
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
            keyword: '',
            sick: ''
        };
        //this.searchedData = this.searchedData.bind();
      }
    
    componentDidMount(){
        this.setState({dataset:this.props.dataset})
        console.log(this.state.dataset)
        console.log(this.state.keyword)
    }
    
   

    getKeyword = (kw) =>  {
        this.setState({keyword: kw})
       // this.searchedData(this.state.keyword);
        
    }
    
    getAct = (action) => {
        this.setState({act:action})
    }
    


    getSick = (selectedSick) => {
        this.setState({sick: selectedSick})
    }

    render(){
        return (

            <>
                <div className='search-container'>
                    <SearchBar className='SearchBar' getKeyword={this.getKeyword} getAct={this.getAct}  /*ClickSearch={this.searchedData}*/ />
                </div>
                <div className='search-container'>
                    <Form className='selectForm' getSick={this.getSick} getAct={this.getAct}/>
                </div>
                <div className='dataTableContainer' >
                    <div className='dataTable'>
                        <DataTable act={this.state.act}  keyword={this.state.keyword}  dataset={this.props.dataset} sick={this.state.sick} />
                    </div> 
                </div>
                
            </>
        );
    }
    
}






class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: []
        };
      }
    //https://data.fda.gov.tw/opendata/exportDataList.do?method=openData&InfoId=36&sort=許可證字號
    fetchData(){
        fetch(`./normal.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ act: 'showAll' })
          })
            .then(res => res.json())
            .then(json => {
              console.log(json);
              
              
              let data = json.map(item => ({
                id: item['Medicine_ID'],
                CN_name: item['Name_CN'],
                EN_name: item['Name_EN'],
                medicine_id: item['Medicine_ID'],
                symptom: item['Symptom_detail'],
                package: item['Packaging']
              }));
              console.log(data);
          
              this.setState({ dataset: data });
            })
            .catch(error => console.error('Error:', error));
          
    }
    

    componentDidMount(){
        document.title = '藥品查詢平台'     
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




export default MainComponent;




