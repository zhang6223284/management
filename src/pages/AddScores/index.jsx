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
    id: '',
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
          <h2 className={styles.formTitle}>添加成绩</h2>
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
