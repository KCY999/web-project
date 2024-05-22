import React from "react";

const data = {
    "口腔疾病": ["口腔炎", "口腔潰瘍", "口腔殺菌劑", "口臭"],
    "寄生蟲感染": ["疥癬", "陰蝨感染", "陰道滴蟲感染"],
    "黴菌性感染": ["皮膚黴菌病", "足癬", "股癬", "汗斑", "甲癬", "真菌群感染", "念珠菌感染", "革蘭氏陽性菌感染", "嗜血桿菌感染", "酵母菌感染"],
    "細菌性感染": ["拔牙術後預防", "細菌性腹瀉", "皮膚細菌感染"],
    "喉嚨(支氣管)疾病": ["喉嚨癢", "聲音嘶啞", "喉乾", "支氣管炎", "咽喉炎", "過敏性鼻炎", "喉嚨痛", "支氣管擴張症", "上氣道炎"],
    "發炎": ["發炎", "口腔炎", "咽喉炎", "扁桃腺炎", "齒齦炎", "舌下腺炎", "皮膚炎", "過敏性皮膚炎", "異位性皮膚炎", "支氣管炎", "過敏性鼻炎", "腸胃炎", "神經炎", "關節炎", "腱周圍炎", "上腕骨上髁炎", "肩關節周圍炎", "上腕肩胛關節周圍炎", "毛囊炎", "女陰陰道炎", "女陰炎", "肌肉性風濕症", "風濕症", "腱鞘炎", "粘液囊炎"],
    "消毒殺菌": ["手部消毒", "皮膚消毒", "外用消毒", "器具消毒"],
    "耳鼻疾病": ["鼻充血", "鼻塞", "流鼻水", "打噴嚏", "耳鼻潰爛", "耳道炎"],
    "外傷": ["外傷", "刀傷", "擦傷", "火傷", "蚊蟲叮咬", "凍傷"],
    "皮膚": ["皮膚乾燥症", "皮膚角化症", "皮膚炎", "皮膚糜爛", "皮膚搔癢", "皮膚癬", "皮膚刺激", "尋常性痤瘡", "濕疹", "尿布疹", "蚊蟲叮咬", "膿瘡", "皰疹", "脫毛", "皮膚洗淨", "蕁麻疹", "皮膚過敏", "牛皮癬", "異位性皮膚炎"],
    "感冒": ["感冒", "鼻塞", "流鼻水", "打噴嚏", "咳嗽", "喀痰"],
    "眼部": ["人工淚液"],
    "醫美衛生用品": ["脫毛", "去角質", "人工淚液", "口腔殺菌劑"],
    "腸胃疾病": ["下痢", "腸胃炎", "胃酸過多", "腹痛", "細菌性腹瀉", "腹瀉", "消化不良", "軟便"],
    "動暈症": ["暈船", "暈車", "暈機"],
    "疼痛": ["止痛", "關節痛", "神經痛", "坐骨神經痛", "頭痛", "筋肉痛", "腰痛", "肩痛", "喉嚨痛", "骨折痛"],
    "肌肉傷害": ["肌肉疲勞", "肌肉酸痛", "肩膀酸痛", "扭傷", "腰痛", "關節痛"],
    "缺乏症": ["維生素B1缺乏症", "維生素B2缺乏症", "維生素B3缺乏症(菸鹼醯胺、菸鹼酸)", "維生素B5缺乏症(泛酸、泛鈣酸)", "維生素B6缺乏症", "維生素B9缺乏症(葉酸)", "維生素B12缺乏症", "維生素B缺乏症", "維生素C(群)缺乏症", "維生素D缺乏症", "維生素E缺乏症", "缺鐵性貧血", "營養障礙性貧血", "營養補給", "鈣缺乏症"],
    "其他": ["止痛", "中暑", "嘔吐", "頭暈", "組織腫脹", "氣喘", "營養補給", "貧血", "末梢血行障礙", "睡眠困擾", "戒菸輔助劑"]
}


class DetailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'',
            sick: ''
        };
    
        this.detailOfType = this.detailOfType.bind(this);
        this.handleSelectSick = this.handleSelectSick.bind(this);

    }
    
    componentDidUpdate(prevProps){
        if(prevProps.type !== this.props.type){
            this.setState({type: this.props.type})
        }
    }


    detailOfType(){
        if(this.props.type){
            return( 
                <>
                    <option value={''}>{'請選擇具體病症'}</option>
                    {data[this.props.type].map((item)=>(
                        <option value={item} key={item}>
                            {item}
                        </option>
                    )
                    )}
                </>
                    
            );
        }else{
            return (
                <option value={''}>{'請先選擇病症類別'}</option>
            );
        }
        
    }


    handleSelectSick(event){
        console.log(event.target.value);
        this.props.returnSick(event.target.value)
        
    }



    render(){
        return (
            <select className="search-select" onChange={this.handleSelectSick}>
                    {this.detailOfType()}
            </select>
        );
    }
    
}



class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            sick:''
        };
        this.typeChange = this.typeChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.returnSick = this.returnSick.bind(this);
      }
   
    typeForm(){
        return (
            Object.keys(data).map((key)=>(
                <option key={key} value={key}>
                    {key}
                </option>
            ))
        );
    }
    

    typeChange(e){
        this.setState({type: e.target.value})
    }

    


    handleSearch(){
        this.props.getAct('formSelect')
        this.props.getSick(this.state.sick);
    }



    handleReset(){
        this.props.getAct('');
        this.setState({type: ''});
    }

    returnSick(data){
        this.setState({sick: data })
    }


    

    render(){
        //console.log(this.state.type)
        // console.log(Object.keys(data))
        // Object.keys(data).forEach((key)=>{
        //     console.log(data[key]);
        // });
        return (
            <>
                <select className="search-select" value={this.state.type} onChange={this.typeChange}>
                    <option value={''}>{'請選擇病症類型'}</option>
                    {this.typeForm()}
                </select>
                <DetailForm type={this.state.type} returnSick={this.returnSick}/>
                <button className="search-btn" onClick={this.handleSearch}>查詢</button>
                <button className="search-btn" onClick={this.handleReset} >重設</button>
            </>

        );
    }

}

export default Form