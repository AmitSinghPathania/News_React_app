import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class News extends Component {
  

    constructor(){
        super();
        this.state = {
            articles :[],
            loading:false,
            page:1
        }
    }

    async componentDidMount(){

        console.log('componentDidMount() always render after the render function')
        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=5bca79a7a9c94b39884d1c3b0cab473b&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles,totalResult:parsedData.totalResult})
    }

    handlePreviousClick= async()=>{

        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=5bca79a7a9c94b39884d1c3b0cab473b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({})

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
        
    }

    handleNextClick= async()=>{
        if( this.state.page + 1 > Math.ceil(this.state.totalResult/20)){

        }
        else{
        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=5bca79a7a9c94b39884d1c3b0cab473b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({})

        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
        })

    }
       

    }

  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center'>FastNews - Top Headlines </h1>
        
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4 mb-3" key={element.url}>
            <Newsitem  title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,40):""} imageUrl={element.urlToImage?element.urlToImage:"https://cdn.vox-cdn.com/thumbor/Zoc7c7NvPhp3QpOUwsky70QU3zM=/0x0:1200x628/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24265929/goldenidol.jpeg"} newsUrl={element.url} />
          </div>
        })}
            
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<1} className="btn btn-success" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>

      </div> 
    )
  }
}
