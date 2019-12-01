import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog, Button } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import TableFilter from './Filter';
import ContainerTitle from '@/components/ContainerTitle';
import { throttle } from '../../../../utils/throttle';

import styles from './index.module.scss';

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return [];
};

function Employee(props) {
  const [dataSource, setDataSource] = useState(getData);

  const [id, setId] = useState('');
  function handleRedirect() {
    props.history.push('/add/scores');
  }

  function handleDelete(index) {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        const data = [...dataSource];
        data.splice(index, 1);
        setDataSource(data);
      },
    });
  }

  function renderProfile(value, index, record) {
    return (
      <div className={styles.profile}>
        <img src={record.avatar} alt="" className={styles.avatar} />
        <span className={styles.name}>{record.name}</span>
      </div>
    );
  }

  function handleModify(value) {
    console.log(value);
    const student = dataSource.filter((v) => {
      return v.name === value;
    })[0];
    props.history.push(`/modify/scores?id=${id}&name=${student.name}&score=${student.score}`);
  }

  function renderOper(value, index) {
    return (
      <div>
        <Button
          type="primary"
          onClick={() => handleModify(value)}
          className={styles.btn}
        >
          修改
        </Button>
        <Button onClick={() => handleDelete(index)} type="normal" warning>
          删除
        </Button>
      </div>
    );
  }
  
  function mockApi(len) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len));
      }, 600);
    });
  }

  function fetchData(len) {
    mockApi(len).then((data) => {
      setDataSource(data);
    });
  }

  function handleFilterChange() {

    fetchData(5);
  }

  function handleSearch(value) {
    console.log(value);
    if(value.id) {
      setId(value.id);
      setDataSource([{
        id: 1,
        name: '单片机',
        score: parseInt(Math.random() * 100),
      }, {
        id: 2,
        name: '大数据',
        score: parseInt(Math.random() * 100),
      }, {
        id: 3,
        name: 'RFID',
        score: parseInt(Math.random() * 100),
      }, {
        id: 4,
        name: '科技英语',
        score: parseInt(Math.random() * 100),
      }, {
        id: 5,
        name: '数据库',
        score: parseInt(Math.random() * 100),
      }].slice(Math.random() * 5));
    } else {
      alert('请输入学号');
    }

  }

  return (
    <IceContainer className={styles.container}>
      <ContainerTitle
        title="成绩列表"
        buttonText="添加成绩"
        className={styles.title}
        onClick={handleRedirect}
      />
      <TableFilter handleSearch={handleSearch} />
      <Table
        dataSource={dataSource} 
        hasBorder={false} 
        className={styles.table}
      >
        <Table.Column dataIndex="id" title="课程号" />
        <Table.Column dataIndex="name" title="课程名" />
        <Table.Column dataIndex="score" title="成绩" />
        <Table.Column dataIndex="name" title="操作" cell={renderOper} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(Employee);
