import React, { Component } from "react";
import {Pagination} from 'antd'
import axios from 'axios';

import { Button, Card, Col, Row, Input, List, Avatar, Spin } from 'antd';
import { Select, Divider } from 'antd';

import { postCatedoryURL, site_host, no_image } from "../constants";
import { Link } from 'react-router-dom';
import "../css/spin.css";



const { Option } = Select;


const { Meta } = Card;


class PostCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts:[],
      activePage:1,
      itemsCountPerPage:1,
      totalItemsCount:1,
      pageRangeDisplayed:3,

      brand:null,
      area:null,
      page:null,
      post_type:null,
      
      search_text:null,

      isButtonDisabled: false
    };
  }


  componentDidMount()
  {
    this.setState({ loading: true });
    axios.get(postCatedoryURL)
    .then(response=>{
      this.setState({
        posts:response.data.results,
        itemsCountPerPage:response.data.limit,
        totalItemsCount:response.data.count,
        activePage:response.data.currentPage,
        pageRangeDisplayed:response.data.total_pages,
      });
      this.setState({ loading: false });
    });
  }
 

 onChangePagin = page => {

  

  var params = new URLSearchParams();
  params.append("page", page);


  if (this.state.area){
    params.append("area", this.state.area);
  }

  if (this.state.search_text){
      params.append("search", this.state.search_text);
  }

  if (this.state.post_type){
      params.append("post_type", this.state.post_type);
  }

  if (this.state.post_type==1){
    if (this.state.brand){
      params.append("brand", this.state.brand);
    }
  }

  var request = {
    params: params
  };

    this.setState({ loading: true });

    axios.get(postCatedoryURL,
      request
    )
    .then(response=>{
      this.setState({
        posts:response.data.results,
        itemsCountPerPage:response.data.limit,
        totalItemsCount:response.data.count,
        pageRangeDisplayed:response.data.total_pages,
      });
      this.setState({ loading: false });
    });


    this.setState({activePage: page});

  };



  handleSortChange(){




    this.setState({
        isButtonDisabled: true,
        activePage:1
    });

    setTimeout(() => this.setState({ isButtonDisabled: false }), 3000);


    var params = new URLSearchParams();

    if (this.state.activePage){
      params.append("page", this.state.activePage);
    }

     if (this.state.brand){
      if(this.state.brand !=0){
        params.append("brand", this.state.brand);
      }
      
    }

    if (this.state.area){

      if( this.state.area!=0){
        params.append("area", this.state.area);
      }
    }

    // if post type is not universal
    if (this.state.post_type){
      if( this.state.post_type != 0 && this.state.post_type != 2){
          console.log(this.state.post_type)
          params.append("post_type", this.state.post_type);
      }
      
    }



    if (this.state.search_text){
      params.append("search", this.state.search_text);
    }

    var request = {
      params: params
    };

    this.setState({ loading: true });
    axios.get(postCatedoryURL, 
      request
    )
    .then(response=>{
      this.setState({
        posts:response.data.results,
        itemsCountPerPage:response.data.limit,
        totalItemsCount:response.data.count,
        pageRangeDisplayed:response.data.total_pages,
        loading: false
      });
    });
  }



  handleChangeSelectBrand = value => {
    if (value === 0)
    {
      this.setState({
        brand: null
      })
    }
    else{
      this.setState({
        brand: value
      })
    }
  };



  handleChangeSelectCity = value => {

    if (value === 0)
    {
      this.setState({
        area: null
      })
    }
    else{
      this.setState({
        area: value
      })
    }

  };


handleChangeSelectPostType = value => {

    if (value === 0)
    {
      this.setState({
        post_type: null
      })
    }

    else{
      this.setState({
        post_type: value
      })
    }

  };


  handleChangeSearch = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };




  handleInputChange(event) {  
    this.setState({
      search_text:event.target.value,

    })
  }
 
  render() {
    return (

      <div>


      {this.state.loading && (
          <div className="loading-spin">
            <Spin />
          </div>
        )}
      <Row gutter={16}>

      <Col span={8} xs={24} sm={24} md={12} lg={4} xl={4} className="col-pad-custom">


          <Select id="post_type" defaultValue="0" style={{ width: 120 }} onChange={this.handleChangeSelectPostType}>
            <Option value="0">Категория</Option>
            <Option value="1">Авто</Option>
            <Option value="2">Баары</Option>
          </Select>


        </Col>



      

      <Col span={8} xs={24} sm={24} md={12} lg={4} xl={4} className="col-pad-custom">


          <Select id="city" defaultValue="1" style={{ width: 120 }} onChange={this.handleChangeSelectCity}>
            <Option value="0">Область</Option>
            <Option value="1">Чуй</Option>
            <Option value="2">Ош</Option>
            <Option value="3">Джалал-Абад</Option>
            <Option value="4">Ыссык Кол</Option>
            <Option value="5">Нарын</Option>
            <Option value="6">Талас</Option>
            <Option value="7">Баткен</Option>
          </Select>
        </Col>


        { (this.state.post_type == 1)? (
            <Col span={8} xs={24} sm={24} md={12} lg={4} xl={4} className="col-pad-custom">

          <Select id="brand" defaultValue="1" style={{ width: 120 }} onChange={this.handleChangeSelectBrand}>
            <Option value="0">Марка</Option>
            <Option value="1">Honda</Option>
            <Option value="2">Toyota</Option>
            <Option value="3">Mercedes-Benz</Option>
            <Option value="4">BMW</Option>
            <Option value="5">Audi</Option>
            <Option value="6">Daewoo</Option>
            <Option value="7">Hyundai</Option>
            <Option value="8">KIA</Option>
            <Option value="9">Lada</Option>
            <Option value="10">Lexus</Option>
            <Option value="11">Mazda</Option>
          </Select>

        </Col>

            ) : ('')
        }

        

        


        

        <Col span={8} xs={24} sm={24} md={12} lg={4} xl={4} className="col-pad-custom">

          <Input name="title" placeholder="Издоо текст" id='title' value={this.state.search_text} onChange={this.handleInputChange.bind(this)}  />


        </Col>



        

        <Col span={8} xs={24} sm={24} md={12} lg={6} xl={6} className="col-pad-custom">

        <Button htmlType="submit" type="primary" onChange={this.handleSortChange}  onClick={this.handleSortChange.bind(this)}  disabled={this.state.isButtonDisabled}>
          Сорттоо
        </Button>


        </Col>

        </Row>

        <Divider/>

        <p>Жалпы посттордун саны: {this.state.totalItemsCount}</p>
       
       


    <List
      itemLayout="horizontal"
      dataSource={this.state.posts}
      renderItem={item => (
        <List.Item extra={
            <Link to={`/detail/${item.id}`}>
            <img
              width={272}
              alt="logo"
              src={item.image_has ? site_host + item.image_first : site_host + no_image}
            />
            </Link>
          }>

          <List.Item.Meta
            title={<Link to={`/detail/${item.id}`}>{item.title}</Link>}
            description={item.description}
          />
        </List.Item>
      )}
    />


      
        <Pagination 
          total={this.state.totalItemsCount}
          pageSize={12}
          current= {this.state.activePage}
          onChange={this.onChangePagin}
        />


      </div>


    );
  }


}


export default PostCategory;