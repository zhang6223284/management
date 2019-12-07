import React, { useState, useRef } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Input, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import reqwest from 'reqwest';
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
    formEl.current.validateAll(async (errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      const { id, name } = values;
      const result = await reqwest({
        url: 'http://localhost:3000/add/course',
        method: 'post',
        data: JSON.stringify({ 
          c_id: id,
          c_name: name,
        }),
        contentType: 'application/json',
      });

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
          <h2 className={styles.formTitle}>添加课程</h2>
          <Row className={styles.formRow}>
            <Col l="2" className={styles.formLabel}>
              <span>课程名：</span>
            </Col>
            <Col l="5">
              <FormBinder name="name" required message="请输入正确的课程名">
                <Input
                  name="name"
                  placeholder="课程名"
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
              <span>课程ID：</span>
            </Col>
            <Col l="5">
              <FormBinder
                name="id"
                required
                message="请输入正确的课程ID"
              >
                <Input
                  maxLength={20}
                  placeholder="课程ID"
                  className={styles.inputw}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="id" />
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
