import React, { Component } from "react";

import axios from 'axios';

import { Button, List, Col, Row, Input } from 'antd';
import {Pagination} from 'antd'
import { Select, Divider } from 'antd';
import { productDeleteURL, profileListURL} from "../constants";
import { authAxios } from "../utils";
import { Link } from 'react-router-dom';
const { Option } = Select;



class ProfileList extends Component {
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
      
      search_text:null
    };
  }


  componentDidMount()
  {
    authAxios
    .get(profileListURL)
    .then(response=>{
      this.setState({
        posts:response.data.results,
        itemsCountPerPage:response.data.limit,
        totalItemsCount:response.data.count,
        activePage:response.data.currentPage,
        pageRangeDisplayed:response.data.total_pages,
      });
    });
  }


  handleDelete(event,id)
  {
    
    authAxios.delete(productDeleteURL(id))
    .then(response=>{
      this.componentDidMount();
    });
  }
 



  onChangePagin = page => {
    var params = new URLSearchParams();
    params.append("page", page);

    if (this.state.brand){
      params.append("brand", this.state.brand);
    }

    if (this.state.area){
      params.append("area", this.state.area);
    }

    if (this.state.search_text){
        params.append("search", this.state.search_text);
    }

    var request = {
      params: params
    };




    authAxios(profileListURL, request)
    .then(response=>{
      this.setState({
        posts:response.data.results,
        itemsCountPerPage:response.data.limit,
        totalItemsCount:response.data.count,
        pageRangeDisplayed:response.data.total_pages,
      });
    });


    this.setState({activePage: page});

  };




  handleSortChange(){


    var params = new URLSearchParams();

    if (this.state.activePage){
      params.append("page", this.state.activePage);
    }

    if (this.state.brand){
      if(this.state.brand!=0){
        params.append("brand", this.state.brand);
      }
      
    }

    if (this.state.area){

      if(this.state.area!=0){
        params.append("area", this.state.area);
      }
    }

    if (this.state.search_text){
      params.append("search", this.state.search_text);
    }


    var request = {
      params: params
    };

    authAxios(profileListURL, request)
    .then(response=>{
      this.setState({
        posts:response.data.results,
        itemsCountPerPage:response.data.limit,
        totalItemsCount:response.data.count,
        pageRangeDisplayed:response.data.total_pages,
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




  handleInputChange(event) {  
    this.setState({
      search_text:event.target.value,

    })
  }

 
  render() {
    return (

      <div>

      <Row gutter={16}>

      <Col span={8} xs={24} sm={24} md={12} lg={6} xl={6} className="col-pad-custom">

          <Select id="brand" defaultValue="0" style={{ width: 120 }} onChange={this.handleChangeSelectBrand}>
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

      <Col span={8} xs={24} sm={24} md={12} lg={6} xl={6} className="col-pad-custom">


          <Select id="city" defaultValue="0" style={{ width: 120 }} onChange={this.handleChangeSelectCity}>
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

        <Col span={8} xs={24} sm={24} md={12} lg={6} xl={6} className="col-pad-custom">
          <Input name="title" placeholder="Издоо текст" id='title' value={this.state.search_text} onChange={this.handleInputChange.bind(this)}  />
        </Col>

        

        <Col span={8} xs={24} sm={24} md={12} lg={6} xl={6} className="col-pad-custom">

        <Button htmlType="submit" type="primary" onChange={this.handleSortChange}  onClick={this.handleSortChange.bind(this)} >
          Сорттоо
        </Button>


        </Col>

        </Row>

        <Divider/>

        <Row gutter={16}>
          {
            this.state.posts.map(post=>{

              return(

                <div>
                <List.Item>
                <List.Item.Meta
                  title={post.title}
                  description={<Link to={`/edit/${post.id}`}>[Өзгөртүү] {post.description}</Link>}
                />
                <Button type="danger"  onClick={(e) => {
                  this.handleDelete(e, post.id)
                }}>Өчүрүү</Button>

              
              </List.Item>
              </div>
                
              )
            })
          }
        </Row>


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


export default ProfileList;