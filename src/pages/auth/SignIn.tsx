import React, { useState } from 'react';
import { Paper, TextInput, PasswordInput, Button, Title, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import classes from './SignIn.module.css';
import * as yup from 'yup';
import { useForm } from '@mantine/form';
import { yupResolver } from 'mantine-form-yup-resolver';

import useAuth from '@/utils/hooks/useAuth';

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();
  const schema = yup.object().shape({
    username: yup.string().required('Please enter a username'),
    password: yup.string().required('Please enter a password'),
  });

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: { username: string; password: string }) {
    setLoading(true);
    try {
      const res = await signIn(values);
      if (res && res.status === 'success') {
        showNotification({ title: 'Success', message: '登录成功', color: 'green' });
      } else if (res) {
        showNotification({ title: 'Error', message: res.message || '登录失败', color: 'red' });
      }
    } catch (e) {
      console.error(e);
      showNotification({ title: 'Error', message: '请求失败', color: 'red' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className={classes.wrapper}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
              后管管理系统
            </Title>

            <TextInput
              {...form.getInputProps('username')}
              name={'username'}
              label="用户名"
              withAsterisk
              placeholder="admin"
              size="md"
            />
            <PasswordInput
              {...form.getInputProps('password')}
              name={'password'}
              label="密码"
              placeholder="Your password"
              mt="md"
              size="md"
            />
            <Button loading={loading} type={'submit'} fullWidth mt="xl" size="md">
              登录
            </Button>
            {/*<Text ta="center" mt="md">*/}
            {/*  Don&apos;t have an account?{' '}*/}
            {/*  <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()}>*/}
            {/*    Register*/}
            {/*  </Anchor>*/}
            {/*</Text>*/}
          </Paper>
        </div>
      </form>
    </div>
  );
}
