import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog, Button } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import reqwest from 'reqwest';
import TableFilter from './Filter';
import ContainerTitle from '@/components/ContainerTitle';
import styles from './index.module.scss';

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getData = async() => {

  const data = await reqwest({
    url: 'http://localhost:3000/search/course',
    method: 'get',
  });

  return data;
};

function Employee(props) {
  const [dataSource, setDataSource] = useState([]);

  function handleRedirect() {
    props.history.push('/add/courses');
  }

  useEffect(() => {
    const getData = async() => {

      const data = await reqwest({
        url: 'http://localhost:3000/search/course',
        method: 'get',
      });
      setDataSource(data);
    };
    getData();

  }, []);

  function handleDelete(index, value) {
    console.log(value);
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: async () => {
        const result = await reqwest({
          url: 'http://localhost:3000/delete/course',
          method: 'post',
          data: JSON.stringify({ c_id: value }),
          contentType: 'application/json',
        });
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

  function handleModify(value){
    console.log(value);
    const student = dataSource.filter((v) => {
      return v.c_id === value;
    })[0];
    encodeURIComponent();
    props.history.push(`/modify/courses?id=${student.c_id}&name=${student.c_name}`);
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
        <Button onClick={() => handleDelete(index,value)} type="normal" warning>
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

  return (
    <IceContainer className={styles.container}>
      <ContainerTitle
        title="课程信息"
        buttonText="添加课程"
        className={styles.title}
        onClick={handleRedirect}
      />
      <Table dataSource={dataSource} hasBorder={false} className={styles.table}>
        <Table.Column dataIndex="c_id" title="课程ID" />
        <Table.Column
          dataIndex="c_name"
          title="课程名"
        />
        <Table.Column dataIndex="c_id" title="操作" cell={renderOper} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(Employee);
