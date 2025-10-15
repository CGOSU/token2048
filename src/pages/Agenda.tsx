import { useState, useEffect } from 'react';
import { Card, MultiSelect, Button, Group, Grid, TextInput, Select } from '@mantine/core';
import './Agenda.modules.css';
import { useForm } from '@mantine/form';
import { AgendaResource, AgendaResourceList } from '@/@types/agenda';
import PowerBy from './PowerBy';
import { AgendaService } from '@/services/AgedaService';
import { any, string } from 'prop-types';
import { SelectService } from '@/services/SelectService';
import { set } from 'lodash';
import { data } from 'react-router-dom';
export default function Agenda() {
  const event_type_data = [
    {
      value: '0',
      label: '',
    },
    {
      value: '1',
      label: 'TRON',
    },
    {
      value: '2',
      label: 'Openledger',
    },
  ];
  const highlight_data = [
    {
      value: '0',
      label: '',
    },
    {
      value: '1',
      label: 'TRON',
    },
    {
      value: '2',
      label: 'Openledger',
    },
  ];
  const speaker_data = [
    {
      value: '0',
      label: '',
    },
    {
      value: '1',
      label: 'TRON',
    },
    {
      value: '2',
      label: 'Openledger',
    },
  ];
  const form = useForm<AgendaResource[]>({
    initialValues: [
      {
        id: 0,
        category: null,
        power_by: '0',
        title: 'Day 1, Wednesday, Oct 1, 2025',
        highlight: 'OKX Main Stage',
        speakers: ['Vlad Tenev', 'Balaji Srinivasan', 'Tom Lee'],
        event_type: 'General',
        start_end: '12:00 am - ',
        card_time: '12:00 am',
        duration: '',
        moderator: 'Vlad Tenev',
      },
    ],
  });
  type PowerByData = Array<{
    value: string;
    label: string;
  }>;
  const [_power_by_select, _set_power_by_select] = useState<PowerByData>([]);
  const [_highlight_select, _set_highlight_select] = useState<PowerByData>([]);
  const [_speaker_select, _set_speaker_select] = useState<PowerByData>([]);
  const [start_end, set_start_end] = useState<string>('12:00 am -');
  const [duration, set_duration] = useState<string>('30 min');
  const [title, set_title] = useState<string>('Day 1, Wednesday, Oct 1, 2025');
  const [power_by, set_power_by] = useState<string | null>(null);
  const [highlight, set_highlight] = useState<string | null>(null);
  const [items, set_items] = useState<AgendaResource[]>();
  const load = async () => {
    {
      const list = await AgendaService.list();
      const _power_by = await SelectService.powerBy();
      const _highlight = await SelectService.highlight();
      const _speaker = await SelectService.speaker();
      _set_power_by_select(
        _power_by.data.map((item) => {
          return {
            value: item.id.toString(),
            label: item.name,
          };
        })
      );
      _set_highlight_select(
        _highlight.data.map((item) => {
          return {
            value: item.id.toString(),
            label: item.name,
          };
        })
      );
      _set_speaker_select(
        _speaker.data.map((item) => {
          return {
            value: item.id.toString(),
            label: item.name,
          };
        })
      );
      set_items(list?.data);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const update_power_by = (id: number, value: string) => {
    set_items(
      items?.map((item, key) => {
        // 找到对应ID的项，创建新对象并修改属性
        if (key === id) {
          return { ...item, power_by: value };
        }
        return item; // 其
      })
    );
  };
  const update_speaker = (id: number, value: string) => {
    set_items(
      items?.map((item, key) => {
        // 找到对应ID的项，创建新对象并修改属性
        if (key === id) {
          return { ...item, speaker: value };
        }
        return item; // 其
      })
    );
  };
  const update_highlight = (id: number, value: string) => {
    set_items(
      items?.map((item, key) => {
        // 找到对应ID的项，创建新对象并修改属性
        if (key === id) {
          return { ...item, highlight: value };
        }
        return item; // 其
      })
    );
  };

  return (
    <>
      {items?.map((item, key) => {
        return (
          <Card shadow="sm" padding="lg" radius="md" mt="xs" withBorder key={key}>
            <Grid>
              <Grid.Col span="content">
                <time>{item.card_time}</time>
              </Grid.Col>
              <Grid.Col span={9}>
                <Group>
                  <TextInput
                    label="开始到结束时间"
                    value={item.start_end}
                    onChange={(v: any) => set_start_end(v)}
                  ></TextInput>
                  <TextInput
                    label="耗时"
                    value={item.duration}
                    onChange={(v: any) => set_duration(v)}
                  ></TextInput>
                  <Group>
                    <Select
                      label="highlight"
                      placeholder="高光时刻"
                      data={_highlight_select}
                      onChange={(v: any) => update_highlight(key, v)}
                      clearable
                    />
                  </Group>
                  <Group>
                    <Select
                      label="event_type"
                      placeholder="事件类型"
                      data={event_type_data}
                      clearable
                    />
                  </Group>
                </Group>
                <Group>
                  <TextInput
                    label="标题"
                    value={item.title}
                    onChange={(v: any) => set_title(v)}
                  ></TextInput>
                </Group>
                <Group>
                  <Select
                    label="版权"
                    placeholder="选择一个版权"
                    data={_power_by_select}
                    onChange={(_v: any) => {
                      update_power_by(key, _v);
                    }}
                    value={item.power_by?.toString()}
                    clearable
                  />
                </Group>
                <Group>
                  <MultiSelect
                    label="选择宣讲人"
                    placeholder="宣讲人"
                    data={_speaker_select}
                    value={item.speakers}
                    onChange={(v: any) => update_speaker(key, v)}
                    clearable
                  />
                </Group>
                <Group mt="xs">
                  <Button size="xs" variant="outline">
                    向下插入
                  </Button>
                  <Button size="xs" color="red" variant="outline">
                    删除本项
                  </Button>
                </Group>
              </Grid.Col>
            </Grid>
          </Card>
        );
      })}
    </>
  );
}
