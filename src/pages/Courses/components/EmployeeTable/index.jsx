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

const AVATARS = [
  'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
  'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
  'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
  'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
];

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      id: random(10000, 100000),
      avatar: AVATARS[random(0, 3)],
      name: ['淘小宝', '淘二宝'][random(0, 1)],
      email: 'admin@example.com',
      joinTime: `20${random(10, 20)}-0${random(1, 9)}-12`,
      address: ['杭州市', '上海市', '北京市'][random(0, 2)],
      role: ['设计师', '运营', '产品', '开发'][random(0, 3)],
    };
  });
};

function Employee(props) {
  const [dataSource, setDataSource] = useState(getData);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  function handleRedirect() {
    props.history.push('/add/employee');
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

  function renderOper(value, index) {
    return (
      <div>
        <Button
          type="primary"
          onClick={handleRedirect}
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
    setLoading(true);
    mockApi(len).then((data) => {
      setLoading(false);
      setDataSource(data);
    });
  }

  function handleFilterChange() {
    fetchData(5);
  }

  return (
    <IceContainer className={styles.container}>
      <ContainerTitle
        title="员工列表"
        buttonText="添加员工"
        className={styles.title}
        onClick={handleRedirect}
      />
      <TableFilter onChange={handleFilterChange} />
      <Table dataSource={dataSource} hasBorder={false} className={styles.table}>
        <Table.Column dataIndex="id" title="工号" />
        <Table.Column
          dataIndex="name"
          title="姓名"
          cell={renderProfile}
        />
        <Table.Column dataIndex="address" title="学号" />
        <Table.Column dataIndex="email" title="姓名" />
        <Table.Column dataIndex="role" title="班级" />
        <Table.Column dataIndex="joinTime" title="性别" />
        <Table.Column dataIndex="id" title="操作" cell={renderOper} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(Employee);
