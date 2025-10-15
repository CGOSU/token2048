import { Modal, Button, Group, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { PowerByResource, PowerByResourceList } from '@/@types/powerBy';
import { PowerByService } from '@/services/PowerByService';
import { showNotification } from '@mantine/notifications';
export default function PowerBy() {
  const form = useForm<PowerByResource>({
    initialValues: {
      id: 0,
      name: '',
      img: '',
    },
    validate: {
      name: (value) => (value && value.length > 0 ? null : '名称为必填项'),
    },
  });
  const [items, setItems] = useState<PowerByResource[]>([
    {
      id: 0,
      name: '',
      img: '',
    },
  ]);
  const [opened, { open, close }] = useDisclosure(false);
  const [isCreating, setIsCreating] = useState(false);
  function openCreate() {
    setIsCreating(true);
    form.reset();
    open();
  }
  function openEdit(e: PowerByResource) {
    setIsCreating(false);
    form.setValues({ ...e });
    open();
  }
  async function handleDelete(id: number) {
    if (!id) return;
    if (!window.confirm('确定删除此 PowerBy 吗？')) return;
    try {
      const data = await PowerByService.delete({ id });
      showNotification({ title: 'Success', message: '删除成功', color: 'green' });
      close();
      load();
    } catch (e: any) {
      showNotification({ title: 'Error', message: e?.message || '删除失败', color: 'red' });
    }
  }
  async function handleSave() {
    const validation = form.validate();
    if (validation.hasErrors) return;
    const data = form.values;
    try {
      if (isCreating) {
        await PowerByService.create(data);
        showNotification({ title: 'Success', message: '新增成功', color: 'green' });
      } else {
        await PowerByService.update(data);
        showNotification({ title: 'Success', message: '更新成功', color: 'green' });
      }
      close();
      load();
    } catch (e: any) {
      showNotification({ title: 'Error', message: e?.message || '更新失败', color: 'red' });
    }
  }
  async function load() {
    const result = await PowerByService.list();
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
        <Button onClick={openCreate}>新增 PowerBy</Button>
      </div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>图标</Table.Th>
            <Table.Th>名称</Table.Th>
            <Table.Th>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {items.map((element) => (
            <Table.Tr key={element.id}>
              <Table.Td>
                <img width={40} src={element.img} alt={element.name ?? 'img'} />
              </Table.Td>
              <Table.Td>{element.name}</Table.Td>
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
      <Modal opened={opened} onClose={close} title={isCreating ? '新增 PowerBy' : '更新 PowerBy'}>
        <Group>
          <TextInput required label="名字" {...form.getInputProps('name')} />
          <TextInput label="图片地址" {...form.getInputProps('img')} />
          <Button onClick={handleSave}>{isCreating ? '创建' : '更新'}</Button>
          <Button variant="default" onClick={() => close()}>
            取消
          </Button>
        </Group>
      </Modal>
    </>
  );
}
