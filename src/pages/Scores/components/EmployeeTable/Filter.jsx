import React, { useState } from 'react';
import { Grid, Input, DatePicker, Button } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import styles from './index.module.scss';

const { Row, Col } = Grid;

export default function Filter(props) {
  const [formValue] = useState({});

  return (
    <IceFormBinderWrapper
      value={formValue}
    >
      <Row wrap gutter="20" className={styles.formRow}>
        <Col l="8">
          <div className={styles.formItem}>
            <span className={styles.formLabel}>学号：</span>
            <IceFormBinder triggerType="onBlur" name="id">
              <Input placeholder="请输入" />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="id" />
            </div>
          </div>
        </Col>
        <Col l="8">
          <div className={styles.formItem}>
            <Button type='primary' onClick={() => props.handleSearch(formValue)}>搜索</Button>
          </div>
        </Col>
      </Row>
    </IceFormBinderWrapper>
  );
}
