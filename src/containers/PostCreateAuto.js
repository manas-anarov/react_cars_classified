import React, { Component } from 'react';
import { Form, Input, Select, Button, Upload, Modal, Divider } from 'antd';


import {  PostCreateURL} from "../constants";
import { authAxios } from "../utils";

const { Option } = Select;


const FormItem = Form.Item;

const { TextArea } = Input;


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


class PostCreateAuto extends Component {


constructor(props) {
    super(props);
      this.state = {

        area:1,
        group:1,
        title: '',
        description: '',
        price:null,
        is_active:true,
        car_type:1,
        year:null,

        image: null,
        
        //file uploader
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],


        isButtonDisabled: false

      }
   
  }


  handleCancel = () => this.setState({ previewVisible: false });



  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChangePic = ({ fileList }) => this.setState({ fileList });



  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };


  handleChangeSelect = value => {
    this.setState({
      currency: value
    })
  };


  handleChangeYear = value => {
    this.setState({
      year: value
    })
  };

  

  handleChangeSelectBrand = value => {
    this.setState({
      car_type: value
    })
  };

  handleChangeSelectCity = value => {
    this.setState({
      area: value
    })
  };





  handleSubmit = (e) => {

    e.preventDefault();



    this.setState({
        isButtonDisabled: true
    });

    setTimeout(() => this.setState({ isButtonDisabled: false }), 3000);


    let form_data = new FormData();


    form_data.append('item.area', this.state.area);
    form_data.append('item.group', this.state.group);
    form_data.append('item.title', this.state.title);
    form_data.append('item.description', this.state.description);
    form_data.append('item.price', this.state.price);
    form_data.append('item.is_active', this.state.is_active);
    form_data.append('car_type', this.state.car_type);


    for(let i=0; i< this.state.fileList.length; i++){
      form_data.append("files",this.state.fileList[i].originFileObj);
    }



        authAxios.post(PostCreateURL, form_data,
          {
      headers: {
        'content-type': 'multipart/form-data'
      }}
      )
        .then(res => {
  
          alert("Текст Сакталды");
          
          console.log(res.data);

        })
        .catch(err => console.log(err))


  };




  render() {

    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <div className="ant-upload-text">Сурот тандоо</div>
      </div>
    );


    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>


        <FormItem label="Марка" >
          <Select id="brand" defaultValue="1" style={{ width: 120 }} onChange={this.handleChangeSelectBrand}>
            <Option value="1">Танданыз</Option>
            <Option value="2">Honda</Option>
            <Option value="3">Toyota</Option>
            <Option value="4">Mercedes-Benz</Option>
            <Option value="5">BMW</Option>
            <Option value="6">Audi</Option>
            <Option value="7">Daewoo</Option>
            <Option value="8">Hyundai</Option>
            <Option value="9">KIA</Option>
            <Option value="10">Lada</Option>
            <Option value="11">Lexus</Option>
            <Option value="12">Mazda</Option>
          </Select>
        </FormItem>


        <FormItem label="Область" >
          <Select id="city" defaultValue="1" style={{ width: 120 }} onChange={this.handleChangeSelectCity}>
            <Option value="1">Чуй</Option>
            <Option value="2">Ош</Option>
            <Option value="3">Джалал-Абад</Option>
            <Option value="4">Ыссык Кол</Option>
            <Option value="5">Нарын</Option>
            <Option value="6">Талас</Option>
            <Option value="7">Баткен</Option>
          </Select>
        </FormItem>


        <FormItem label="Тема" >
          <Input name="title" placeholder="Тема" id='title' value={this.state.title} onChange={this.handleChange} required />
        </FormItem>

        <FormItem label="Текст" >
          <TextArea rows={4} name="description" placeholder="Текст" id='description' value={this.state.description} onChange={this.handleChange} required />
        </FormItem>

        <FormItem label="Баасы" >
          <Input name="price" type="number" placeholder="Баасы" id='price' value={this.state.price} onChange={this.handleChange} required />
        </FormItem>

        <FormItem label="Жылы" >
          <Input name="year" type="number" placeholder="Жылы" id='year' value={this.state.year} onChange={this.handleChange} required />
        </FormItem>


        
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChangePic}
        >
        {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>

          
          <Divider/>

        

          <Button type="primary" htmlType="submit" disabled={this.state.isButtonDisabled}>Сактоо</Button>


        </form>
      </div>

    );
  }
}

export default PostCreateAuto;