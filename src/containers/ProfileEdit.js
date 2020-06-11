import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Row, Col, Button,  Upload, Divider } from 'antd';

import { message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { accountEditURL } from "../constants";

const FormItem = Form.Item;


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}





class ProfileEdit extends Component {

  state = {
    username: '',
    first_name: '',
    last_name: '',
    tel: '',
    image: null,
    file: null,

    loading: false,
  };



  componentDidMount() {
        const mytoken =  localStorage.getItem('token');
        axios.get(accountEditURL, 
          {
            headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Token ' + mytoken,
            }
          })
            .then(res => {
                this.setState({
                    username:  res.data.username,
                    tel:  res.data.tel,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    file: res.data.image
                });
            })
    }



   handleChangePic = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
          image:info.file
        }),
      );
    }
  };





  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };





  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();


    form_data.append('username', this.state.username);
    form_data.append('tel', this.state.tel);
    form_data.append('first_name', this.state.first_name);
    form_data.append('last_name', this.state.last_name);

    if(this.state.image){
      form_data.append("image",this.state.image.originFileObj);
    }
    



    const mytoken =  localStorage.getItem('token');

    axios.put(accountEditURL, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': 'Token ' + mytoken,
      }
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err))
    };

  render() {


    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;


    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>

        <Row gutter={[24, 18]}>
          <Col span={24} lg={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }}>

            <FormItem label="Username" >
              
              {this.state.username}
            </FormItem>

            <FormItem label="Атыңыз" >
              <Input name="name"  placeholder="Атыңыз" id='first_name' value={this.state.first_name} onChange={this.handleChange} required />
            </FormItem>

            <FormItem label="Фамилияңыз" >
              <Input name="name"  placeholder="Фамилияңыз" id='last_name' value={this.state.last_name} onChange={this.handleChange} required />
            </FormItem>
        
            <FormItem label="Телефон" >
              <Input name="price"  placeholder="Телефон" id='tel' value={this.state.tel} onChange={this.handleChange} required />
            </FormItem>

            </Col>
           
            </Row>

            <p>
            <img src={this.state.file} style={{width: 300, height: 300}} alt="1"/>
            </p>

            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChangePic}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>

            <Divider/>
            
          <Button type="primary" htmlType="submit">Сактоо</Button>
          

        </form>
      </div>

    );
  }
}

export default ProfileEdit;