import React, { useState, useRef } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Input, Button, Message, Select } from '@alifd/next';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';

import styles from './index.module.scss';

const { Row, Col } = Grid;
const Toast = Message;

export default function AddEmployee() {

  function getAllUrlParams(url) {
    // 用JS拿到URL，如果函数接收了URL，那就用函数的参数。如果没传参，就使用当前页面的URL
    let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    // 用来存储我们所有的参数
    const obj = {};
    // 如果没有传参，返回一个空对象
    if (!queryString) {
        return obj;
    }
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];
    // 将参数分成数组
    const arr = queryString.split('&');
    for (let i = 0; i < arr.length; i++) {
        // 分离成key:value的形式
        const a = arr[i].split('=');
        // 将undefined标记为true
        let paramName = a[0];
        let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
        // 如果调用对象时要求大小写区分，可删除这两行代码
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
        // 如果paramName以方括号结束, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
            // 如果paramName不存在，则创建key
            const key = paramName.replace(/\[(\d+)?\]/, '');
            if (!obj[key]) obj[key] = [];
            // 如果是索引数组 e.g. colors[2]
            if (paramName.match(/\[\d+\]$/)) {
                // 获取索引值并在对应的位置添加值
                const index = /\[(\d+)\]/.exec(paramName)[1];
                obj[key][index] = paramValue;
            } else {
                // 如果是其它的类型，也放到数组中
                obj[key].push(paramValue);
            }
        } else {
            // 处理字符串类型
            // eslint-disable-next-line
            if (!obj[paramName]) {
              // 如果如果paramName不存在，则创建对象的属性
              obj[paramName] = paramValue;
            }else if(obj[paramName] && typeof obj[paramName] === 'string') {
              // 如果属性存在，并且是个字符串，那么就转换为数组
              obj[paramName] = [obj[paramName]];
              obj[paramName].push(paramValue);
          } else {
              // 如果是其它的类型，还是往数组里丢
              obj[paramName].push(paramValue);
          }
        }
    }
    return obj;
}


  const student = getAllUrlParams(location.href);
  if(decodeURIComponent(student.name) === '单片机') {
    student.name = 'dpj';
  } else if (decodeURIComponent(student.name) === 'RFID') {
    student.name = 'rfid';
  }else if (decodeURIComponent(student.name) === '大数据') {
    student.name = 'data';
  }else if (decodeURIComponent(student.name) === '数据库') {
    student.name = 'database';
  }else if (decodeURIComponent(student.name) === '科技英语') {
    student.name = 'english';
  }
  console.log(student);
  const [formValue] = useState({
    lesson: decodeURIComponent(student.name),
    id: student.id,
    score: student.score,
  });
  const formEl = useRef(null);


  function formChange(value) {
    console.log(value);
  }

  function handleSubmit() {
    formEl.current.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      console.log('values:', values);
      Toast.success('提交成功');
    });
  }

  return (
    <IceContainer className={styles.form}>
      <FormBinderWrapper
        ref={formEl}
        value={formValue}
        onChange={formChange}
      >
        <div className={styles.formContent}>
          <h2 className={styles.formTitle}>修改成绩</h2>
          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>学号：</span>
            </Col>
            <Col l="5">
              <FormBinder name="id" required message="请输入正确的学号">
                <Input
                  name="id"
                  placeholder="学号"
                  required
                  className={styles.inputw}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="id" />
              </div>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>课程：</span>
            </Col>
            <Col l="5">
              <FormBinder name="lesson">
                <Select className={styles.inputw}>
                  <Select.Option value="dpj">单片机</Select.Option>
                  <Select.Option value="data">大数据</Select.Option>
                  <Select.Option value="english">科技英语</Select.Option>
                  <Select.Option value="rfid">RFID</Select.Option>
                  <Select.Option value="database">数据库</Select.Option>
                </Select>
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="lesson" />
              </div>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>成绩：</span>
            </Col>
            <Col l="5">
              <FormBinder
                name="score"
                required
                message="请输入正确的成绩"
              >
                <Input
                  maxLength={20}
                  placeholder="成绩"
                  className={styles.inputw}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="score" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col offset="2">
              <Button onClick={handleSubmit} type="primary">
                确认
              </Button>
            </Col>
          </Row>
        </div>
      </FormBinderWrapper>
    </IceContainer>
  );
}
