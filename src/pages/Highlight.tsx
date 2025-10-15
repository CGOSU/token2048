import { Modal, Button, Group, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { HighlightResource, HighlightResourceList } from '@/@types/highlight';
import { HighlightService } from '@/services/HighlightService';
import { showNotification } from '@mantine/notifications';
import { data } from 'react-router-dom';
export default function Highlight() {
  const form = useForm<HighlightResource>({
    initialValues: {
      id: 0,
      name: '',
      img: '',
    },
    validate: {
      name: (value) => (value && value.length > 0 ? null : '名称为必填项'),
    },
  });
  const [items, setItems] = useState<HighlightResource[]>([
    {
      id: 1,
      name: '1',
      img: 'http://1.jpg',
    },
  ]);
  const [opened, { open, close }] = useDisclosure(false);
  const [isCreating, setIsCreating] = useState(false);
  function openCreate() {
    setIsCreating(true);
    form.reset();
    open();
  }
  function openEdit(e: HighlightResource) {
    setIsCreating(false);
    form.setValues({ ...e });
    open();
  }
  async function handleDelete(id: number) {
    if (!id) return;
    if (!window.confirm('确定删除此 Hightlight 吗？')) return;
    try {
      const data = await HighlightService.delete({ id });
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
        await HighlightService.create(data);
        showNotification({ title: 'Success', message: '新增成功', color: 'green' });
      } else {
        await HighlightService.update(data);
        showNotification({ title: 'Success', message: '更新成功', color: 'green' });
      }
      close();
      load();
    } catch (e: any) {
      showNotification({ title: 'Error', message: e?.message || '更新失败', color: 'red' });
    }
  }
  async function load() {
    const result = await HighlightService.list();
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
        <Button onClick={openCreate}>新增 Highlight</Button>
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
      <Modal
        opened={opened}
        onClose={close}
        title={isCreating ? '新增 Highlight' : '更新 Highlight'}
      >
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
