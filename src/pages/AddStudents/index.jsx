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
  const [formValue] = useState({
    name: '',
    shortName: '',
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
          <h2 className={styles.formTitle}>添加学生</h2>
          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>姓名：</span>
            </Col>
            <Col l="5">
              <FormBinder name="name" required message="请输入正确的姓名">
                <Input
                  name="name"
                  placeholder="姓名"
                  required
                  className={styles.inputw}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="name" />
              </div>
            </Col>
          </Row>

          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>性别：</span>
            </Col>
            <Col l="5">
              <FormBinder
                name="id"
                required
                message="请输入正确的学号"
              >
                <Input
                  maxLength={20}
                  placeholder="学号"
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
              <span>班级</span>
            </Col>
            <Col l="5">
              <FormBinder name="class" required message="请输入正确的班级">
                <Input
                  name="class"
                  placeholder="班级"
                  required
                  className={styles.inputw}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="class" />
              </div>
            </Col>
          </Row>
        
          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>性别：</span>
            </Col>
            <Col l="5">
              <FormBinder name="sex">
                <Select className={styles.inputw}>
                  <Select.Option value="boy">男</Select.Option>
                  <Select.Option value="girl">女</Select.Option>
                </Select>
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="sex" />
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
