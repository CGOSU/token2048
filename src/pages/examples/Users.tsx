import { Modal, Button, Group, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { UserResource, UserFormResource } from '@/@types/users';
import { UserService } from '@/services/UserService';
import { showNotification } from '@mantine/notifications';
export default function Users() {
  const form = useForm<UserResource>({
    initialValues: {
      id: 0,
      name: '',
      username: '',
      password: '',
    },
    validate: {
      name: (value) => (value && value.length > 0 ? null : '名称为必填项'),
      password: (value) => (value && value.length > 0 ? null : '密码为必填项'),
    },
  });
  const [items, setItems] = useState<UserResource[]>([
    {
      id: 0,
      name: '',
      username: '',
    },
  ]);
  const [opened, { open, close }] = useDisclosure(false);
  const [isCreating, setIsCreating] = useState(false);
  function openCreate() {
    setIsCreating(true);
    form.reset();
    open();
  }
  function openEdit(e: UserResource) {
    setIsCreating(false);
    form.setValues({ ...e });
    open();
  }
  async function handleDelete(id: number) {
    if (!id) return;
    if (!window.confirm('确定删除此 用户 吗？')) return;
    try {
      const data = await UserService.delete({ id });
      showNotification({ title: 'Success', message: '删除成功', color: 'green' });
      close();
      load();
    } catch (e: any) {
      showNotification({ title: 'Error', message: e || '删除失败', color: 'red' });
    }
  }
  async function handleSave() {
    const validation = form.validate();
    if (validation.hasErrors) return;
    const data = form.values;
    try {
      if (isCreating) {
        await UserService.create(data);
        showNotification({ title: 'Success', message: '新增成功', color: 'green' });
      } else {
        await UserService.update(data);
        showNotification({ title: 'Success', message: '更新成功', color: 'green' });
      }
      close();
      load();
    } catch (e: any) {
      console.log('eee', e);
      showNotification({ title: 'Error', message: e || '更新失败', color: 'red' });
      return;
    }
  }
  async function load() {
    const result = await UserService.list();
    if (result.data) {
      setItems(result.data);
    }
  }
  useEffect(() => {
    load();
  }, []);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button onClick={openCreate}>新增 用户</Button>
      </div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>用户名</Table.Th>
            <Table.Th>登录账号</Table.Th>
            <Table.Th>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {items.map((element) => (
            <Table.Tr key={element.id}>
              <Table.Td>{element.name}</Table.Td>
              <Table.Td>{element.username}</Table.Td>
              <Table.Td>
                <Group>
                  <Button size="xs" onClick={() => openEdit(element)}>
                    编辑
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    variant="outline"
                    onClick={() => handleDelete(element.id)}
                  >
                    删除
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Modal opened={opened} onClose={close} title={isCreating ? '新增 用户' : '更新 用户'}>
        <Group>
          <Group>
            <TextInput required label="名字" {...form.getInputProps('name')} />
          </Group>
          <Group>
            <TextInput required label="用户名" {...form.getInputProps('username')} />
          </Group>
          <Group>
            <TextInput required label="密码" type="password" {...form.getInputProps('password')} />
          </Group>
          <Button onClick={handleSave}>{isCreating ? '创建' : '更新'}</Button>
          <Button variant="default" onClick={() => close()}>
            取消
          </Button>
        </Group>
      </Modal>
    </>
  );
}
