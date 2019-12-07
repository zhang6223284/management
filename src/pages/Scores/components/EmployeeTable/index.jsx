import React, { useState } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog, Button } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import reqwest from 'reqwest';
import TableFilter from './Filter';
import ContainerTitle from '@/components/ContainerTitle';
import styles from './index.module.scss';

const getData = async(id) => {
  const data = await reqwest({
    url: 'http://localhost:3000/search/score',
    method: 'get',
    data: {stu_no: id},
  });
  console.log(data);
  return data;
};

function Employee(props) {
  const [dataSource, setDataSource] = useState([]);

  const [id, setId] = useState('');
  function handleRedirect() {
    props.history.push('/add/scores');
  }

  function handleDelete(index,value) {
    console.log(value);
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: async () => {
        const result = await reqwest({
          url: 'http://localhost:3000/delete/score',
          method: 'post',
          data: JSON.stringify({ stu_no: id, c_id: value }),
          contentType: 'application/json',
        });
        const data = [...dataSource];
        data.splice(index, 1);
        setDataSource(data);
      },
    });
  }

  function handleModify(value) {
    console.log(value);
    const student = dataSource.filter((v) => {
      return v.c_id === value;
    })[0];
    props.history.push(`/modify/scores?id=${id}&name=${student.c_id}&score=${student.fraction}`);
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
        <Button onClick={() => handleDelete(index, value)} type="normal" warning>
          删除
        </Button>
      </div>
    );
  }
  

async function handleSearch(value) {
    console.log(value);
    if(value.id) {
      setId(value.id);

      const data =await getData(value.id);
      setDataSource(data);

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
        <Table.Column dataIndex="c_id" title="课程号" />
        <Table.Column dataIndex="c_name" title="课程名" />
        <Table.Column dataIndex="fraction" title="成绩" />
        <Table.Column dataIndex="c_id" title="操作" cell={renderOper} />
      </Table>
    </IceContainer>
  );
}

export default withRouter(Employee);
