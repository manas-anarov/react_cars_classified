import React from 'react';
import { List, Avatar} from 'antd';



const ListItem = (props) => {
    return (
    <List
        itemLayout="vertical"
        size="large"
        pagination={{
        onChange: (page) => {
            console.log(page);
        },
        pageSize: 10,
        }}
        dataSource={props.data}
        renderItem={item => (
        <List.Item
            key={item.title}
            // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
            extra={<a href={`/articles/${item.id}`}><img width={272} alt="logo" src={item.car_pic} /></a>}
        >
            <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={`/edit/${item.id}`}>{item.title}</a>}
            description={item.description}
            />
            <p>Описание: {item.text}</p>
            <p>Цена: {item.price}</p>
        </List.Item>
        )}
    />
    )
}

export default ListItem;