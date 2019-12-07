import React, { useState, useRef, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Input, Button, Message, Select } from '@alifd/next';
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
  const [selectOptions, setSelect] = useState([]);

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
      const { stu_no, lesson: c_id, score: fraction } = values;
      const result = await reqwest({
        url: 'http://localhost:3000/add/score',
        method: 'post',
        data: JSON.stringify({ 
          stu_no,
          c_id,
          fraction,
        }),
        contentType: 'application/json',
      });

      console.log('values:', values);
      Toast.success('提交成功');
    });
  }


  useEffect(() => {
    const getData = async() => {
      const data = await reqwest({
        url: 'http://localhost:3000/search/course',
        method: 'get',
      });
      setSelect(data);
    };
    getData();

  }, []);

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
              <FormBinder name="stu_no" required message="请输入正确的学号">
                <Input
                  name="stu_no"
                  placeholder="学号"
                  required
                  className={styles.inputw}
                />
              </FormBinder>
              <div className={styles.formErrorWrapper}>
                <FormError name="stu_no" />
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
                {selectOptions.map((v) => {
                    return <Select.Option value={v.c_id}>{v.c_name}</Select.Option>;
                  })}
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
