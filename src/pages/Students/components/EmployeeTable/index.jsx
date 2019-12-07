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
const getData = async(length = 10) => {
  const data = await reqwest({
    url: 'http://localhost:3000/search/stu',
    method: 'get',
  });
  console.log(data);
  return data;
};

function Employee(props) {
  const [dataSource, setDataSource] = useState([]);

  console.log('dataSource',dataSource);
  function handleRedirect() {
    props.history.push('/add/students');
  }

  useEffect(() => {
    const getData = async() => {
      const data = await reqwest({
        url: 'http://localhost:3000/search/stu',
        method: 'get',
      });
      console.log(data);
      setDataSource(data);

      return data;
    };
    getData();
  }, []);

  function handleModify(value) {
    console.log(value);
    const student = dataSource.filter((v) => {
      return v.stu_no === value;
    })[0];
    encodeURIComponent();
    props.history.push(`/modify/students?id=${student.stu_no}&name=${student.stu_name}&sex=${student.stu_gender}&class=${student.stu_class}`);
  }

  function handleDelete(index, value) {
    console.log(value);
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: async () => {
        const result = await reqwest({
          url: 'http://localhost:3000/delete/stu',
          method: 'post',
          data: JSON.stringify({ stu_no: value }),
          contentType: 'application/json',
        });
        const data = [...dataSource];
        data.splice(index, 1);
        setDataSource(data);
      },
    });
  }

  function renderOper(value, index) {
    return (
      <div>
        <Button
          type="primary"
          onClick={() => handleModify(value,index)}
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

  async function fetchData(len) {
    const data = await getData(len);
    setDataSource(data);
  }

  async function handleFilterChange(value) {
    const dataSource = await getData();
    let res = dataSource;
    if(value.stu_no) {
      res = dataSource.filter(v => {
        v.stu_no += '';
        return v.stu_no.indexOf(value.stu_no) > -1;
      });
    }
    if(value.stu_name) {
      if(res.length > 0){
        res = res.filter(v => {
          v.stu_name += '';
          return v.stu_name.indexOf(value.stu_name) > -1;
        });
      } else if(!value.stu_no){
        res = dataSource.filter(v => {
          v.stu_name += '';
          return v.stu_name.indexOf(value.stu_name) > -1;
        });
      }
    }

    setDataSource(res);
  }

  return (
    <IceContainer className={styles.container}>
      <ContainerTitle
        title="学生列表"
        buttonText="添加学生"
        className={styles.title}
        onClick={handleRedirect}
      />
      <TableFilter onChange={handleFilterChange} />
      <Table dataSource={dataSource} hasBorder={false} className={styles.table}>
        <Table.Column dataIndex="stu_no" title="学号" />
        <Table.Column dataIndex="stu_name" title="姓名" />
        <Table.Column dataIndex="stu_class" title="班级" />
        <Table.Column dataIndex="stu_gender" title="性别" />
        <Table.Column dataIndex="stu_no" title="操作" cell={renderOper} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(Employee);
