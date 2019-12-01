import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog, Button } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import TableFilter from './Filter';
import ContainerTitle from '@/components/ContainerTitle';

import styles from './index.module.scss';

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      id: random(10000, 100000),
      name: ['张三', '李四'][random(0, 1)],
      sex: ['男', '女'][random(0, 1)],
      class: ['一班', '二班'][random(0, 1)],
    };
  });
};

function Employee(props) {
  const [dataSource, setDataSource] = useState(getData);

  function handleRedirect() {
    props.history.push('/add/students');
  }

  function handleModify(value) {
    console.log(value);
    const student = dataSource.filter((v) => {
      return v.id === value;
    })[0];
    encodeURIComponent();
    props.history.push(`/modify/students?id=${student.id}&name=${student.name}&sex=${student.sex}&class=${student.class}`);
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

  function handleFilterChange(value) {
    let res = [];
    if(value.id) {
      res = dataSource.filter(v => {
        v.id += '';
        return v.id.indexOf(value.id) > -1;
      });
    }
    if(value.name) {
      if(res.length > 0){
        res = res.filter(v => {
          v.name += '';
          return v.name.indexOf(value.name) > -1;
        });
      } else if(!value.id){
        res = dataSource.filter(v => {
          v.name += '';
          return v.name.indexOf(value.name) > -1;
        });
      }
    }

    setDataSource(res);


    // console.log(value);
    // fetchData(5);
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
        <Table.Column dataIndex="id" title="学号" />
        <Table.Column dataIndex="name" title="姓名" />
        <Table.Column dataIndex="class" title="班级" />
        <Table.Column dataIndex="sex" title="性别" />
        <Table.Column dataIndex="id" title="操作" cell={renderOper} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(Employee);
