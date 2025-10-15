import { Table } from '@mantine/core';
import { Modal, Button, Group, TextInput, Pagination } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SpeakerResource } from '@/@types/speaker';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { SpeakerService } from '@/services/SpeakerService';

export default function Speaker() {
  const [items, setItems] = useState<SpeakerResource[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerResource | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<SpeakerResource>({
    initialValues: {
      id: 0,
      name: '',
      avatar: '',
      company: '',
      x: '',
      linkedin: '',
      job_title: '',
    },
    validate: {
      name: (value) => (value && value.trim().length > 0 ? null : '姓名为必填项'),
    },
  });

  const names: Record<keyof SpeakerResource, string> = {
    id: 'ID',
    name: '姓名',
    avatar: '头像',
    x: '推特',
    company: '公司',
    job_title: '职务',
    linkedin: '领英',
  };

  async function load(p = 1) {
    try {
      const res = await SpeakerService.list(p, 10);
      setItems(res.list || []);
      setTotal(res.total || 0);
    } catch (e: any) {
      showNotification({ title: 'Error', message: e?.message || '加载失败', color: 'red' });
    }
  }

  useEffect(() => {
    load(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreate() {
    setIsCreating(true);
    form.reset();
    const maxId = items.reduce((acc, it) => (it.id && it.id > acc ? (it.id as number) : acc), 0);
    form.setFieldValue('id', maxId + 1);
    open();
  }

  function openEdit(item: SpeakerResource) {
    setIsCreating(false);
    setSelectedSpeaker(item);
    form.setValues({ ...item });
    open();
  }

  async function handleDelete(id?: number) {
    if (!id) return;
    if (!window.confirm('确定删除此 speaker 吗？')) return;
    try {
      await SpeakerService.delete(id);
      showNotification({ title: 'Success', message: '删除成功', color: 'green' });
      await load(page);
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
        await SpeakerService.create(data);
        showNotification({ title: 'Success', message: '创建成功', color: 'green' });
      } else {
        await SpeakerService.update(data.id as number, data);
        showNotification({ title: 'Success', message: '更新成功', color: 'green' });
      }
      await load(page);
      close();
    } catch (e: any) {
      showNotification({ title: 'Error', message: e?.message || '操作失败', color: 'red' });
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button onClick={openCreate}>新增 Speaker</Button>
      </div>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>头像</Table.Th>
            <Table.Th>姓名</Table.Th>
            <Table.Th>公司</Table.Th>
            <Table.Th>头衔</Table.Th>
            <Table.Th>x</Table.Th>
            <Table.Th>linkedin</Table.Th>
            <Table.Th>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {items.map((element) => (
            <Table.Tr key={element.id}>
              <Table.Td>
                <img width={40} src={element.avatar} alt={element.name ?? 'avatar'} />
              </Table.Td>
              <Table.Td>{element.name}</Table.Td>
              <Table.Td>{element.company}</Table.Td>
              <Table.Td>{element.job_title}</Table.Td>
              <Table.Td>{element.x}</Table.Td>
              <Table.Td>{element.linkedin}</Table.Td>
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

      <Modal opened={opened} onClose={close} title={isCreating ? '新增 Speaker' : '更新 Speaker'}>
        <TextInput required label={names.name} {...form.getInputProps('name')} />
        <TextInput label={names.avatar} {...form.getInputProps('avatar')} />
        <TextInput label={names.company} {...form.getInputProps('company')} />
        <TextInput label={names.job_title} {...form.getInputProps('job_title')} />
        <TextInput label={names.x} {...form.getInputProps('x')} />
        <TextInput label={names.linkedin} {...form.getInputProps('linkedin')} />
        <Group mt="xl">
          <Button onClick={handleSave}>{isCreating ? '创建' : '更新'}</Button>
          <Button variant="default" onClick={() => close()}>
            取消
          </Button>
        </Group>
      </Modal>

      <Pagination
        mt={'xs'}
        total={Math.max(1, Math.ceil((total || 0) / 10))}
        siblings={1}
        value={page}
        onChange={async (p) => {
          setPage(p);
          await load(p);
        }}
      />
    </>
  );
}
